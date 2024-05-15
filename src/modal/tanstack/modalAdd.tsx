import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { APIData } from '../../crud';
import { UseMutationResult } from '@tanstack/react-query';
interface ModalAddProps {
    handleAdd: () => void;
    handleShow: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    mutationAdd: UseMutationResult<APIData, Error, Partial<APIData>, unknown>; 
}

const Modal = styled.div`
    ${tw`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-40`}
`;

const ModalContent = styled.div`
    ${tw`bg-white  rounded-lg w-2/6 h-auto`}
`;
const ModalAdd: React.FC<ModalAddProps> = ({ handleAdd, handleShow, handleChange, mutationAdd }) => {
    return (
        <div>
            <Modal>
                <ModalContent>
                    <div className='w-full h-full flex flex-col p-4 gap-3'>
                        <div className='w-full flex justify-between border-b-blue-100 border-b'>
                            <h1>Add new Product</h1>
                            <button onClick={handleShow}><i className="fa-solid fa-xmark rounded-full p-2 hover:bg-gray-200"></i></button>
                        </div>
                        <div className='w-full'>
                            <div className='flex gap-5 flex-col pb-3'>
                                <div>
                                    <label htmlFor="title">Name</label>
                                    <input name='title' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter product name' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <input name='category' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter product category' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea name='description' className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter product description' onChange={handleChange}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input name='price' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter product price' onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input name='image' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter image url' onChange={handleChange} />
                                </div>
                                <div className="w-full flex justify-end gap-3">
                                    <button onClick={handleShow} className='rounded-2xl h-10 w-24 border-gray-400 border text-white hover:text-gray-400 hover:bg-white bg-gray-400'>
                                        Cancel
                                    </button>
                                    <button disabled = {mutationAdd.isPending} onClick={handleAdd} className='rounded-2xl h-10 w-24 border-green-400 border text-white hover:text-green-400 hover:bg-white bg-green-400'>
                                        {mutationAdd.isPending ? 'Adding': 'Add'}
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
