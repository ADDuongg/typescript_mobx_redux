import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { APIData, putAPI } from '../../crud';
import { useMutation } from '@tanstack/react-query';
interface ModalUpdateProps {
    /*  handleUpdate: (id: number) => void; */
    handleShowEdit: () => void;
    /* handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; */
    idUpdate?: number;
    setDataProduct: React.Dispatch<React.SetStateAction<APIData[]>>;
}
const Modal = styled.div`
    ${tw`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-40`}
`;

const ModalContent = styled.div`
    ${tw`bg-white  rounded-lg w-2/6 h-auto`}
`;
const ModalUpdate: React.FC<ModalUpdateProps> = ({ handleShowEdit, idUpdate,setDataProduct }) => {
    const localData = localStorage.getItem('dataProduct')
    const jsonData = JSON.parse(localData || '');
    const dataUpdate = jsonData?.find((item: APIData) => item.id === idUpdate)
    const [updateProduct, setUpdateProduct] = useState<Partial<APIData>>({});
    /* const [dataProduct, setDataProduct] = useState<APIData[]>([]); */
    console.log(updateProduct);
    useEffect(() => {
        setUpdateProduct(dataUpdate)
    }, [idUpdate])
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setUpdateProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }


    const mutationUpdate = useMutation({
        mutationFn: async () => {
            const response = await putAPI(`/${idUpdate}`, JSON.stringify(updateProduct));
            return response as APIData;
        },
        onSuccess: (dataResponse: APIData) => {
            const updatedData = jsonData.map((item: APIData) => {
                if (item.id === dataResponse.id) {
                    return dataResponse;
                }
                return item;
            });
            localStorage.setItem('dataProduct', JSON.stringify(updatedData)); // Lưu dữ liệu mới vào localStorage
            setDataProduct(updatedData)
        },
    });


    function handleUpdate() {
        mutationUpdate.mutate();
    }
    return (
        <div>
            <Modal>
                <ModalContent>
                    <div className='w-full h-full flex flex-col p-4 gap-3'>
                        <div className='w-full flex justify-between border-b-blue-100 border-b'>
                            <h1>Update Product</h1>
                            <button onClick={handleShowEdit}><i className="fa-solid fa-xmark rounded-full p-2 hover:bg-gray-200"></i></button>
                        </div>
                        <div className='w-full'>
                            <div className='flex gap-5 flex-col pb-3'>
                                <div>
                                    <label htmlFor="title">Name</label>
                                    <input value={updateProduct?.title || ''} name='title' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter product name' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <input value={updateProduct?.category || ''} name='category' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter product category' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea rows={5} value={updateProduct?.description || ''} name='description' className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter product description' onChange={handleChange}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input value={updateProduct?.price || ''} name='price' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter product price' onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input name='image' type="text" className='shadow rounded-lg outline-none w-full p-3 focus:border focus:border-blue-300' placeholder='Enter image url' onChange={handleChange} />
                                </div>
                                <div className="w-full flex justify-end gap-3">
                                    <button onClick={handleShowEdit} className='rounded-2xl h-10 w-24 border-gray-400 border text-white hover:text-gray-400 hover:bg-white bg-gray-400'>
                                        Cancel
                                    </button>
                                    <button disabled = {mutationUpdate.isPending} onClick={() => handleUpdate()} className='rounded-2xl h-10 w-24 border-green-400 border text-white hover:text-green-400 hover:bg-white bg-green-400'>
                                        {mutationUpdate.isPending ? 'Updating' : 'Update'}
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
