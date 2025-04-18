import React, { useEffect, useState } from 'react';
import deleteImg from '../../../assets/icons/delete.svg';
import { Button, Empty } from '../../../components/ui';
import UserService from '../../../services/user.service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../../redux/reducers/userSlice';
import { RootState } from '../../../redux/rootReducer';
import { formatCurrency } from '../../../components/custom-hooks';
import { useNavigate } from 'react-router-dom';

interface Props {
    closeCart: () => void,
}

export default function CartModal({ closeCart }: Props) {
    const currencyInfo =  useSelector((state: RootState) => state.user.currency);
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo)
    const userService = new UserService();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(false);
    const [ cartArr, setCartArr ] = useState([]);
    const [ totalAmount, setTotalAmount ] = useState(0);
    const [ deleteLoading, setDeleteLoading ] = useState(false);
    const [ deleteId, setDeleteId ] = useState<number| null>(null);
    const  [ currency, setCurrency ] = useState<any>(null);
    const  [ couponCode, setCouponCode ] = useState<any>("");

    useEffect(() => {
        if(currencyInfo && currencyInfo?.useRate){
            setCurrency(currencyInfo);
        }
    }, [currencyInfo]);

    useEffect(() => {
        getCart();
    }, [])


    const getCart = async() => {
        setLoading(true);
        try{
            const response = await userService.getCart();
            setLoading(false);
            if(!response.status){
                // toast.error(response.message);
                return;
            }
            setCartArr(response.data);
            if(response.data === 0){
                dispatch(setCart(false));
            }else{
                dispatch(setCart(true));
            }

            // calculate total of all courses
            let total = 0;
            for(let i = 0; i<response.data.length; i++){
                if(userInfo.country.toLowerCase() === 'nigeria'){
                    total = total + response.data[i]?.programs[0]?.package?.altAmount;
                }else{
                    total = total + response.data[i]?.programs[0]?.package?.amount;
                }
            }
            setTotalAmount(total);

        }catch(err: any){
            setLoading(false);
            // toast.error(err.message);
            return;
        }
    }

    const handleItemDelete = async(id: number) => {
        setDeleteId(id)
        setDeleteLoading(true);
        try{
            const response = await userService.deleteProgram(id);
            setDeleteLoading(false);
            if(!response.status){
                toast.error(response.message);
                return;
            }
            toast.success(response.message);
            closeCart();
        }catch(err: any){
            setDeleteLoading(false);
            toast.error(err?.mesage);
            return;
        }
    }

    const handleCheckout = () => {
        if(couponCode.length>0){
            window.open(`https://api-pro.rydlearning.com/common/payment-init/${userInfo.id}/${couponCode}`, '_blank')
        }else{
            window.open(`https://api-pro.rydlearning.com/common/payment-init/${userInfo.id}`, '_blank')
        }
        dispatch(setCart(false));
        closeCart();
    }

    const formStyle = `h-fit overflow-y-auto px-5 pb-[2rem] pt-[2rem]`;
    const h1Style = `font-[400] text-[25px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mb-[1rem]`;
    const flexContainer = `w-full grid grid-cols-6 items-center hover:bg-gray-100/[.8] py-2 px-5 rounded-[16px]`;
    const pStyle = `text-[16px] font-[400] capitalize`;
    const pSubStyle = `text-[13px] font-[400] text-ryd-primary capitalize`;

    return (
        <div className={formStyle} >
            {/* <img src={closeIcon} alt="close" className='float-right relative -top-4 -right-3 hover:cursor-pointer' onClick={closeRegModal} /> */}
            <h1 className={h1Style}>Cart</h1>
            {loading ? 
                <div className='h-[100px] w-[100px] mx-auto rounded-full mt-5 border border-ryd-primary border-l-white animate-spin'></div> :
                <>
                    { cartArr.length > 0 ?
                        <div>
                            {cartArr.map((item: any) => (
                                <div key={item.id} className={flexContainer}>
                                    <div className='col-span-3'>
                                        <p className={pStyle}> {`${item?.firstName} ${item?.lastName}`}</p>
                                        <p className={pSubStyle}>{item?.programs[0]?.package?.title}</p>
                                    </div>
                                    <div className='col-span-2 text-center'>
                                        <p>
                                            8 Weeks Program
                                        </p>
                                        {/*<p className={pStyle}>*/}
                                        {/*    <span className='text-[12px]'>{currency ? currency?.currencyCode : 'USD'} </span>*/}
                                        {/*    {(currency && userInfo.country.toLowerCase() === 'nigeria') ? formatCurrency(item?.programs[0]?.package?.altAmount) :*/}
                                        {/*    (currency && userInfo.country.toLowerCase() !== 'nigeria') ? formatCurrency(item?.programs[0]?.package?.amount * currency?.rate) :*/}
                                        {/*        formatCurrency(item?.programs[0]?.package?.amount)*/}
                                        {/*    }*/}
                                        {/*</p>*/}
                                    </div>
                                    <div className='col-span-1 flex justify-end'>
                                        <img
                                            src={deleteImg}
                                            alt="delete"
                                            title='delete item: this action is irreversible.'
                                            className={`hover:cursor-pointer ${(deleteLoading && deleteId === item?.programs[0]?.id) && 'animate-spin'}`}
                                            onClick={() => handleItemDelete(item?.programs[0]?.id)}
                                            />
                                    </div>
                                </div>
                            ))}
            
                            <div className='flex justify-end mt-5 px-5 gap-x-3 font-[AvertaStd-Semibold]'>
                                <p className={`${pStyle}`}><span>&#128073;</span></p>
                                <p>
                                <input placeholder={'Enter Promo Code'} style={{borderWidth: 0}} value={couponCode} onChange={e=>setCouponCode(e.target.value)}/>
                                </p>
                                {/*<p>*/}
                                {/*    <span className='text-[12px]'>{ currency ? currency?.currencyCode : 'USD' } </span>*/}
                                {/*    {(currency && userInfo.country.toLowerCase() === 'nigeria') ? formatCurrency(totalAmount) :*/}
                                {/*    (currency && userInfo.country.toLowerCase() !== 'nigeria') ? formatCurrency(totalAmount * currency?.rate) :*/}
                                {/*    formatCurrency(totalAmount)}*/}
                                {/*</p>*/}
                            </div>
            
                                <Button
                                    isInverted={false}
                                    category='button'
                                    text='Proceed to checkout'
                                    handleClick={handleCheckout}
                                    btnStyle='w-full flex justify-center rounded-[16px] text-white text-center bg-ryd-primary py-4 mt-6'
                                />
                        </div> :
                        <Empty text="No items in cart" />
                    }
                </>
            }
        </div>
    )
}
