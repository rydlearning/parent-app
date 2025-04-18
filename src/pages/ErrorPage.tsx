import errorImg from '../assets/icons/errorImg.svg';
import { useNavigate } from 'react-router-dom';

type Props = {}

const ErrorPage = (props: Props) => {
  const navigate = useNavigate();

  const h1Style = 'font-[AvertaStd-Semibold] font-[500] lg:text-[181.57px] text-[100px] lg:leading-[254.2px] leading-[140px] text-center text-ryd-primary';
  const btnStyle = 'bg-none border-0 w-fit mx-auto text-ryd-primary text-[18px] leading-[26px] font-[400] hover:cursor-pointer';

  return (
    <div className='grid w-fit mx-auto mt-[9rem]'>
        <img src={errorImg} alt="error 404" className='w-fit mx-auto' />
        <h1 className={`${h1Style}`}>404</h1>
        <button className={`${btnStyle}`} onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default ErrorPage;