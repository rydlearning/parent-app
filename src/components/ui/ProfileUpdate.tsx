import React, { useState } from 'react'
import CustomInput from './CustomInput';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import { setUserInfo } from '../../redux/reducers/authSlice';
import CountrySelectInput from './CountrySelect';
import StateSelectInput from './StateSelect';
import TimezoneSelect from './TimezonSelect';
import { setCurrency } from '../../redux/reducers/userSlice';
interface Props {
    closeModal: () => void;
}


const h1Style = 'font-[AvertaStd-Semibold] text-[23px] text-center font-[400] p-[1.3rem]';
const btnStyle = `text-center w-full py-3 text-[14px] font-[400]`;
const activeTab = `border-b-2 border-ryd-primary`;
const flexContainer = `w-full lg:flex grid gap-5 mb-[1rem]`;
const gridContainer = `w-full grid gap-1`;
const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;
const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[12px] outline-none active:outline-none`;


export default function ProfileUpdate({ closeModal }: Props) {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const userService = new UserService();
    const dispatch = useDispatch();

    const initialPasswordValues = {
        passwordOld: '',
        password1: '',
        password2: ''
    }
    
    const initialPersonalInfoValues = {
        firstName: userInfo.firstName,
        lastName: userInfo?.lastName,
        country: userInfo?.country,
        state: userInfo?.state,
        timezone: userInfo.timezone
    }

    const [ tab, setTab ] = useState(0);
    const [ passwordData, setPasswordData ] = useState(initialPasswordValues);
    const [ personalData, setPersonalData ] = useState(initialPersonalInfoValues);
    const [ loading, setLoading ] = useState(false);
    const [ country, setCountry ] = useState<any>(null);


    const handleTimezoneChange = (data: any) => {
        setPersonalData({...personalData, timezone: data.zoneName});
    }

    const handleCountryChange = (data: any) => {  
        setCountry(data);
        setPersonalData({...personalData, country: data.name, state: data?.states[0]?.name, timezone: data?.timezones[0]?.zoneName });
    }
    const handleStateChange = (data: any) => {
        setPersonalData({...personalData, state: data.name});
    }

    const getCurrency = async() => {
        try{
            const response = await userService.getCurrency();
            if(!response.status){
                return;
            }
            dispatch(setCurrency(response.data));
        }catch(err){
            return;
        }
    }
   
    const handlePersonalInfoUpdate = async(e: any) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await userService.profileUpdate(personalData);
            setLoading(false);
            if(!response?.status){
                toast.error(response?.message);
                return;
            }
            dispatch(setUserInfo(response.data));
            closeModal();
            getCurrency();
            toast.success(response?.message);
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
        }
    }

    const handlePasswordUpdate = async(e: any) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await userService.passwordUpdate(passwordData);
            setLoading(false);
            if(!response?.status){
                toast.error(response?.message);
                return;
            }
            setTab(0)
            closeModal();
            toast.success(response?.message);
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
        }
    }

    const Tabs = () => {
        return (
            <div className='full flex justify-between border-b items-center'>
                <button 
                    className={`${btnStyle} ${tab === 0 && activeTab}`} 
                    onClick={() => setTab(0)}>
                        Personal Information
                </button>
                <button 
                    className={`${btnStyle} ${tab === 1 && activeTab}`} 
                    onClick={() => setTab(1)}>
                    Password
                </button>
            </div>
        )
    }

    return (
        <div>
            <h1 className={h1Style}>Profile Update</h1>
            <Tabs />
            <form className='p-[2rem]' onSubmit={tab === 0 ? handlePersonalInfoUpdate : handlePasswordUpdate}>
                {/* personal information change  */}
                {tab === 0 &&
                    <div>       
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>First Name</label>
                                <CustomInput
                                    type="text" 
                                    placeholder={userInfo?.firstName}
                                    onChange={(e: any) => setPersonalData({...personalData, firstName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Last Name</label>
                                <CustomInput
                                    type="text" 
                                    placeholder={userInfo?.lastName}
                                    onChange={(e: any) => setPersonalData({...personalData, lastName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Country</label>
                                <CountrySelectInput
                                    placeholder={userInfo?.country}
                                    handleCountryChange={handleCountryChange}
                                    className={inputFieldStyle}
                                    />
                            </div>
                        </div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Province/State</label>
                                <StateSelectInput
                                    placeholder={userInfo?.state}
                                    country={country}
                                    handleStateChange={handleStateChange}
                                    className={inputFieldStyle}
                                    />
                            </div>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Study Timezone</label>
                                <TimezoneSelect
                                    placeholder={userInfo?.timezone}
                                    country={country}
                                    handleTimezoneChange={handleTimezoneChange}
                                    className={inputFieldStyle}
                                    />
                            </div>
                        </div>
                        <Button 
                            text={tab === 0 && loading ? 'Updating...' : 'Update'}
                            isInverted={false}
                            category='button'
                            type='submit'
                            btnStyle='w-full rounded-[16px] border-0 mt-6 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                        />
                    </div>
                }

                {/* password change  */}
                {tab === 1 &&
                    <div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Old Password</label>
                                <CustomInput
                                    type="password" 
                                    placeholder='XXXXXXXXX'
                                    required={true}
                                    onChange={(e: any) => setPasswordData({...passwordData, passwordOld: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>New Password</label>
                                <CustomInput
                                    type="password" 
                                    placeholder='XXXXXXXXX'
                                    required={true}
                                    onChange={(e: any) => setPasswordData({...passwordData, password1: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={flexContainer}>
                            <div className={gridContainer}>
                                <label className={labelStyle}>Confirm Password</label>
                                <CustomInput
                                    type="password" 
                                    placeholder='XXXXXXXXX'
                                    required={true}
                                    onChange={(e: any) => setPasswordData({...passwordData, password2: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button 
                            text={tab === 1 && loading ? 'Updating...' : 'Update'}
                            isInverted={false}
                            category='button'
                            type='submit'
                            btnStyle='w-full rounded-[16px] border-0 mt-6 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                        />
                    </div>
                }
            </form>
        </div>
    )
}
