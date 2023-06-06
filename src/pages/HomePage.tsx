import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../Redux/Slices/userSlice';
import { RootState } from '../Redux/store';
import Layout from '../components/Layout/Layout'
import CreateUser from '../components/CreateUser'
import EditUserForm from '../components/EditUserForm';
import { IoIosCloseCircle } from 'react-icons/io'



function HomePage() {

    const [tab, setTab] = useState('getuser')
    const [editingUser, setEditingUser] = useState<any>(null); // State to track the user being edited
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.users);

    const handleEditClick = (user: any) => {
        setEditingUser(user); // Set the user being edited
        setTab('editUser'); // Switch to the edit user tab
    };

    const handleCancelEdit = () => {
        setEditingUser(null); // Clear the editing user
        setTab('getuser'); // Switch back to the user list tab
    };


    const handleDelete = (userId: number) => {
        // Dispatch deleteUser action
        dispatch(deleteUser(userId));
    };
    return (
        <Layout>
            {
                tab === 'getuser' && (
                    <div className=''>
                        <div className='my-10 text-center'>
                            <button className='border py-2 px-10 border-[#F0564F] font-semibold text-[#F0564F] hover:text-white hover:bg-[#F0564F] duration-700 hover:scale-105' onClick={() => setTab('createUser')}>Create Contact</button>
                        </div>
                        <div className=''>
                            {users.length === 0 ?
                                <div className='flex justify-center gap-5 mx-auto'>
                                    <IoIosCloseCircle className='my-auto h-10 w-10 lg:h-20 lg:w-20 text-red-500 animate-pulse' />
                                    <div className='lg:text-2xl font-semibold'>Contact Not Found <br /> Please Add Contact from <br /> Create Contact Button

                                    </div>
                                </div>
                                :
                                <div className='flex justify-center flex-wrap gap-3'>
                                    {users.map((user) => (
                                        <div key={user.id} className=''>
                                            <div className='py-2 px-2 w-fit border border-[#F0564F]'>
                                                <div className='text-center'>{user.firstName}</div>
                                                <div className='text-center'>{user.lastName}</div>
                                                <div className='text-center'>({user.status})</div>
                                                <div className='text-center mt-2'>
                                                <div className='bg-green-700 mb-1 cursor-pointer text-white' onClick={() => handleEditClick(user)}>Edit</div>
                                                <div className='bg-red-700 cursor-pointer text-white' onClick={() => handleDelete(user.id)}>Delete</div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                )
            }
            {tab === 'editUser' && editingUser && (
                <EditUserForm user={editingUser} onCancel={handleCancelEdit} />
            )}

            {tab === 'createUser' && (
                <CreateUser onCancel={handleCancelEdit} />
            )}
        </Layout>
    )
}

export default HomePage
