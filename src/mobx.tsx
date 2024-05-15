import React, { useState } from 'react';
import userData from './api/apiTest.json'
import { observer } from 'mobx-react';
import store, { UserType } from './storeMobX';
import ModalAdd from './modal/mobx/modalAdd';
import ModalUpdate from './modal/mobx/modalUpdate';
const Mobx = () => {
    console.log(store.users);
    const [dataAdd, setDataAdd] = useState<UserType[]>([])
    const [showAdd, setShowAdd] = useState<Boolean>(false)
    const [showUpdate, setShowUpdate] = useState<Boolean>(false)
    const [idUpdate, setIdUpdate] = useState<number>()
    function handleShow(){
        setShowAdd(!showAdd);
    }
    function handleShowUpdate(){
        setShowUpdate(!showUpdate);
    }
    return (
        <div>
            <div className='w-full flex justify-end sticky z-30 top-32 left-0 right-0'>
                <button className='bg-green-400 border p-3 rounded-3xl text-white hover:text-green-400 hover:bg-white hover:border-green-400' onClick={handleShow}>Add new <i className="fa-solid fa-plus"></i></button>
            </div>
            <div className='w-10/12 mx-auto h-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 auto-rows-auto'>
                {store.users?.map((item, index) => (
                    <div key={index} className='flex flex-col justify-center items-center'>
                        <div>{item.isAdmin === "1" ? (<i className="fa-solid fa-user-tie text-2xl text-red-500"></i>) : (<i className="fa-solid fa-user text-2xl text-blue-500"></i>)}</div>
                        <div className='flex flex-col items-start'>
                            <div><span className='font-bold'>User Name: </span> {item.username}</div>
                            <div><span className='font-bold'>First Name: </span>{item.firstName}</div>
                            <div><span className='font-bold'>Last Name: </span>{item.lastName}</div>
                            <div><span className='font-bold'>Email: </span>{item.email}</div>
                            <div className='flex justify-between w-full items-center'>
                                <div><span className='font-bold'>Age: </span>{item.age}</div>
                                <div className='flex gap-3 justify-start'>
                                    <button onClick={() => {setIdUpdate(item.id); setShowUpdate(!showUpdate)}} > <i className="fa-solid fa-edit text-blue-800"></i></button>
                                    <button onClick={() => store.removeUser(item.id)} > <i className="fa-solid fa-trash text-red-500"></i></button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}

                {showAdd && <ModalAdd handleShow={handleShow}/>}
                {showUpdate && <ModalUpdate handleShowUpdate={handleShowUpdate} idUpdate = {idUpdate}/>}
            </div>
        </div>
    );
}

export default observer(Mobx);
