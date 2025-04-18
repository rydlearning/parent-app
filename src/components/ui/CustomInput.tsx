import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function CustomInput({ type, title, placeholder, onChange, required, pattern, maxLength }: Props){
    const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[20px] py-[12px] outline-none active:outline-none`;

    return (
        <input
            min={7}
            max={16}
            type={type || "text"}
            placeholder={placeholder}
            className={`${inputFieldStyle}`}
            onChange={onChange}
            pattern={pattern}
            title={title}
            required={required}
            maxLength={maxLength}
        />
    )
}
