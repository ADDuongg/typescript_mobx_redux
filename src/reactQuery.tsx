import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import tw from 'twin.macro';
import { getAPI, postAPI, putAPI } from './crud';
import { APIData } from './crud';
import styled from 'styled-components';
import ModalAdd from './modal/tanstack/modalAdd';
import ModalUpdate from './modal/tanstack/modalUpdate';
const Modal = styled.div`
    ${tw`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-40`}
`;

const ModalContent = styled.div`
    ${tw`bg-white  rounded-lg w-2/6 h-auto`}
`;
interface CustomButtonProps {
    bg?: string; // prop bg là một chuỗi tùy chọn
}

const CustomButton = styled.button<CustomButtonProps>`
    ${tw`p-2 rounded-2xl border mb-5 text-white`}
    background-color: ${props => props.bg ? props.bg : 'transparent'};
    &:hover {
        background-color: ${props => props.bg ? 'white' : 'transparent'};
        color: ${props => props.bg ? props.bg : 'inherit'}; 
        border: 1px solid ${props => props.bg ? props.bg : 'inherit'};
    }
`;




function TypescriptPage() {
    const [newProduct, setNewProduct] = useState<Partial<APIData>>({});
    const [dataProduct, setDataProduct] = useState<APIData[]>([]);
    const [idUpdate, setIdUpdate] = useState<number>();
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const queryClient = useQueryClient();

    // Load data from Local Storage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem('dataProduct');
        if (storedData) {
            setDataProduct(JSON.parse(storedData));
        }
    }, []);

    const { data, isLoading, isSuccess } = useQuery<APIData[]>({
        queryFn: () => getAPI(''),
        queryKey: ['products']
    });

    useEffect(() => {
        if (data) {
            setDataProduct(data);
            localStorage.setItem('dataProduct', JSON.stringify(data));
        }
    }, [data]);


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    function handleDelete(id: number) {

        setDataProduct(prevData => prevData.filter(item => item.id !== id));


        const localStorageData = localStorage.getItem('dataProduct') || '';
        const jsonData = JSON.parse(localStorageData);
        const updatedData = jsonData.filter((item: APIData) => item.id !== id);
        localStorage.setItem('dataProduct', JSON.stringify(updatedData));
    }

    const mutationAdd = useMutation<APIData, Error, Partial<APIData>>({
        mutationFn: async (newProductData) => {
            const response = await postAPI('', JSON.stringify(newProductData));
            return response as APIData;
        },
        onSuccess(dataResponse) {
            setDataProduct(prev => {
                const updatedProducts = [...prev, dataResponse];
                localStorage.setItem('dataProduct', JSON.stringify(updatedProducts)); // Save updated products to Local Storage
                return updatedProducts;
            });
        },
    });

    function handleShow() {
        setShow(!show);
    }
    function handleShowEdit() {
        setShowEdit(!showEdit);
    }
    function handleAdd() {
        mutationAdd.mutate(newProduct);
    }
    /* function handleUpdate(id: number) {
        mutationUpdate.mutate(id);
    } */
    return (
        <>
            {isLoading && (
                <div className="flex justify-center  items-center h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-700 bg-opacity-75">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 rounded-full" role="status">
                        <span className="visually-hidden ">
                            <svg className="animate-spin -inline-block w-8 h-8 border-4 rounded-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            )}
            <div  className='w-full flex justify-end sticky z-30 top-32 left-0 right-0'>
                <CustomButton bg={"green"} onClick={handleShow}>Add new <i className="fa-solid fa-plus"></i></CustomButton>
            </div>
            <div className='w-10/12 mx-auto h-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 auto-rows-auto'>
                {dataProduct?.map((product: APIData, index) => (
                    <div key={index} className='flex-col justify-between h-full w-full shadow-2xl rounded-3xl overflow-hidden'>
                        <div className='h-72 w-full p-4 group overflow-hidden'><img src={product.image} alt="" className='min-w-full h-full group-hover:scale-125 transition-all duration-300' /></div>
                        <div className='flex flex-col p-5 gap-2'>
                            <div><span className='font-bold'>Name: </span> {product.title}</div>
                            <div><span className='font-bold'>Category: </span>{product.category}</div>
                            <div className='line-clamp-4'><span className='font-bold'>Description: </span>{product.description}</div>
                            <div><span className='font-bold'>Price: </span>{product.price} $</div>
                            <div className='flex w-full flex-col justify-between gap-2'>
                                <div className='flex justify-start gap-2'>
                                    {Array.from({ length: Math.round(product?.rating?.rate) }, (_, index) => (
                                        <div className='' key={index}>
                                            <i className="fa-solid fa-star text-yellow-300 text-xl"></i>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex gap-3 justify-start'>
                                    <CustomButton onClick={() => { setShowEdit(!showEdit); setIdUpdate(product.id) }} bg={"blue"}> <i className="fa-solid fa-edit"></i></CustomButton>
                                    <CustomButton onClick={() => handleDelete(product.id)} bg={"red"}> <i className="fa-solid fa-trash"></i></CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {show && <ModalAdd mutationAdd = {mutationAdd} handleAdd={handleAdd} handleShow={handleShow} handleChange={handleChange} />}
            {showEdit && <ModalUpdate setDataProduct = {setDataProduct} idUpdate={idUpdate} /* handleUpdate={handleUpdate} */ handleShowEdit={handleShowEdit} /* handleChange={handleChange} */ />}

        </>
    );
}

export default TypescriptPage;
