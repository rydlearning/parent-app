import React, { useEffect, useState } from 'react';

type Props = {
    country: any, 
    className: string,
    handlePhoneInputChange: (data: string) => void;
}

const  countriesArr = require('../../utils/countries.json');


export default function PhoneNumberInput({ country, handlePhoneInputChange, className }: Props) {
    const [ phoneCode, setPhoneCode ] = useState('')
    const [ phone, setPhone ] = useState('');

    useEffect(() => {
        if(phone !== ''){
            const phoneNumber = `${phoneCode}${phone}`;
            handlePhoneInputChange(phoneNumber)
        }
    }, [phone])

    useEffect(() => {
        const codeWithSign = country?.phone_code.includes('+') ? country?.phone_code : `+${country?.phone_code}`;
        setPhoneCode(codeWithSign);
    }, [country])

  const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] pr-[26px] pl-[15px] py-[10px] outline-none active:outline-none`;

  return (
    <div className={`${inputFieldStyle} flex items-center gap-x-2`}>
        <div className=''>{phoneCode}</div>
        <input 
            type="tel" 
            placeholder='10 0112 233'
            pattern="[0-9]*"
            onChange={(e: any) => setPhone(e.target.value)}
            required={true} 
            className='px-2 border-l outline-0 w-full bg-transparent'
        />
    </div>
  )
}