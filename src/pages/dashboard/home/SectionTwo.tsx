import React from 'react';
import shoppingCart from '../../../assets/icons/shoppingCart.svg';
import { Button } from '../../../components/ui';

interface Props {
    toggleCartModal: () => void, 
    toggleRegModal: () => void,
    cart: boolean
}

export default function SectionTwo({ toggleCartModal,  cart }: Props) {

    const btnContainer = `flex items-center gap-x-2`;
    const cartDivStyle = 'px-[26px] py-[15px] bg-ryd-primaryLess1/[.3] hover:bg-ryd-primaryLess1/[.7] hover:cursor-pointer rounded-full';

    return (
        <section className='mt-[2.5rem] w-full flex justify-end'>
            <div className={btnContainer}>
                <div className='flex items-center relative'>
                     {/***** notification dot  ***/}
                    <div className={cartDivStyle}>
                        <img src={shoppingCart} alt="shopping-cart" />
                    </div>
                </div>
            </div>
            <div></div>
        </section>
    )
}
