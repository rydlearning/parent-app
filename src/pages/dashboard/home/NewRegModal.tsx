import React, {useEffect, useState} from 'react';
import {Button, CustomInput, DateSelect, GenderSelect,} from '../../../components/ui';
import CustomDropdown from '../../../components/ui/CustomDropdown';
import {toast} from 'react-toastify';
import UserService from '../../../services/user.service';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/rootReducer';
import {calculateAge} from '../../../components/custom-hooks';
import closeIcon from "../../../assets/icons/closeIcon.svg";
import {filterDaysOfTheWeek, restructureTimeData} from "../../../utils/Tools";
import {SPECIAL_COHORT_NUM} from "../../../utils/constants";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface ChildRegProps {
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
}

const initialValues = {
    firstName: '',
    lastName: '',
    age: 0,
    gender: 'male',
}

interface Props {
    handleNext: () => void;
    setChildInfo: (data: any) => void;
    closeModalOnOutsideClick: (data: boolean) => void;
    closeRegModal: () => void;
}


const formStyle = `lg:h-fit h-[80vh] overflow-y-auto px-7 pb-[2rem] pt-[2rem]`;
const h1Style = `font-[400] text-[25px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mb-[1rem]`;
const flexContainer = `w-full lg:flex grid gap-5 mb-[1rem]`;
const gridContainer = `w-full grid gap-1`;
const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[12px] outline-none active:outline-none`;
const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;
const legendStyle = 'mx-auto px-5 py-2 text-[11px] bg-amber-100 mt-3 rounded-[16px] mb-[1rem]';

//global time storage
let staticTime: any = []
let cohortKeep: any = []

export default function NewRegModal({handleNext, setChildInfo, closeModalOnOutsideClick, closeRegModal}: Props) {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const userService = new UserService();

    const [value, onChange] = useState<Value>(new Date());

    const [formData, setFormData] = useState(initialValues);
    const [dayTime, setDayTime] = useState<any>([]);
    const [dayArr, setDayArr] = useState<{ name: string; value: number; }[] | []>([]);
    const [selectedDay, setSelectedDay] = useState<{ name: string, value: number } | null>(null);
    const [timeArr, setTimeArr] = useState<{ name: string; value: number; }[] | []>([]);
    const [selectedTime, setSelectedTime] = useState<{ name: string, value: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [cohortId, setCohortId] = useState(0);
    const [cohortArr, setCohortArr] = useState<{ name: string; value: number; }[] | []>([]);
    //new states
    const [packages, setPackages] = useState<any>([])
    const [selectedPackage, setSelectedPackage] = useState<any>()
    const [selectedSubPackage, setSelectedSubPackageId] = useState<any>(null)


    // load all available days and their corresponding time for BE
    const getDayTime = async () => {
        try {
            const response = await userService.getDayTime();
            if (!response.status) {
                toast.error(response.message)
                return;
            }
            setDayTime(response.data);
            staticTime = response.data
            // dispatch(setDayTimeInfo(response.data))
            const responsePkg = await userService.getAllPackages()
            if (!responsePkg.status) {
                toast.error(response.message)
                return;
            }
            setPackages(responsePkg.data)

            const responseCohort = await userService.getCohort()
            if (!responseCohort.status) {
                toast.error(responseCohort.message)
                return;
            }
            setCohortArr(responseCohort.data);
            cohortKeep = responseCohort.data

            if (response?.data?.length > 0) {
                // extracted dayText and day values and saved them as 'name' and 'value' respectively for ease of use in the custom dropdown component
                setDayArr(filterDaysOfTheWeek(response?.data))
            }
        } catch (err: any) {
            toast.error(err?.message);
        }
        return false;
    };

    const handleDateChange = (e: any) => {
        const age = calculateAge(e);
        setFormData({...formData, age});
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!selectedDay || !selectedTime || !cohortId || formData.age < 7) {
            toast.error('date, time, valid age and cohort is required!');
            return;
        }

        setLoading(true);
        try {
            const response = await userService.addChild(formData);
            setLoading(false);
            if (!response.status) {
                toast.error(response.message);
                return;
            }
            const childData = {...response.data, selectedDay, selectedTime, cohortId, pkgId: selectedPackage.id};
            setChildInfo(childData);
            handleNext();
        } catch (err: any) {
            setLoading(false);
            toast.error(err.message);
        }

        return false;
    };


    const keepModalOpen = () => {
        // if all these are unfilled or empty then closing modal by clicking outside is possible
        if (formData.firstName === '' && formData.lastName === '' && formData.age === 0 && selectedTime === null && selectedDay === null) {
            closeModalOnOutsideClick(true)
        } else {
            closeModalOnOutsideClick(false)
        }
    }


    useEffect(() => {
        getDayTime();
        keepModalOpen();
    }, []);

    useEffect(() => {
        keepModalOpen();
    }, [formData])

    useEffect(() => {
        if (selectedDay) {
            const timeX = dayTime?.filter((item: any) => item.dayText === selectedDay.name);
            const tdx = timeX[0].times;
            // extracted timeText and time values and saved them as 'name' and 'value' respectively for ease of use in the custom dropdown component
            let arr = []
            for (let i = 0; i < tdx.length; i++) {
                let name = tdx[i].timeText;
                let value = tdx[i].time;
                let _dy = {name, value};
                arr.push(_dy);
            }
            setTimeArr(arr)
        }
    }, [selectedDay]);

    //filter time based on age
    useEffect(() => {
        if (formData.age >= 7) {
            //filter program
            const _age = formData.age
            const pkg = packages.find((f: any) => (f.minAge <= _age) && (f.maxAge >= _age) && Number(f.level) === 1)
            if (pkg) {
                setSelectedPackage(pkg)
                localStorage.setItem("package", JSON.stringify(pkg))
                //offload remote times
                if (pkg?.timeGroup) {
                    //this has a unique time
                    const remTimeData = restructureTimeData(pkg?.timeGroup?.times)
                    setDayArr(filterDaysOfTheWeek(remTimeData))
                    setDayTime(remTimeData)
                } else {
                    //populate normal time
                    setDayTime(staticTime)
                    setDayArr(filterDaysOfTheWeek(staticTime))
                }
            } else if (formData?.age >= 16 && !pkg) {
                toast.warn("Please try again next time. Program within the age range does not exist.")
            }
            //filer cohort
            if(formData.age<17){
                //filter cohort
                setCohortArr(cohortKeep.filter((c: any) => c.isVisible !== SPECIAL_COHORT_NUM))
            }else{
                //filter cohort
                setCohortArr(cohortKeep.filter((c: any) => c.isVisible === SPECIAL_COHORT_NUM))
            }
        }
        //unlock cohort selections

    }, [formData.age]);


    return (
        <form className={formStyle} onSubmit={handleSubmit}>

            <img src={closeIcon} alt="close" className='float-right relative -top-4 -right-3 hover:cursor-pointer'
                 onClick={closeRegModal}/>

            <h1 className={h1Style}>Register Child</h1>

            <div className={legendStyle}>Every child will adopt and use the parent's registered timezone and
                time-offset: <br/>
                <span
                    className='text-green-600'>{userInfo.timeOffset > 0 && '+'}&nbsp;&nbsp;{userInfo.timezone} ({userInfo?.timeOffset})</span>
            </div>

            {/* first name and last name  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>First name</label>
                    <CustomInput
                        type="text"
                        placeholder='John'
                        required={true}
                        onChange={(e: any) => setFormData({...formData, firstName: e.target.value})}
                        value={formData.firstName}
                    />
                </div>
                <div className={gridContainer}>
                    <label className={labelStyle}>Last name</label>
                    <CustomInput
                        type="text"
                        placeholder='Doe'
                        required={true}
                        onChange={(e: any) => setFormData({...formData, lastName: e.target.value})}
                        value={formData.lastName}
                    />
                </div>
            </div>

            {/* gender  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Gender</label>
                    <GenderSelect
                        handleGenderChange={(item: string) => setFormData({...formData, gender: item})}
                        className={inputFieldStyle}
                    />
                </div>
                <div className={gridContainer}>
                    <label className={labelStyle}>Child Age. Min [{formData.age || 7}]</label>
                    {/*<DatePicker onChange={handleDateChange} value={value} format={"yyyy-MM"} />*/}
                    {/*<DateSelect*/}
                    {/*    handleDateChange={handleDateChange}*/}
                    {/*/>*/}
                    <select required={true} className={inputFieldStyle}
                            onChange={(item: any) => setFormData({...formData, age: item.target.value})}
                            value={formData.age}>
                        <option value={0}>--Choose age</option>
                        {Array.from(Array(31).keys()).slice(7, 31).map((i) => <option>{i}</option>)}
                    </select>
                    {/*<CustomInput*/}
                    {/*    type="number"*/}
                    {/*    placeholder='Child age'*/}
                    {/*    required={true}*/}
                    {/*    onChange={(e: any) => {*/}
                    {/*        let d = e.target.value*/}
                    {/*        if (Number(d) >= 7 && Number(d) <= 30) {*/}
                    {/*            setFormData({...formData, age: Number(d)})*/}
                    {/*            //trig package filter*/}

                    {/*        } else {*/}
                    {/*            if (d.toString().length > 0) {*/}
                    {/*                //toast.error("Child age must be between 7 and 16")*/}
                    {/*            }*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    value={formData.age}*/}
                    {/*/>*/}
                </div>
            </div>

            {/* available packages  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Program</label>
                    <p className={inputFieldStyle}>
                        {selectedPackage?.title || "Awaiting age input"}
                    </p>
                </div>
            </div>

            {/* available days  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Lesson day</label>
                    <CustomDropdown
                        className={inputFieldStyle}
                        handleChange={(data: { name: string, value: number }) => setSelectedDay(data)}
                        data={dayArr}
                    />
                </div>
            </div>

            {/* available time  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Lesson time</label>
                    <CustomDropdown
                        className={inputFieldStyle}
                        handleChange={(data: { name: string, value: number }) => setSelectedTime(data)}
                        data={timeArr}
                    />
                </div>
            </div>

            {/* available cohort  */}
            <div className={flexContainer} style={{display: formData?.age?'block':'none'}}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Choose Cohort</label>
                    <select className={inputFieldStyle} onChange={(e: any) => {
                        setCohortId(Number(e.target.value))
                    }}>
                        <option value={0}>--Choose Cohort--</option>
                        {cohortArr && cohortArr.map((d: any, i: number) => <option key={i}
                                                                                   value={d.id}>{d.title}</option>)}
                    </select>
                </div>
            </div>

            <Button
                text={loading ? 'Processing...' : 'Next'}
                isInverted={false}
                category='button'
                btnStyle='w-full rounded-[16px] border-0 mt-6 text-[16px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
            />

        </form>
    )
}
