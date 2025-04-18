import { useState } from "react";
import { AuthLayout } from "../../../components/layouts";
import { Button, CustomInput } from "../../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/reducers/authSlice";
import UserService from "../../../services/user.service";
import { MigrationPopup } from "../../../components/custom-hooks/migrationPopUp";

const initialValues = {
    email: '',
    password: ''
}

export default function SignIn() {
    const authService = new AuthService();
    const userService = new UserService();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState(initialValues);
    const [ loading, setLoading ] = useState(false);
    const [migration, setMigration] = useState(false);
    const [isMigrated, setIsMigrated] = useState(false);
    const [id, setId] = useState();

    const h1Style = `font-[400] text-[28px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mt-[5rem] mb-[1.5rem]`;
    const flexContainer = `w-full lg:flex grid gap-10 mb-[2rem]`;
    const gridContainer = `w-full grid gap-1`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;

    
    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await authService.signIn(formData);
            setLoading(false);
            if(!response.status){
                toast.error(response?.message);
                return;
            }
            toast.success(response?.message);
            dispatch(setUserInfo(response?.data));
            localStorage.setItem('ryd-parent-token', response?.data?.token);
            navigate('/parent/home');
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
            return
        }
    }

    return (
        <AuthLayout   
        >
            {migration && !isMigrated  && <MigrationPopup id ={id}/>}
            <form className='mt-[2.5rem] pb-[2rem]  lg:px-[1rem]' onSubmit={handleSubmit}>
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

                {/* password  */}
                 <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Password</label>
                        <CustomInput
                            type="password" 
                            placeholder='XXXXXXXXX'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                {/* forgot password  */}
                <Link 
                    to='/parent/forgot-psd' 
                    className="text-[14px] font-[400] font-[AvertaStd-Semibold] leading-[26px] flex justify-end -mt-5  text-ryd-primary">
                        Forgot password?
                </Link>

                <Button 
                    text={loading ? 'Processing...' : 'Sign In and Explore'}
                    isInverted={false}
                    category='button'
                    btnStyle='w-full rounded-[16px] border-0 mt-6 text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
                />

                <p className="text-[14px] font-[400] leading-[26px] text-center mt-6">
                    <span className="text-ryd-subTextPrimary">Haven't registered yet? </span><Link to='/parent/sign-up' className="text-ryd-primary">Sign Up</Link>
                </p>
            </form>
        </AuthLayout>
    )
}