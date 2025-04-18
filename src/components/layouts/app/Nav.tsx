import React, { useEffect, useState } from 'react';
import notificationImg from '../../../assets/icons/notificationImg.svg';
import downArrowImg from '../../../assets/icons/downArrowImg.svg';
import upArrowImg from '../../../assets/icons/upArrowImg.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import userAvatar from '../../../assets/images/user-avatar.png';
import { logout } from '../../../redux/reducers/authSlice';
import { CustomModal, ProfileUpdate } from '../../ui';
import { toast } from 'react-toastify';
import cartImg from '../../../assets/icons/shoppingCart.svg';
import CartModal from '../../../pages/dashboard/home/CartModal';
import UserService from '../../../services/user.service';
import { setCart } from '../../../redux/reducers/userSlice';

export default function () {
    const userInfo: any = useSelector((state: RootState) => state?.auth?.userInfo);
    const cart: boolean = useSelector((state: RootState) => state?.user?.cart);
    const userService = new UserService();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ toggleDropdown, setToggleDropdown ] = useState(false);
    const [ showProfile, setShowProfile ] = useState(false);
    const [ toggleLogout, setToggleLogout ] = useState(false);
    const [ toggleCartModal, setToggleCartModal ] = useState(false);


    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        navigate('/parent/sign-in');
        toast.success('Logout successful!');
    }


    const containerHeaderStyle = `w-full fixed top-0 z-20 flex justify-end items-center border-b border-b-[#E6E8EB] bg-white h-[82px] mb-6`;

    return (
        <>
            <nav className={containerHeaderStyle}>
                <div className='flex items-center lg:gap-x-7 gap-x-3 lg:mr-[5rem] mr-[2rem]'>
                    {/* cart  */}
                    <div>
                        <div className='relative hover:cursor-pointer bg-ryd-primaryLess1/[.4] p-[12px] rounded-full' onClick={() => setToggleCartModal(true)}>
                            {cart  && 
                                <div 
                                className='absolute -top-1 right-0 bg-amber-400 border border-white rounded-[32px] p-[7px] text-[10px] text-white animate-pulse' 
                                title='new item in cart'></div> 
                            }
                            <img src={cartImg} alt="notification-img" className='h-[22px] w-[22px]' />
                        </div>
                    </div>
                    {/* profile info  */}
                    <div className='flex relative items-center gap-x-3'>
                        <img src={userAvatar} alt="user-avatar" className='h-[40px] w-[40px] rounded-full border-0 bg-gray-50 object-contain' />

                        <div className='hover:cursor-pointer lg:block hidden' onClick={() => setToggleDropdown(prevState => !prevState)}>
                            <h2 className='text-[14px] font-[400] leading-[26px] text-ryd-subTextSecondary1 capitalize'>{userInfo?.firstName} {userInfo?.lastName}</h2>
                            <p className='text-[11px] font-[400] font-[AvertaStd-Light] leading-[23px] text-ryd-subTextSecondary1'>{userInfo?.email}</p>
                        </div>

                        { !toggleDropdown ? 
                        <img 
                            src={downArrowImg} 
                            alt="dropdown-arrow" 
                            className='hover:cursor-pointer' 
                            onClick={() => setToggleDropdown(true)} 
                            /> :
                        <img 
                            src={upArrowImg} 
                            alt="dropdown-arrow-reverse" 
                            className='hover:cursor-pointer' 
                            onClick={() => setToggleDropdown(false)} 
                            />
                        }

                        {toggleDropdown &&
                            <div className="lg:w-fit w-[150px] absolute top-[4.11rem] py-1 lg:right-0 -right-7 grid bg-white text-[13px] shadow rounded-b">
                                <div 
                                    className='px-[1.3rem] py-2 hover:bg-gray-100 hover:cursor-pointer'
                                    onClick={() => setShowProfile(true)}>Profile Update</div>
                                <div 
                                    className='px-[1.3rem] py-2 hover:bg-gray-100 hover:cursor-pointer'
                                    onClick={() => setToggleLogout(true)}>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>

            { showProfile && 
            <CustomModal
                closeModal={() => {
                    setShowProfile(false);
                    setToggleDropdown(false);
                }}
                modalStyle='bg-white lg:w-[30%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[1rem] mt-[3rem]'
                >
                <ProfileUpdate 
                    closeModal={() => {
                        setShowProfile(false);
                        setToggleDropdown(false)
                    }} />
            </CustomModal>
            }

            { toggleLogout && 
                <CustomModal
                    closeModal={() => {
                        setToggleLogout(false);
                        setToggleDropdown(false)
                    }}
                    modalStyle='bg-white lg:w-[25%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[13rem] mt-[3rem] p-7'
                    >
                        <h1 className='text-[16px] font-[400] text-center leading-[26px] mb-[1.5rem]'>Do you wish to Logout?</h1>
                        <div className='flex justify-center gap-6'>
                            <button onClick={() => {
                                setToggleLogout(false);
                                setToggleDropdown(false);
                            }} className='rounded-[10px] bg-red-600 text-white border-0 py-2 px-6 text-[14px]'>
                                Cancel
                            </button>
                            <button 
                                onClick={handleLogout} 
                                className='rounded-[10px] bg-green-600 text-white border-0 py-2 text-[14px] px-10'>
                                    Yes
                                </button>
                        </div>
                </CustomModal>
            }

            {toggleCartModal && 
                <CustomModal
                modalStyle="relative bg-white lg:w-[35%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[7rem] mt-[3rem]"
                closeModal={() => {
                    setToggleCartModal(false);
                    // dispatch(setCart(false));
                }}
                >
                    <CartModal closeCart={() => setToggleCartModal(false)} />
                </CustomModal>
            }
        </>
    )
}
