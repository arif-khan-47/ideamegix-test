import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/Slices/userSlice';





interface CreatetUserFormProps {
    onCancel: () => void;
}
const CreateUser: React.FC<CreatetUserFormProps> = ({ onCancel }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [status, setStatus] = useState<string>('active');


        

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(addUser({ id: 1, firstName, lastName, status }));

        // Clear form inputs
        setFirstName('');
        setLastName('');
        setStatus('active');
        onCancel()

    };

    return (
        <div className='flex h-screen'>
            <form onSubmit={handleSubmit} className='m-auto border py-10 px-5 lg:p-10'>
                <div className='text-center mb-10 font-bold underline text-xl'>Create Contact</div>
                <div className='mb-5'>
                    <label htmlFor="firstName" className='font-semibold mr-2'>First Name:</label>
                    <input
                        className='border-[#F0564F] border focus:outline-none rounded-md'
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor="lastName" className='font-semibold mr-2'>Last Name:</label>
                    <input
                        className='border-[#F0564F] border focus:outline-none rounded-md'
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='mb-5 flex gap-10'>
                    <div className='font-semibold'>Status:</div>
                    <div>
                        <div>
                            <label>
                                <input
                                    type='radio'
                                    name='status'
                                    value='active'
                                    checked={status === 'active'}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                Active
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type='radio'
                                    name='status'
                                    value='inactive'
                                    checked={status === 'inactive'}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                Inactive
                            </label>
                        </div>

                    </div>
                </div>
                <div className='flex mx-5 justify-between'>
                    <button className={`${firstName ==='' || lastName === '' ? 'border-gray-600 text-gray-600 hover:bg-gray-600' : 'border-[#F0564F] text-[#F0564F] hover:bg-[#F0564F]'} border py-1 px-2  font-semibold hover:text-white duration-700`} type="submit" disabled={firstName ==='' || lastName === '' ? true : false}>Add Contact</button>
                    <button className='border py-1 px-2 border-[#F0564F] font-semibold text-[#F0564F] hover:text-white hover:bg-[#F0564F] duration-700' onClick={onCancel}>Cancel</button>
                </div>

            </form>
        </div>
    );
};

export default CreateUser;
