import React from 'react';

const StatCard = ({ title, count, bg }) => {
    return (
        <div className={`${bg} flex flex-col justify-center items-center border border-[#dcdbdb] gap-2 shadow-xl p-7 rounded-lg`}>
            <h3 className="text-xl text-center text-main font-bold font-heading">{title}</h3>
            <p className="text-2xl text-center font-bold text-main">{count}</p>
        </div>
    );
};

export default StatCard;