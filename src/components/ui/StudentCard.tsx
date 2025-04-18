import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import achieveImg from '../../assets/images/achieveImg.svg';
import { formatDate } from '../custom-hooks';
import premiumIcon from '../../assets/icons/premium.svg';
import onPremiumIcon from '../../assets/icons/on.premium.svg';
import { Days, Times } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setRenewal } from '../../redux/reducers/userSlice';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import 'moment-timezone';
import { RootState } from '../../redux/rootReducer';

interface Props {
    setTab: (data: number) => void,
    item: any,
}

export default function StudentCard({ setTab, item }: Props) {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const dispatch = useDispatch();
    const [ hoverToggle, setHoverToggle ] = useState<any>(false);
    
    const cardContainerStyle = 'border shadow shadow-ryd-primaryLess1 border-ryd-gray rounded-[16px] w-full grid relative p-2';
    const h1Style = 'clear-both lg:text-[24px] capitalize text-[20px] lg:mt-1 mb-2 leading-[35px] font-[400] font-[AvertaStd-Semibold] text-ryd-subTextPrimary';
    const pStyle = 'text-[13px]  px-5 py-[2px] rounded-r-[16px] border border-ryd-primaryLess1 font-[400] text-[#576877] capitalize';
    const mediaBoxContainer = 'w-full flex flex-wrap lg:justify-between gap-3 items-center mt-[2rem]';
    const goToBtn = 'flex items-center gap-1 px-[15px] lg:py-[7px] py-[5px] rounded-[1000px] border  text-[12px]';
    const subFlexCont = 'flex items-center'
    const labelStyle = 'text-[13px] py-[3px] px-3 bg-ryd-primaryLess1 text-ryd-primary border-0 rounded-l-[16px]';

    const pTime = moment()
        pTime.day(item?.programs[0]?.day)
        pTime.hour(item?.programs[0]?.time)
        pTime.second(0)
        pTime.minute(0)
    return (
        <div className={cardContainerStyle}>
            <img src={achieveImg} alt="achieve" className='absolute right-0 -top-2 h-[70px] w-[70px] drop-shadow' />

            <div className='pt-7 pb-[2rem] w-fit mx-auto'>
                <div className='flex  flex-wrap items-start  gap-5'>
                    <h1 className={h1Style}>{item?.firstName} {item?.lastName}</h1>
                    <div
                        className={`text-[10px] relative z-10 px-3 py-1 rounded-[16px] tracking-wide text-white ${item.status && item.allowNewCohort === false ? 'bg-green-500' : 'bg-red-500'}`}>{item.status && item.allowNewCohort === false ? 'Active' : 'Inactive'}</div>
                </div>


                <div className='flex flex-wrap gap-3 mt-4'>
                    <div className={subFlexCont}>
                        <label className={labelStyle}>Gender</label>
                        <label className={pStyle}>{item.gender}</label>
                    </div>
                    <div className={subFlexCont}>
                        <label className={labelStyle}>Age</label>
                        <label className={pStyle}>{item.age}</label>
                    </div>
                </div>

                <div className='flex gap-3 mt-4'>
                    <div className={subFlexCont}>
                        <label className={labelStyle}>Program</label>
                        <label className={pStyle}>{item?.programs[0]?.package?.title}</label>
                    </div>
                    <div className={subFlexCont}>
                        <label className={labelStyle}>Level</label>
                        <label className={pStyle}>{Number(item?.programs[0]?.package?.level)}</label>
                    </div>
                </div>

                {/* study day/ time  */}
                <div className='flex gap-3 mt-4'>
                    <div className={subFlexCont}>
                        <label className={labelStyle}>Study day</label>
                        <label className={pStyle}>{Days[item?.programs[0]?.day]}</label>
                    </div>
                    <div className={subFlexCont}>
                        <label className={labelStyle}>Time</label>
                        <label className={pStyle}>
                            <Moment format="hh:mm A" date={pTime.toISOString()}></Moment>
                        </label>
                    </div>
                </div>

                {/* <div className='flex gap-8 mt-[.4rem]'> */}
                <div className={`${subFlexCont} mt-4`}>
                    <label className={labelStyle}>Commence date</label>
                    <label className={pStyle}>{item?.programs[0]?.cohort?formatDate(item?.programs[0]?.cohort?.startDate):"No Cohort Date"}</label>
                </div>

                <div className={`${subFlexCont} mt-4`}>
                    <label className={labelStyle}>Cohort</label>
                    <label className={pStyle}>{item?.programs[0]?.cohort?.title || "No Cohort Assigned"}</label>
                </div>

                <div className={mediaBoxContainer}>
                    <button
                        onClick={() => setTab(item?.id)}
                        className={`${goToBtn} border-ryd-primary text-ryd-primary hover:bg-ryd-primary hover:text-white`}>
                        View Activity
                    </button>

                    {
                        <Link
                            to={item?.programs[item?.programs.length - 1]?.teacher?.classLink}
                            className={`${goToBtn} border-ryd-primary text-ryd-primary hover:bg-ryd-primary hover:text-white`}
                            target='_blank'
                            rel="noopener noreferrer">
                            Go to class
                        </Link>
                    }

                    {item.allowNewCohort === true &&
                        <button
                            onClick={() => dispatch(setRenewal(item))}
                            className={`${goToBtn} border-red-800 text-red-800 hover:bg-red-800 hover:text-white`}
                            onMouseOver={() => setHoverToggle(true)}
                            onMouseOut={() => setHoverToggle(false)}
                        >
                            <img
                                src={hoverToggle ? premiumIcon : onPremiumIcon}
                                alt="prem"
                                className='h-[15px] flex items-start'
                            />
                            Add New Program
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
