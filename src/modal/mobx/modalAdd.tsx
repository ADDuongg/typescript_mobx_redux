import React, { useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import store, { UserType } from '../../storeMobX';
import { log } from 'console';

const Modal = styled.div`
    ${tw`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-40`}
`;

const ModalContent = styled.div`
    ${tw`bg-white  rounded-lg w-2/6 h-auto`}
`;

interface ModalAddProps {

    handleShow: () => void;

}
const ModalAdd: React.FC<ModalAddProps> = ({ handleShow }) => {
    const [dataAdd, setDataAdd] = useState<UserType>({
        id: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        age: 0,
        isAdmin: ''
    })
    function handleChange(e: any) {
        const { name, value } = e.target;
        setDataAdd(prev => ({ ...prev, [name]: value }));
    }

    function handleAdd() {
        store.addUser(dataAdd)
        handleShow()
    }
    console.log(dataAdd);
    
    return (
        <div>
            <Modal>
                <ModalContent>
                    <div className='w-full h-full flex flex-col p-4 gap-3'>
                        <div className='w-full flex justify-between border-b-blue-100 border-b'>
                            <h1>Add new User</h1>
                            <button onClick={handleShow}><i className="fa-solid fa-xmark rounded-full p-2 hover:bg-gray-200"></i></button>
                        </div>
                        <div className='w-full'>
                            <div className='flex gap-5 flex-col pb-3'>
                                <div>
                                    <label htmlFor="title">User Name</label>
                                    <input name='username' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter user name' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="category">Email</label>
                                    <input name='email' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter email' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="description">First Name</label>
                                    <textarea name='firstName' className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter first name' onChange={handleChange}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="price">Last Name</label>
                                    <input name='lastName' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter last name' onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor="price">Age</label>
                                    <input name='age' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter age' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="price">Role</label>
                                    <select onChange={handleChange} name="isAdmin" id="">
                                        <option value="0">User</option>
                                        <option value="1">Admin</option>
                                    </select>
                                </div>
                                <div className="w-full flex justify-end gap-3">
                                    <button onClick={handleShow} className='rounded-2xl h-10 w-24 border-gray-400 border text-white hover:text-gray-400 hover:bg-white bg-gray-400'>
                                        Cancel
                                    </button>
                                    <button onClick={handleAdd} className='rounded-2xl h-10 w-24 border-green-400 border text-white hover:text-green-400 hover:bg-white bg-green-400'>
                                        Add
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

export default ModalAdd;
