import React from 'react';
import sectionImg from '../../../assets/images/sectionImg.svg';
import sectionImg2 from '../../../assets/icons/g_hat.svg';
import { Button } from '../../../components/ui';

interface Props {
    toggleRegModal: () => void
}

export default function SectionOne({ toggleRegModal }: Props) {
    const sectionOneStyle = `rounded-[16px] w-full bg-ryd-primaryLess1 lg:px-[5rem] px-5 lg:py-[3rem] py-5 mt-[1.5rem]`;
    const headerH1Style = `lg:text-[22px] text-[18px] col-span-1 leading-[30px] w-fit font-[400] font-[AvertaStd-Semibold] text-[#020C16]`;
    const headerPStyle = `text-[14px] leading-[24px] text-ryd-primary rounded-[65px] bg-white py-4 pl-[4rem] pr-6 border-0`;
    const addBtnStyle = 'rounded-[12px] border-0 col-span-1 lg:text-[16px] text-[12px] hover:bg-ryd-primary/[0.9] font-[400] text-white lg:px-[26px] px-[20px]  py-[14px]';

    return (
        <section className={sectionOneStyle}>
            <div className='h-fit my-auto grid  items-center gap-10'>
                <div className='w-full  lg:flex grid grid-cols-2 lg:items-center items-start lg:justify-between'>
                    <h1 className={headerH1Style}>Welcome to your RYD Activity Board</h1>

                    <div className='flex justify-end lg:mt-0 mt-2'>
                        <Button
                            text='Add Child +'
                            isInverted={false}
                            category='button'
                            handleClick={toggleRegModal}
                            btnStyle={addBtnStyle}
                        />
                    </div>
                </div>
                <div className='flex items-center relative'>
                    <img src={sectionImg2} alt="section img2" className='h-[50px] w-[60px] absolute' />
                    <p className={headerPStyle}>Yet to enroll your child? Click 'Add Child +' to get started 😉</p>
                </div>
            </div>
        </section>
    )
}
