import React from "react";
import Nav from "./Nav";

interface Props {
    children: React.ReactNode
}

export default function AppLayout({ children }: Props){
    const containerStyle = `w-full`;

    return (
         <div className={containerStyle}>
            <Nav />
            <div className="lg:px-[300px] md:px-[50px] px-[10px] mt-[7rem] h-[100vh] oveflow-y-auto">{children}</div>
         </div>
    )
}