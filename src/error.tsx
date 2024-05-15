import React from 'react';
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div className='h-auto mt-20'>
            <span>Some thing has wrong, <Link to={'/'} className='bg-gray-500 text-white rounded-2xl p-4'>Back to home</Link></span>
        </div>
    );
}

export default Error;
