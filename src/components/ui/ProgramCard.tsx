import React, { useEffect, useState } from 'react';
import Button from './Button';
import checkCircle from '../../assets/icons/check-circle.svg';
import successIcon from '../../assets/icons/successIcon.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { formatCurrency } from '../custom-hooks';

interface Props {
    price: number,
    altPrice: number,
    program: string,
    description: string,
    features?: string[],
    id: any,
    setSelected?: (data:any) => void,
    selected?: any,
    minAge: number,
    maxAge: number,
    duration: number,
    country: any
}


const priceContainer = `flex items-center p-0 border-y`;
const priceH1Style = `lg:text-[29px] text-ryd-primary text-[24px] font-[400] font-[AvertaStd-Semibold] leading-[45px]`
const pricePStyle = `text-[13px] leading-[26px] font-[400] font-[AvertaStd-Light]`;
const listItemStyle = `text-[14px] pb-[1rem] pt-[.5rem] border-t grid gap-2`;
const descriptionStyle = 'lg:text-[14px] text-[13px] leading-[22px] mb-2 pt-3 pb-1 font-[AvertaStd-Light]';
const programStyle = 'tracking-wide capitalize font-[900] text-[23px] leading-[35px] py-1 font-[AvertaStd-Light]';
const containerStyle = 'border rounded-[8px] lg:px-[1.2rem] px-[25px] pt-[1.2rem] relative';
const overlayContainer = 'absolute top-0 right-0 left-0 h-full w-full rounded-[8px] bg-gray-100/[0.8]';


export default function ProgramCard({ setSelected, selected, id, price, program, description, minAge, maxAge, duration, country, altPrice }: Props) {
    const currencyInfo =  useSelector((state: RootState) => state.user.currency);

    const  [ currency, setCurrency ] = useState<any>(null);

    useEffect(() => {
        if(currencyInfo && currencyInfo?.useRate){
            setCurrency(currencyInfo);
        }
    }, [currencyInfo]);


    return (
        <div className={containerStyle}>
            <h1 className={programStyle}>{program}</h1>
            <div className={priceContainer} style={{display: 'none'}}>
                <h1 className={priceH1Style}>
                    <span className='text-[16px]'>
                        {currency ? currency?.currencyCode : 'USD'}&nbsp;
                    </span>
                    {(currency && country.toLowerCase() === 'nigeria') ? formatCurrency(altPrice) :
                    (currency && country.toLowerCase() !== 'nigeria') ?  formatCurrency(price * currency?.rate) :
                    formatCurrency(price)}
                </h1>
                <p className={pricePStyle}>/month</p>
            </div>
            <p className={descriptionStyle}>{description}</p>
            <ul className={listItemStyle}>
                <li className='text-[14px] font-[900] font-[AvertaStd-Light]'>Age range: <span className='font-[400]'>{minAge}yrs - {maxAge}yrs</span></li>
                <li className='text-[14px] font-[900] font-[AvertaStd-Light]'>Duration: <span className='font-[400]'>{duration}weeks</span></li>
            </ul>

            {/* <Button
                text='Select plan'
                isInverted={true}
                category='button'
                handleClick={() => handleProgramSelect(id)}
                btnStyle='w-full rounded-[8px] border border-ryd-primary mt-6 text-[16px] leading-[26px] font-[400] text-ryd-primary px-[26px] hover:text-white hover:bg-ryd-primary py-[12px]'
            />
            {selected === id &&
                <div className={overlayContainer}>
                    <img
                        src={successIcon}
                        alt="success-icon"
                        className='h-[100px] w-[100px] mx-auto mt-[6rem]'
                        />
                </div>
            } */}
        </div>
    )
}
