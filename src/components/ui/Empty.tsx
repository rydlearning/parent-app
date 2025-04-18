import React from 'react';
import emptyImg from '../../assets/images/empty.svg';

interface Props {
    text: any
}

export default function Empty({ text }: Props) {
    const container = 'w-fit mx-auto mt-[2rem] grid gap-y-3';

    return (
        <div className={container}>
            <img src={emptyImg} alt="empty" className='h-[120px] w-[120px] mx-auto mb-2' />
            <p className='text-center text-[16px] font-[800] text-gray-300'>{text}</p>
        </div>
    )
}
