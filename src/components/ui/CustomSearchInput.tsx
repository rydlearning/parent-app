import React, { InputHTMLAttributes, useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    handleSearch: () => void,
    setSearchValue: (e: any) => void,
}

export default function CustomInput({ type, placeholder, handleSearch, setSearchValue, required, pattern, maxLength }: Props){

    const inputFieldStyle = `w-full flex items-center gap-x-1 bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] pl-[1.5rem] pr-[.3rem] py-[.2rem] outline-none active:outline-none`;
    const boxStyle = `outline-none border-0 w-full bg-transparent`;
    const btnStyle = 'flex items-center justify-center rounded-r-[16px] rounded-l-[7px] bg-ryd-primary h-[43px] w-[60px] hover:cursor-pointer hover:bg-ryd-primary/[.9]';


    return (
        <div className={inputFieldStyle}>
            <input 
                type="search"
                placeholder={placeholder}
                className={boxStyle}
                onChange={setSearchValue}
            />

            <div className={btnStyle} onClick={handleSearch}>
                <img src={searchIcon} alt="search" className='h-[20px] w-[20px]' />
            </div>
        </div>
    )
}