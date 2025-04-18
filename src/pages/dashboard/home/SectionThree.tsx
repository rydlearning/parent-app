import React, { useEffect, useState } from 'react';
import { homeTabs } from '../../../utils/constants';
import { CustomModal, CustomSearchInput } from '../../../components/ui';
import AccountSection from './AccountSection';
import ActivitySection from './ActivitySection';
import UserService from '../../../services/user.service';
import RecentlyAddedSection from './RecentlyAddedSection';
import closeIcon from '../../../assets/icons/closeIcon.svg';
import infoGif from '../../../assets/images/info.json';
import Lottie from 'lottie-react';
import Reports from './Reports';

interface Props {
    setRegTab: () => void
}

export default function SectionThree() {
    const userService = new UserService();

    const [activeTab, setActiveTab] = useState(0);
    const [imgSrc, setImgSrc] = useState('');
    const [data, setData] = useState<any>([]);
    const [activeChild, setActiveChild] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<any>('');
    const [isNewCohort, setIsNewCohort] = useState(false);
    const [kids, setKids] = useState<any>([])
    const [loading, setLoading] = useState(false);


    const getPackages = async () => {
        setLoading(true)
        try {
            const response = await userService.getChildren();
            setLoading(false);
            if (!response.status) {
                return
            }
            setData(response.data);
        } catch (err) {
            setLoading(false);
            return;
        }
    }

    const handleSetSearchValue = (e: any) => {
        setSearchValue(e.target.value);
        if (e.target.value === '') {
            getPackages();
        }
    }

    const handleSearch = () => {
        if (searchValue === '') {
            getPackages();
            return;
        } else {
            const filteredResult = data.filter((item: any) =>
                item?.firstName.toLowerCase().includes(searchValue) ||
                item?.lastName.toLowerCase().includes(searchValue) ||
                item?.programs[0].package.title.toLowerCase().includes(searchValue));

            setData(filteredResult);
        }
    }


    const checkCohortEligibility = (_arg: any) => {
        const exists = kids.some((child: any) => child.firstName.toLowerCase() === _arg.firstName.toLowerCase());
        if (!exists) {
            setKids([...kids, _arg]);
        }

        setTimeout(() => {
            setIsNewCohort(true);
        }, 3000);
    }



    useEffect(() => {
        if (data?.length > 0) {
            for (let i = 0; i < data?.length; i++) {
                if (data[i].allowNewCohort) {
                    checkCohortEligibility(data[i])
                }
            }
        }
    }, [data])


    useEffect(() => {
        getPackages();
    }, []);

    useEffect(() => {
        if (activeChild) {
            const activeChildActivity = data.filter((item: any) => item?.id === activeChild);
            setData(activeChildActivity);
        } else {
            getPackages();
        }

    }, [activeChild]);


    const sectionStyle = `w-full flex justify-between flex-wrap  mt-[2.5rem] gap-y-3`;

    return (
        <section className='w-full grid pb-[70px]'>
            <section className={sectionStyle}>
                {/* tabs  */}
                <div className='flex lg:order-1 order-2 items-between bg-ryd-gray rounded-[16px] lg:mt-0 mt-3'>
                    {homeTabs.map((tab) => {
                        let img = activeTab === tab.id ? require(`../../../assets/icons/on.${tab.icon}`) : require(`../../../assets/icons/${tab.icon}`);
                        return (
                            <div
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setActiveChild(null)
                                }}
                                className={`flex items-center gap-x-2 px-5 py-3 text-[14px] rounded-[16px] hover:cursor-pointer  ${activeTab === tab.id ? 'bg-ryd-primary text-white' : 'text-[#b4b4b48f]'}`}
                            // onMouseOver={() => setImgSrc(tab.name)}
                            // onMouseOut={() => setImgSrc(tab.name)}
                            >
                                <img src={img} alt="tab icon" />
                                <p>{tab.name}</p>
                            </div>
                        )
                    })}
                </div>
                {/* filter  */}
                <div className='lg:w-[350px] lg:order-2 order-1 w-full'>
                    <CustomSearchInput
                        handleSearch={handleSearch}
                        setSearchValue={handleSetSearchValue}
                        placeholder='Search by name or program...'
                    />
                </div>
            </section>
            <section className='mt-[3.2rem]'>
                {activeTab === 0 &&
                    <AccountSection
                        setTab={(data: number) => {
                            setActiveTab(1)
                            setActiveChild(data);
                        }}
                        data={data}
                        loading={loading}
                    />
                }
                {activeTab === 1 &&
                    <ActivitySection
                        data={data}
                        loading={loading}
                    />
                }
                {activeTab === 2 &&
                    // <div className='lg:w-full w-[300px] overflow-hidden'>
                    <RecentlyAddedSection />
                    // </div>
                }
                {activeTab === 3 &&
                    // <div className='lg:w-full w-[300px] overflow-hidden'>
                    <Reports />
                    // </div>
                }

                {isNewCohort &&
                    <CustomModal
                        modalStyle="relative bg-white lg:w-[30%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[15rem] mt-[3rem]"
                        closeModal={() => setIsNewCohort(false)}>
                        <div className='p-[2rem] w-fit mx-auto text-center'>
                            <img src={closeIcon} alt="close" className='float-right relative -top-4 -right-3 hover:cursor-pointer' onClick={() => setIsNewCohort(false)} />

                            <div className='lg:h-[70px] h-[50px] lg:w-[70px] w-[50px] mx-auto'>
                                <Lottie animationData={infoGif} />
                            </div>
                            <div className='mt-7 text-center text-[20px] flex gap-x-1 font-[500]'>
                                {kids.map((kid: any, index: number) => (
                                    <p key={index} className='capitalize'>
                                        {kid.firstName}{index !== kids.length - 1 ? "," : ""}
                                    </p>
                                ))}
                                {kids.length > 1 ? "are" : "is"} due for a New Cohort
                            </div>
                        </div>
                    </CustomModal>
                }
            </section>
        </section>
    )
}
