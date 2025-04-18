import React from 'react';
import { Link } from 'react-router-dom';
import mediaIcon from '../../assets/icons/mediaIcon.svg';
import { formatCurrency, formatDate } from '../custom-hooks';
import imgBg from '../../assets/images/bg-info.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { curriculum } from '../../utils/constants';

interface Props {
    imageUrl: string,
    amount: number,
    title: string,
    description: string,
    minAge: number,
    maxAge: number,
    week: number,
    createdAt: any,
    mediaUrl: string,
    altAmount: number,
    attendance: any[],
    classUrl: string,
    docUrl: string,
    childName: string,
    teacher: string,
    isActive: boolean,
    oldClassLink: string,
    level: number,
    cohort: any,
}

export default function ActivityCard({
    imageUrl, amount, level,
    altAmount, title,
    description, minAge,
    maxAge, week,
    createdAt, mediaUrl,
    attendance, classUrl,
    docUrl, childName,
    teacher,
    isActive, oldClassLink, cohort
}: Props ) {
    const currencyInfo: any = useSelector((state: RootState) => state.user.currency);
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const cardContainerStyle = 'h-fit border border-[#E7EEFE] shadow shadow-ryd-primaryLess1 rounded-[16px] w-full grid lg:grid-cols-5 grid-cols-1';
    const programStyle = 'rounded-[10px] px-[15px] py-[1px] bg-[#ECF9EA]/[.8] text-ryd-green  text-center w-fit text-[12px] font-[800]';
    const h1Style = 'leading-0 lg:text-[24px] text-[20px] font-[400] font-[AvertaStd-Semibold] text-ryd-subTextPrimary';
    const pStyle = 'lg:text-[15px] leading-0 text-[14px] font-[400] text-[#576877] py-2';
    const flexBoxStyle = 'flex flex-wrap items-center lg:gap-5 gap-4';
    const mediaBoxContainer = 'w-full flex flex-wrap gap-5 items-center mt-5';
    const mediaBtn = 'flex items-center gap-2 px-[16px] lg:py-[7px] py-[7px] rounded-[16px] border border-[#476788] text-ryd-subTextPrimary text-[12px]';
    const goToBtn = 'flex items-center gap-2 px-[16px] lg:py-[7px] py-[7px] rounded-[16px] border border-ryd-primary text-ryd-primary hover:bg-ryd-primary hover:text-white text-[12px]';
    const goToBtnDisabled = 'flex items-center gap-2 px-[16px] lg:py-[7px] py-[7px] rounded-[16px] border border-gray-100 text-gray-100 text-[12px] cursor-not-allowed';
    const subFlexStyle = 'lg:flex items-center text-[13px] text-[#576877]';
    const subLabelStyle = 'text-white bg-ryd-primary py-1 px-3 rounded-tl-[10px] lg:rounded-bl-[10px] rounded-bl-[0px] lg:rounded-tr-[0px] rounded-tr-[10px] text-[12px]';
    const subPStyle = ' bg-ryd-primaryLess1 py-1 px-3 lg:rounded-tr-[10px] lg:rounded-bl-[0px] rounded-bl-[10px]  rounded-tr-[0px] rounded-br-[10px] text-[12px] text-center';

const getCurriculum = (title: string, level: number) => {
    if(title.toLowerCase().includes('basic')){
        if(Number(level) === 1){
            return curriculum.l1_basic;
        }else if(Number(level) === 2){
            return curriculum.l2_basic;
        }else if(Number(level) === 3){
            return curriculum.l3_basic;
        }else{
            return '';
        }
    }else{
        if(Number(level) === 1){
            return curriculum.l1_advanced;
        }else if(Number(level) === 2){
            return curriculum.l2_advanced;
        }else if(Number(level) === 3){
            return curriculum.l3_advanced;
        }else{
            return '';
        }
    }
}

    return (
        <div className={cardContainerStyle}>
            <div className='col-span-1 p-2'>
                <div className="lg:h-full h-[200px] overflow-hidden rounded-[16px]">
                    <img src={imageUrl} alt="banner" className='scale-110 h-full w-full rounded-[16px] border' />
                </div>
            </div>
            <div className='lg:col-span-4 col-span-1 px-[2rem] pt-2 pb-5'>
                <div className="flex items-center justify-between py-2">
                    <h1 className={h1Style}>{title+(isActive?" *":"")}</h1>
                    <div className={programStyle}>
                        {currencyInfo?.currencyCode}
                        {userInfo.country.toLowerCase() === 'nigeria' ? formatCurrency(altAmount) :
                        (userInfo.country.toLowerCase() !== 'nigeria') ?  formatCurrency(amount * currencyInfo.rate) :
                        formatCurrency(amount)}
                    </div>
                </div>

                <p className={`${pStyle} first-letter:uppercase`}>{description} - {childName}</p>

                <div className={flexBoxStyle}>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Age Range</label>
                        <p className={subPStyle}>{minAge} - {maxAge}</p>
                    </div>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Duration</label>
                        <p className={subPStyle}>{week} Weeks</p>
                    </div>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Date Registered</label>
                        <p className={subPStyle}>{formatDate(createdAt)}</p>
                    </div>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Attendance</label>
                        <p className={subPStyle}>{attendance.length}</p>
                    </div>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Teacher</label>
                        <p className={subPStyle}>{teacher.includes("undefined") ? "No Teacher" : teacher}</p>
                    </div>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Cohort</label>
                        <p className={subPStyle}>{cohort?.title || "No Cohort Assigned"}</p>
                    </div>
                </div>
                <div className={mediaBoxContainer}>
                    <Link to={mediaUrl} target='_blank' rel="noopener noreferrer" className={mediaBtn}>
                        <img src={mediaIcon} alt="media" className='h-[14px] w-[14px]' />
                        <span>Media</span>
                    </Link>
                    {/* {docUrl === '' ?
                        <button disabled className={goToBtnDisabled}>Get Curriculum</button>
                    :
                    <Link to={getCurriculum(title, level)} aria-disabled className={goToBtn} target='_blank' rel="noopener noreferrer">Get curriculum</Link>
                    {/* } */}
                    {oldClassLink?<Link to={oldClassLink} className={goToBtn} target='_blank' rel="noopener noreferrer">Previous Class</Link>:null}
                    <Link to={classUrl} className={goToBtn} target='_blank' rel="noopener noreferrer">Go to class</Link>
                </div>
            </div>
        </div>
    )
}
