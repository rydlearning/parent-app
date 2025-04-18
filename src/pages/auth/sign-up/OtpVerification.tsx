import React, { Dispatch, SetStateAction, useState } from 'react'
import { AuthLayout } from '../../../components/layouts'
import { OtpVerification, Stepper } from '../../../components/ui';
import { toast } from 'react-toastify';
import { AuthProps } from './PersonalInfo';
import AuthService from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux/reducers/authSlice';

interface Props {
    setSubmitForm: Dispatch<SetStateAction<boolean>>,
    formData: any
}

export default function OtpVerificationForm({ setSubmitForm, formData }: Props){
    const authService = new AuthService();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);


    const obj: any = localStorage.getItem('email-confirmation');
    const tdx = JSON.parse(obj);


    const handleVerification = async(data: number | string) => {
        const newOtp = tdx?.data?.otp + '1';
        if(data === newOtp){
            registerParent();
        }else{
            toast.error('Invalid OTP!');
            return;
        }
    }

    const handleOtpResend = async() => {
        setOtpLoading(true);
        try{
            const response = await authService.verifyEmail({ email: formData.email });
            setOtpLoading(false)
            if(!response.status){
                toast.error(response?.message);
                return
            }
            toast.success(response?.message);
            const obj = JSON.stringify(response)
            localStorage.setItem('email-confirmation', obj);
        }catch(err: any){
            setOtpLoading(false)
            toast.error(err?.message);
        }
    }

    const registerParent = async() => {
        setLoading(true);
        try {
            const response  = await authService.signUp(formData);
            setLoading(false);
            if(!response.status){
                toast.error(response?.message);
                return
            }
            navigate('/success');
            localStorage.setItem('ryd-parent-token', response?.data?.token);
            dispatch(setUserInfo(response.data));
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
            return
        }
    }

    return (
        <AuthLayout
        >
            <Stepper currentTab={3} />

            {tdx && <p className='mt-3 text-[14px] text-center text-green-500'>{tdx?.message}</p>}

            <div className='lg:px-[2rem] mx-auto mt-[2rem]'>
                <OtpVerification btnText={loading ? "Processing..." : "Verify OTP"} handleVerification={handleVerification} />
            </div>

            <p className='text-center text-[13px] mt-4'>Didn't recieve code? <span className='text-ryd-primary hover:cursor-pointer' onClick={handleOtpResend}>{otpLoading ? 'Initiating resend...' : 'Resend'}</span></p>
        </AuthLayout>
    )
}