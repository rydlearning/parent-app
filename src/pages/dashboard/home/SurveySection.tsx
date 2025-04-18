import React, { useEffect, useState } from 'react'
import UserService from '../../../services/user.service';
import { toast } from 'react-toastify';

interface SurveyProps {
    id: number | string,
    body: string,
    createdAt: string | Date,
    nText: string,
    pText: string,
    responses: any[],
    status: boolean,
    title: string,
    updatedAt: string | Date
}

interface Props {
    surveys: SurveyProps[]
}

const surveyContainerStyle = '-mt-[1rem] w-full rounded-[7px] px-3 py-1.5 bg-[#080806] grid lg:grid-cols-8 grid-cols-1';
const surveyTitleBodyContainer = 'lg:col-span-6 col-span-1';
const surveyTitleStyle = `text-[#C0C0C0] text-[10px] tracking-wide`;
const surveyBodyStyle = `text-[13px] text-[#ebebeb] py-[3px]`;
const surveyBtnsContainer = `w-full lg:col-span-2 col-span-1 flex justify-center items-center gap-2 text-white`; 

export default function SurveySection({ surveys }: Props) {
    const userService = new UserService();

    const [ initialSurveyArr, setInitialSurveyArr ] = useState<SurveyProps[]>([]);
    const [ arrIndex, setArrIndex ] = useState(0);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if(surveys.length > 0){
            setInitialSurveyArr(surveys)
        }
    }, [surveys]);

    const handleSubmit = async(id: number | string, answer: boolean) => {
        setLoading(true);
        try{
            const payload = { response: answer }
            const response = await userService.answerSurvey(id, payload);
            setLoading(false)
            if(!response.status){
                toast.error(response.message);
                return;
            };
            setArrIndex((prevState) => prevState + 1);
        }catch(err){
            setLoading(false);
            return
        }
    }


    return (
        <>
        {(arrIndex < initialSurveyArr.length) && (
            <div className={surveyContainerStyle}>
                <div className={surveyTitleBodyContainer}>
                    <p className={surveyTitleStyle}>{surveys[0].title}</p>
                    <p className={surveyBodyStyle}>{surveys[0].body}</p>
                </div>
                <div className={surveyBtnsContainer}>
                    {loading ?
                        <div className='border border-l-black animate-spin flex items-center justify-end border-white rounded-full h-[20px] w-[20px] bg-transparent'></div> :
                        <div className={surveyBtnsContainer}>
                            <button className='text-[10px] font-[600] bg-ryd-primary w-full h-fit py-1.5 rounded' onClick={() => handleSubmit(surveys[0].id, true)}>{surveys[0].pText}</button>
                            <button className='text-[10px] font-[800] bg-ryd-primaryLess1 text-ryd-primary  w-full h-fit py-1.5 rounded' onClick={() => handleSubmit(surveys[0].id, false)}>{surveys[0].nText}</button>
                        </div>
                    }
                </div>
            </div>
        )}
        </>
    )
}
