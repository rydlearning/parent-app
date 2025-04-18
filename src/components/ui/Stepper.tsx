import React from 'react'

type Props = {
    currentTab: number
}

const steps = [ 
    { name: '01', id: 1 },
    { name: '02', id: 2 },
    { name: '03', id: 3 }
]

export default function Stepper({ currentTab }: Props){
  const activeStyle = `bg-ryd-primary border-ryd-primaryLess1`;
  const stepStyle = `bg-[#8C97A2] border-ryd-gray`;

  return (
    <div className='lg:w-[45%] w-[80%] mx-auto flex items-center justify-between relative'>
        <div className='border absolute w-full -z-10'></div>
        {steps.map((item) => {
            const tabStatus = item.id <= currentTab ? activeStyle : stepStyle;
            return (
                <div key={item.id}  className={`w-[30.36px] h-[30.36px] flex items-center rounded-full ${item.id <= currentTab ? 'bg-ryd-primaryLess1' : 'bg-ryd-gray'}`}>
                    <div className={`w-[23.14px] h-[23.14px] mx-auto text-[AvertaStd-Semibold] font-[400] text-[9px] leading-[25px] text-center rounded-full text-white ${tabStatus}`}>{item.name}</div>
                </div>
            )
        })}
    </div>
  )
}