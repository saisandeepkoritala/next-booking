"use client";
import React from 'react';

const Datepicker = ({ selectedDate, onDateChange, placeholder }) => {
    const handleChange = (e) => {
        onDateChange(e.target.value); 
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <input 
                type="date" 
                className="
                    appearance-none 
                    border-4
                    border-yellow-500 
                    rounded-md 
                    py-2 
                    px-4 
                    text-gray-700 
                    leading-tight 
                    focus:outline-none 
                    focus:bg-white 
                    focus:border-yellow-300
                    shadow-sm
                    hover:border-yellow-300
                    transition
                    ease-in-out
                    duration-150
                    w-64
                "
                value={selectedDate}
                onChange={handleChange}
                name={placeholder}
                min={getCurrentDate()}
            />
        </div>
    );
}

export default Datepicker;
