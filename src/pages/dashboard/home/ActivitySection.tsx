import React, {useEffect} from 'react';
import { ActivityCard, Empty } from '../../../components/ui';

interface Props {
    data: any[] | [],
    loading: boolean
}


export default function ActivitySection({ data, loading }: Props) {

    useEffect(()=>{
        //console.log(data)
    }, [])

    return (
        <div className={`grid gap-[3rem] relative ${data?.length === 0 && !loading && 'border border-gray-100 rounded-[16px] pb-[6rem]'}`}>
            {loading ? <div className='h-[100px] w-[100px] rounded-full absolute left-[50%] top-[20%] border border-ryd-primary border-l-white animate-spin'></div> :
            <>
                { data?.length === 0 &&
                    <div className='mt-[3rem]' key={"key-100"}>
                        <Empty text={<>You have no activity yet, <br /> click 'Add Child +' to get started.</>} />
                    </div>
                }
                { data?.length > 0 &&
                    <div className='grid gap-5'>
                        {data?.map((item, index) => (
                            <>
                            {item?.programs?.filter((f: any)=>!f.isCompleted && f.isPaid).map((activity: any, index: number) => (
                                <ActivityCard
                                    key={index}
                                    childName={item?.firstName}
                                    imageUrl={activity?.package?.imageUrl}
                                    title={activity?.package?.title}
                                    level={activity?.package?.level}
                                    amount={activity?.package?.amount}
                                    altAmount={activity?.package?.altAmount}
                                    description={activity?.package?.description}
                                    minAge={activity?.package?.minAge}
                                    maxAge={activity?.package?.maxAge}
                                    week={activity?.package?.weekDuration}
                                    createdAt={activity?.package?.createdAt}
                                    mediaUrl={activity?.mediaUrl}
                                    teacher={activity?.teacher?.firstName + ' ' + activity?.teacher?.lastName}
                                    attendance={activity.attendance}
                                    classUrl={activity?.teacher?.classLink}
                                    oldClassLink={activity?.teacher?.classLink}
                                    docUrl={activity?.teacher?.docUrl}
                                    isActive={!activity?.isCompleted}
                                    cohort={activity?.cohort}
                                />
                            ))}
                            </>
                        ))}
                    </div>
                }
            </>
            }
        </div>
    )
}
