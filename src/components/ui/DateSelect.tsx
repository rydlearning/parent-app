

interface Props {
    handleDateChange: (date: any) => void;
}


export default function DateSelect({ handleDateChange }: Props) {

    const inputFieldStyle = `w-full flex items-center bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[12px] outline-none active:outline-none`;

    return (
      <input 
        type="month" 
        className={inputFieldStyle} 
        onChange={handleDateChange}
        />
    );
}
