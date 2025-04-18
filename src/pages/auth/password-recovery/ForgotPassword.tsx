import React, { useState } from 'react'
import { AuthLayout } from '../../../components/layouts'
import { Button, CustomInput } from '../../../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import { toast } from 'react-toastify';

type Props = {};

const initialValues = {
    email: ''
}

export default function ForgotPassword(props : Props){
    const authService = new AuthService();
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState(initialValues);
    const [ loading, setLoading ] = useState(false);
  
    const flexContainer = `w-full lg:flex grid gap-10 mb-[2rem]`;
    const gridContainer = `w-full grid gap-1`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await authService.forgotPassword(formData);
            setLoading(false);
            if(!response.status){
                toast.error(response?.message);
                return;
            }
            toast.success(`${response?.message}: a new password has been sent to your email.`);
            navigate('/parent/sign-in');
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
            return;
        }
    }

    return (
        <AuthLayout
        >

            <form className='mt-[3rem] px-[1.6rem]' onSubmit={handleSubmit}>
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

                <Button 
                    text={loading ? 'Processing...' : 'Reset Password'}
                    isInverted={false}
                    category='button'
                    btnStyle='w-full rounded-[16px] border-0 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                />

                <p className="text-[14px] font-[400] leading-[26px] text-center mt-[2rem]">
                    <span className="text-ryd-subTextPrimary">Remembered your password? </span><Link to='/parent/sign-in' className="text-ryd-primary">Log in now!</Link>
                </p>
            </form>
        </AuthLayout>
    )
}