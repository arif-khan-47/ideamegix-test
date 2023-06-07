import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { login } from '../https';
import Layout from '../components/Layout/Layout';
import { toast } from 'react-hot-toast';

const LoginPage = () => {

  const cookies = new Cookies();
  const navigate = useNavigate();


  useEffect(() => {
    const token = cookies.get('token');

    if (token) {
      navigate('/');
    }
  }, [navigate, cookies]);



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);


  const handleUsernameChange = (e: any) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setIsButtonDisabled(!validateCredentials(newUsername, password));
  };

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsButtonDisabled(!validateCredentials(username, newPassword));
  };

  const validateCredentials = (username: string, password: string) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    const isUsernameValid = usernameRegex.test(username);
    const isPasswordValid = password.length >= 6;
    return isUsernameValid && isPasswordValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsButtonLoading(true)
    try {
      const res = await login({ username, password });
      console.log(res.data);//token
      toast.success('Logged in successfully');
      cookies.set('token', res.data)
      setIsButtonLoading(false)
      navigate('/');

    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data || 'Something Went Wrong!');
      setIsButtonLoading(false)

    }
  };

  return (
    <Layout>
      <div className='m-auto container'>
        <div className='flex mt-32 lg:h-screen lg:-mt-20'>
          <div className='m-auto lg:w-1/3'>
            <form onSubmit={handleSubmit} className='bg-green-200 p-10 rounded-xl'>
              <div className='text-4xl text-center mb-10 font-bold '>Login</div>
              <div className="mb-4 w-full">
                <input
                  className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full"
                  type="text"
                  id="username"
                  placeholder='Username'
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full"
                  placeholder='Password'
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className={`${isButtonDisabled ? 'bg-gray-600' : ' bg-green-700 '} rounded-xl relative h-10 text-white font-semibold`}>
                {
                  isButtonLoading ?
                    <div className="absolute top-0 bottom-0 left-0 right-0 w-6 h-6 rounded-full animate-spin border-4 mx-auto border-solid border-white border-t-transparent my-auto"></div>
                    :
                    <button className='absolute top-0 bottom-0 left-0 right-0' type="submit" disabled={isButtonDisabled}>
                      Log In
                    </button>

                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
