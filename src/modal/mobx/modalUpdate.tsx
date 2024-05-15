import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import store, { UserType } from '../../storeMobX';
import dataUser from '../../api/apiTest.json'

const Modal = styled.div`
    ${tw`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-40`}
`;

const ModalContent = styled.div`
    ${tw`bg-white  rounded-lg w-2/6 h-auto`}
`;

interface ModalAddProps {

    idUpdate?: number;
    handleShowUpdate: () => void
}
const ModalUpdate: React.FC<ModalAddProps> = ({ handleShowUpdate, idUpdate }) => {
    const [dataUpdate, setDataUpdate] = useState<UserType>({
        id: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        age: 0,
        isAdmin: ''
    });

    useEffect(() => {
        const userToUpdate = dataUser.find((item) => item.id === idUpdate);
        if (userToUpdate) {
            setDataUpdate(userToUpdate);
        }
    }, [idUpdate]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setDataUpdate(prev => ({ ...prev, [name]: value }));
    }

    function handleUpdate() {
        store.updateUser(dataUpdate);
        handleShowUpdate();
    }
    console.log(dataUpdate);
    
    return (
        <div>
            <Modal>
                <ModalContent>
                    <div className='w-full h-full flex flex-col p-4 gap-3'>
                        <div className='w-full flex justify-between border-b-blue-100 border-b'>
                            <h1>Update User</h1>
                            <button onClick={handleShowUpdate}><i className="fa-solid fa-xmark rounded-full p-2 hover:bg-gray-200"></i></button>
                        </div>
                        <div className='w-full'>
                            <div className='flex gap-5 flex-col pb-3'>
                                <div>
                                    <label htmlFor="username">User Name</label>
                                    <input name='username' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter user name' value={dataUpdate.username} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input name='email' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter email' value={dataUpdate.email} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="firstName">First Name</label>
                                    <textarea name='firstName' className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter first name' value={dataUpdate.firstName} onChange={handleChange}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input name='lastName' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter last name' value={dataUpdate.lastName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="age">Age</label>
                                    <input name='age' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter age' value={dataUpdate.age} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="isAdmin">Role</label>
                                    <select name="isAdmin" id="" value={dataUpdate.isAdmin} onChange={handleChange}>
                                        <option value="0">User</option>
                                        <option value="1">Admin</option>
                                    </select>
                                </div>
                                <div className="w-full flex justify-end gap-3">
                                    <button onClick={handleShowUpdate} className='rounded-2xl h-10 w-24 border-gray-400 border text-white hover:text-gray-400 hover:bg-white bg-gray-400'>
                                        Cancel
                                    </button>
                                    <button onClick={handleUpdate} className='rounded-2xl h-10 w-24 border-green-400 border text-white hover:text-green-400 hover:bg-white bg-green-400'>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </ModalContent>
            </Modal>
        </div>
    );
}

export default ModalUpdate;
