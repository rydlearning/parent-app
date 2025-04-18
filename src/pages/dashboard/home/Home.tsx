import { useEffect, useState } from 'react';
import { AppLayout } from '../../../components/layouts';
import { CustomModal } from '../../../components/ui';
import NewRegModal from './NewRegModal';
import SectionOne from './SectionOne';
import SectionThree from './SectionThree';
import RegSubModal from './RegSubModal';
import successGif from '../../../assets/images/success.json';
import Lottie from 'lottie-react';
import UserService from '../../../services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, setRenewal, setCart, setResume } from '../../../redux/reducers/userSlice';
import { RootState } from '../../../redux/rootReducer';
import SurveySection from './SurveySection';
import closeIcon from "../../../assets/icons/closeIcon.svg";
import RegRenewalModal from './RegRenewalModal';
import RegResumptionModal from './RegResumptionModal';
import { Testimonial } from '../../../components/ui/Testimonial';


export default function Home() {
    const { child, resumeChildReg } = useSelector((state: RootState) => state.user)
    const userService = new UserService();
    const dispatch = useDispatch();

    const [ toggleRegModal, setToggleRegModal ] = useState(false);
    const [ regTab, setRegTab ] = useState(0);
    const [ childInfo, setChildInfo ] = useState<any>({});
    const [ successModal, setSuccessModal ] = useState(false);
    const [ programArr, setProgramArr ] = useState<any>(null);
    const [ isRenewing, setIsRenewing ] = useState<any>(false);
    const [ survey, setSurvey ] = useState<any>([]);
    const [ isClosable, setIsClosable ] = useState(false);


    const getSurvey = async() => {
        try{
            const response =  await userService.getSurvey();
            if(!response.status){
                return;
            }
            setSurvey(response.data)
        }catch(err){
            return;
        }
    }

    const getCart = async() => {
        try{
            const response = await userService.getCart();
            if(!response.status){
                return;
            }
            if(response.data > 0){
                setCart(true);
                dispatch(setCart(true))
            }
        }catch(err){
            return
        }
    }

    const getCurrency = async() => {
        try{
            const response = await userService.getCurrency();
            if(!response.status){
                // toast.error(response.message);
                return;
            }
            dispatch(setCurrency(response.data));
        }catch(err){
            return;
        }
    }

    const getPackages = async() => {
        try{
            const response = await userService.getAllPackages();
            if(!response.status){
                return;
            }
            // filter programs based on student age; compare child age to viable age range
            const programFilter = response.data.find((item: any) => (item?.minAge <= child?.child?.age) && (item?.maxAge >= child?.child?.age) && (item?.level === 1))
            //const programFilter = response.data.find((item: any) => (item?.minAge <= child?.child?.age) && (item?.maxAge >= child?.child?.age) && (item?.level === 1))
            setProgramArr(programFilter);
        }catch(err: any){
            return;
        }
        return false;
    };

    const closeRegToggleModal = () => {
        if(isClosable){
            setRegTab(0);
            setToggleRegModal(false);
            dispatch(setRenewal(null));
            dispatch(setResume(null))
        }else{
            return;
        }
    }

    const closeRegTabByBtnClick = () => {
        setRegTab(0);
        setToggleRegModal(false);
        dispatch(setRenewal(null));
        setIsClosable(true)
    }

    const handleNext = () => {
        setRegTab(prevState => prevState + 1);
    }
    const handlePrevious = () => {
        setRegTab(prevState => prevState - 1);
    }


    useEffect(() => {
        getCart();
        getCurrency();
        getSurvey();
    }, [])

    useEffect(() => {
        if(resumeChildReg){
            setRegTab(0.7);
            setToggleRegModal(true);
            setIsRenewing(false)
            setChildInfo(resumeChildReg)
            getPackages();
        }else{
            setRegTab(0);
            setToggleRegModal(false);
        }
    }, [resumeChildReg]);


    useEffect(() => {
        if(child){
            setRegTab(0.5);
            setToggleRegModal(true);
            setIsRenewing(true)
            setChildInfo(child)
            getPackages();
        }else{
            setRegTab(0);
            setToggleRegModal(false);
        }
    }, [child])


    const pStyle = 'lg:text-[18px] text-[14px] leading-[26px] font-[400] text-center font-[AvertaStd-Light]';
    const h1Style = 'text-center lg:leading-[48.8px] leading-[33px] lg:text-[35px] text-[26px] font-[400] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';

    return (
        <AppLayout>
            {survey.length > 0 && <SurveySection surveys={survey} />}
            <Testimonial />
            <SectionOne
                toggleRegModal={() => setToggleRegModal(true)}
            />
            <SectionThree  />


            {toggleRegModal &&
             <CustomModal
             modalStyle={`relative bg-white ${regTab === 0 ? 'lg:w-[35%] lg:mt-[1rem] mt-[3rem]' : 'lg:w-[30%] lg:mt-[5rem] mt-[3rem]'} md:w-[70%] w-[95%] mx-auto rounded-[16px] `}
             closeModal={closeRegToggleModal}
             >
                {regTab === 0 &&
                    <NewRegModal
                        setChildInfo={(data: any) => {
                            setChildInfo(data);
                        }}
                        handleNext={handleNext}
                        closeModalOnOutsideClick={(data: boolean) => setIsClosable(data)}
                        closeRegModal={closeRegTabByBtnClick}
                    />
                }
                {regTab === 0.5 &&
                    <RegRenewalModal
                        setChildInfo={(_arg1: number, _arg2: number, _cohortId: number) => {
                            setChildInfo({...childInfo, programs:[{ ...childInfo.programs[0],  day: _arg1, time: _arg2, cohortId: _cohortId }] });
                        }}
                        handleNext={() => setRegTab(1)}
                        closeModalOnOutsideClick={(data: boolean) => setIsClosable(data)}
                        closeRegTab={() => {
                            setRegTab(0)
                            setToggleRegModal(false);
                            dispatch(setRenewal(null))
                        }}
                    />
                }
                {regTab === 0.7 &&
                    <RegResumptionModal
                        setChildInfo={(_arg1: any, _arg2: any, _cohortId: number) => {
                            setChildInfo({...childInfo, programs:[{ ...childInfo.programs[0],  day: _arg1, time: _arg2, cohortId: _cohortId }]  });
                        }}
                        handleNext={() => setRegTab(1)}
                        closeModalOnOutsideClick={(data: boolean) => setIsClosable(data)}
                        closeRegTab={() => {
                            setRegTab(0)
                            setToggleRegModal(false);
                            dispatch(setResume(null))
                        }}
                    />
                }
                { regTab === 1 &&
                    <RegSubModal
                        childInfo={childInfo}
                        handlePrevious={handlePrevious}
                        isRenewing={isRenewing}
                        closeRegTab={() => {
                            setRegTab(0)
                            setToggleRegModal(false);
                            setCart(true);
                            dispatch(setRenewal(null))
                        }}
                        setSuccessModal={() => setSuccessModal(true)}
                    />
                }
            </CustomModal>
            }

            {successModal &&
                <CustomModal
                modalStyle="relative bg-white lg:w-[35%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[7rem] mt-[3rem]"
                closeModal={() => setSuccessModal(false)}
                >
                    <div className='p-[2rem]'>
                        <img src={closeIcon} alt="close" className='float-right relative -top-4 -right-3 hover:cursor-pointer' onClick={() => setSuccessModal(false)} />

                        <div className='lg:h-[180px] h-[100px] lg:w-[180px] w-[100px] mx-auto'>
                            <Lottie animationData={successGif} />
                        </div>
                        <h1 className={h1Style}>Successful!</h1>
                        <p className={pStyle}>
                            Go to cart to initiate payment and complete the registration process <br /> or<br /> Click on 'Add +' button to enroll another child !
                        </p>
                    </div>
                </CustomModal>
            }
        </AppLayout>
    )
}
