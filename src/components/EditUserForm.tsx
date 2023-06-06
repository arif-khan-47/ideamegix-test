import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/Slices/userSlice';

interface EditUserFormProps {
    user: {
        id: number;
        firstName: string;
        lastName: string;
        status: 'active' | 'inactive';
    };
    onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onCancel }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [status, setStatus] = useState(user.status);

    const handleSaveEdit = () => {
        // Create an updated user object with the modified data
        const updatedUser = {
            ...user,
            firstName,
            lastName,
            status,
        };

        // Dispatch updateUser action
        dispatch(updateUser(updatedUser));

        // Clear form inputs and close the edit form
        setFirstName('');
        setLastName('');
        setStatus('active');
        onCancel();
    };


    return (
        <div className='flex h-screen'>
            <form className='m-auto border py-10 px-5 lg:p-10'>
                <div className='text-center mb-10 font-bold underline text-xl'>Edit Contact</div>
                <div className='mb-5'>
                    <label className='font-semibold mr-2' htmlFor="firstName">First Name:</label>
                    <input
                        className='border-[#F0564F] border focus:outline-none rounded-md'
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='font-semibold mr-2' htmlFor="lastName">Last Name:</label>
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
                                    onChange={(e) => setStatus(e.target.value as never)}
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
                                    onChange={(e) => setStatus(e.target.value as never)}
                                />
                                Inactive
                            </label>
                        </div>
                    </div>
                </div>
                <div className='flex mx-5 justify-between'>
                    <button className={`${firstName === '' || lastName === '' ? 'border-gray-600 text-gray-600 hover:bg-gray-600' : 'border-[#F0564F] text-[#F0564F] hover:bg-[#F0564F]'} border py-1 px-2  font-semibold hover:text-white duration-700`} type="button" onClick={handleSaveEdit} disabled={firstName === '' || lastName === '' ? true : false}>Edit Contact</button>
                    <button className='border py-1 px-2 border-[#F0564F] font-semibold text-[#F0564F] hover:text-white hover:bg-[#F0564F] duration-700' onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
