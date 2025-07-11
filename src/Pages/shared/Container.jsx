import React from 'react';

const Container = ({children}) => {
    return (
        <div className='w-full md:w-11/12 mx-auto px-4 md:px-3'>
            {children}
        </div>
    );
};

export default Container;