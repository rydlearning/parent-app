import React from 'react'
import { Button } from '../../../components/ui';
import successGif from '../../../assets/images/success.json';
import Lottie from 'lottie-react';

type Props = {}

export default function SuccessPage(){
  const h1Style = 'lg:leading-[58.8px] leading-[43px] lg:text-[40px] text-[35px] font-[400] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';
  const pStyle = 'lg:text-[18px] text-[14px] leading-[26px] font-[400] font-[AvertaStd-Light]';
  const btnStyle = 'lg:w-[60%] md:w-[80%] w-full mx-auto rounded-[16px] text-center border-0 mt-6 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[13px]';

  return (
    <div className='lg:w-[40%] w-[90%] mx-auto grid gap-y-5 text-center mt-[8rem] px-7 pb-[4rem]'>
        <div className='lg:h-[180px] h-[100px] lg:w-[180px] w-[100px] mx-auto'>
            <Lottie animationData={successGif} />
        </div>
        <h1 className={h1Style}>Successful!</h1>
        <p className={pStyle}>You've successfully created your account. <br /> Click on the button below to begin your exciting learning journey with us. Happy learning!</p>
        <Button 
            text='Proceed to Dashboard'
            to='/parent/home'
            isInverted={false}
            category='link'
            btnStyle={btnStyle}
        />
    </div>
  )
}