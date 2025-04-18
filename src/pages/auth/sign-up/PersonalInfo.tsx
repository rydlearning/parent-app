import { useEffect, useState } from 'react'
import { AuthLayout } from '../../../components/layouts';
import { Button, CountrySelectInput, CustomInput, PhoneNumberInput, StateSelectInput, Stepper, TimezoneSelect } from '../../../components/ui';
import { Link } from 'react-router-dom';
import { fetchTimezoneInfo } from '../../../components/custom-hooks';
import AuthService from '../../../services/auth.service';
import { toast } from 'react-toastify';

export type AuthProps = {
    props: {
        setFormData: (data: any) => void,
        loading?: boolean,
        formData: {
            firstName: string,
            lastName: string,
            email: string,
            country: string,
            state: string,
            phone: string,
            password: string,
            timezone: string,
            // timeOffset: number

        }
    },
    setActiveTab: () => void,
}

export default function PersonalInfo({ props, setActiveTab }: AuthProps) {
    const authService = new AuthService();
    const [ country, setCountry ] = useState<any>(null);
    const [ stateItem, setStateItem ] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ timezoneError, setTimezoneError ] = useState< null | string>(null)

    const { setFormData, formData } = props;

    const flexContainer = `w-full lg:flex grid lg:gap-3 gap-5 mb-[1rem]`;
    const gridContainer = `w-full grid gap-1`;
    const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[12px] outline-none active:outline-none`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;


    const handleStateChange = (data: any) => {
            setStateItem(data);
            setFormData({...formData, state: data.name});
        }

    const handlePhoneChange = (data: string) => {
        setFormData({...formData, phone: data});
    }

    const handleTimezoneChange = (data: any) => {
        setFormData({...formData, timezone: data.zoneName});
    }

    const handleCountryChange = (data: any) => {
        setCountry(data);
        setFormData({...formData, country: data.name, state: data?.states[0]?.name, });
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        if(formData.timezone === ''){
            setTimezoneError('Required!');
            toast.error('Timezone is required!')
            return;
        }

        setTimezoneError(null);
        setLoading(true);
        try{
            const response = await authService.verifyEmail({ email: formData.email });
            setLoading(false)
            if(!response.status){
                toast.error(response?.message);
                return
            }
            const obj = JSON.stringify(response)
            localStorage.setItem('email-confirmation', obj);
            setActiveTab()
        }catch(err: any){
            setLoading(false)
            toast.error(err?.message);
        }
        // verify email
    }



    return (
        <AuthLayout>
            <Stepper currentTab={1} />

            <form className='mt-[1.5rem] px-[1rem]' onSubmit={handleSubmit}>
                {/* first name and last name  */}
                <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>First Name</label>
                        <CustomInput
                            type="text"
                            placeholder='John'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Last Name</label>
                        <CustomInput
                            type="text"
                            placeholder='Doe'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>

                {/* email address  */}
                <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Email Address</label>
                        <CustomInput
                            type="email"
                            placeholder='Example@example.com'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                {/* country and state  */}
                <div className='mb-[1rem]'>
                    <div className={'w-full lg:flex grid lg:gap-3 gap-5'}>
                        <div className={gridContainer}>
                            <label className={labelStyle}>Country</label>
                            <CountrySelectInput
                                handleCountryChange={handleCountryChange}
                                className={inputFieldStyle}
                                />
                        </div>
                        <div className={gridContainer}>
                            <label className={labelStyle}>Province/State</label>
                            <StateSelectInput
                                country={country}
                                handleStateChange={handleStateChange}
                                className={inputFieldStyle}
                                />
                        </div>
                    </div>
                </div>

                {/* phone / timezone  */}
                <div className='mb-[1rem]'>
                    <div className={'w-full lg:flex grid lg:gap-3 gap-5'}>
                        <div className={gridContainer}>
                            <label className={labelStyle}>Phone</label>
                            <PhoneNumberInput
                                country={country}
                                handlePhoneInputChange={handlePhoneChange}
                                className={inputFieldStyle}
                            />
                        </div>
                        <div className={gridContainer}>
                            <label className={labelStyle}>Study Timezone { timezoneError && <small className='text-red-500'>({timezoneError})</small>}</label>
                            <TimezoneSelect
                                country={country}
                                handleTimezoneChange={handleTimezoneChange}
                                className={inputFieldStyle}
                                placeholder='-- select timezone --'
                                />

                        </div>
                    </div>
                </div>

                
                <div className={` flex items-center gap-3`}>
                    <input type="checkbox" required className='accent-ryd-primary hover:cursor-pointer' />
                    <label className={labelStyle}>
                        I agree to the <a href='/privacy.pdf' target='_blank' className='text-ryd-primary'>terms</a> and <a href='/privacy.pdf' target='_blank' className='text-ryd-primary'>conditions</a>
                    </label>
                </div>

                <Button
                    text={loading ? 'Processing...' : 'Continue'}
                    isInverted={false}
                    category='button'
                    btnStyle='w-full rounded-[16px] border-0 mt-6 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                />

                <p className="text-[14px] font-[400] leading-[26px] text-center mt-[.5rem]">
                    <span className="text-ryd-subTextPrimary">Already have an account? </span><Link to='/parent/sign-in' className="text-ryd-primary">Sign In</Link>
                </p>
            </form>
        </AuthLayout>
    )
}
