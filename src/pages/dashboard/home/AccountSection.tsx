
import { Empty, StudentCard } from '../../../components/ui';

interface Props {
    data: any[] | [],
    setTab: (data: number) => void,
    loading?: boolean,
}

export default function AccountSection({ data, setTab, loading }: Props) {

    return (
        <div className={`grid gap-[3rem] relative ${data?.length === 0 && !loading && 'border border-gray-100 rounded-[16px] pb-[6rem]'}`}>
            { loading ? <div className='h-[100px] w-[100px] left-[50%] top-[20%] rounded-full absolute border border-ryd-primary border-l-white animate-spin'></div> :
            <>
                { data?.length === 0 &&
                    (
                    <div className='mt-[3rem]'>
                        <Empty text={<>No Child profile has been created, <br /> click 'Add Child +' to get started.</>} />
                    </div>
                    )
                }
                { data?.length > 0 &&
                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-x-[5rem] gap-y-10'>
                        {data.map((item, index) => {
                            return (
                                <StudentCard
                                    key={index}
                                    item={item}
                                    setTab={setTab}
                                />
                            )}
                        )}
                    </div>
                }
            </>
            }
        </div>
    )
}
