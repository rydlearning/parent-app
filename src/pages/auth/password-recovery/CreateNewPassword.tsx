import React, { useState } from 'react';
import { AuthLayout } from '../../../components/layouts';
import { Button, CustomInput } from '../../../components/ui';

const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: ''
}

export default function CreateNewPassword() {
    const [ formData, setFormData ] = useState(initialValues);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
  
    const h1Style = `font-[400] text-[28px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mt-[5rem] mb-[1.5rem]`;
    const flexContainer = `w-full lg:flex grid gap-10 mb-[2rem]`;
    const gridContainer = `w-full grid gap-2`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[15px] leading-[26px]`;

    const handleSubmit = () => {}

    return (
        <AuthLayout
        >
            <form className='mt-[3rem]' onSubmit={handleSubmit}>
                {/* password  */}
                <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Old Password</label>
                        <CustomInput
                            type="password" 
                            placeholder='XXXXXXXXX'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, oldPassword: e.target.value })}
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
                            onChange={(e: any) => setFormData({...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                {/* confirm password  */}
                <div className='mb-[2rem]'>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Confirm Password</label>
                        <CustomInput
                            type="password" 
                            placeholder='XXXXXXXXX'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, confirmPassword: e.target.value })}
                        />
                    </div>
                    <small className='text-red-600'>{error && 'Passwords must match!'}</small>
                </div>

                <Button 
                    text={loading ? 'Processing...' : 'Continue'}
                    isInverted={false}
                    category='button'
                    btnStyle='w-full rounded-[1000px] border-0 mt-6 text-[18px] leading-[26px] font-[400] text-white px-[26px] py-[15px]'
                />
            </form>
        </AuthLayout>
    )
}
