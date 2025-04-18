import { ReactNode } from "react";
import authImg from '../../../assets/images/authImg.svg';
import logo from '../../../assets/images/ryd-logo.png';

interface Props {
    children: ReactNode
}



export default function AuthLayout({ children }: Props) {
    const containerStyle = `lg:w-[35%] w-fit w-full m-auto lg:absolute top-0 right-0 left-0 bottom-0 h-fit lg:border border-gray-100 lg:shadow rounded-[7px] py-[2rem]`
    const bodyContainerStyle = `px-[1.5rem]`;

    return (
        <div className="h-[100vh] relative">
            <div className={`${containerStyle} scrollbar`}>
                <img src={logo} alt="ryd-logo" className="h-[35px] w-fit mx-auto mb-4" />
                <div className={`${bodyContainerStyle}`}>{children}</div>
            </div>
        </div>
    )
}
