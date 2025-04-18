import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";


const  countriesArr = require('../../utils/countries.json');

interface Props {
  country: any, 
  handleTimezoneChange: (data: any) => void, 
  className: string,
  placeholder?: string
}

export default function TimezoneSelect({ country, handleTimezoneChange, className, placeholder }: Props) {
  const [ zoneList, setZoneList ] = useState([]);
  const [ selectedZone, setSelectedZone ] = useState<any>({});
  const [ toggle, setToggle ] = useState(false);
  const [ _placeholder, setPlaceholder ] = useState<any>("- select timezone -");

  const timezoneSelectRef = useRef(null)

  const boxStyle = `relative`;

  const closeModal = () => {
    setToggle(false);
    setZoneList(country?.timezones);
  }

  useOnClickOutside(timezoneSelectRef, closeModal);

  useEffect(() => {
    setZoneList(country?.timezones);
  }, [country]);


  return (
    <div className={`${boxStyle} z-0`} ref={timezoneSelectRef}>
      <div
        className={`${className} hover:cursor-pointer`}
        onClick={() => setToggle(prevState => !prevState)}
      >
        {_placeholder || selectedZone?.zoneName}
      </div>
      {toggle &&
        <div className={`${zoneList.length > 3 ? 'h-[20vh] overflow-y-auto': 'h-fit'}  absolute top-3 w-full shadow bg-white text-ryd-subTextPrimary text-[14px]`}>
          <div className="text-center px-4 py-1 bg-ryd-gray">- select timezone -</div>
          {zoneList?.length > 0 ? 
            zoneList.map((item: any, index) => (
              <div key={index} 
                className="hover:bg-ryd-gray px-4 py-1 hover:cursor-pointer" 
                onClick={() => {
                  setSelectedZone(item);
                  setToggle(false)
                  handleTimezoneChange(item);
                  setPlaceholder(null)
                  }}>
                {item?.zoneName}
              </div>
            )) :
            <p className="text-center mt-[15%]">No available state</p>
          }
        </div>
      }
    </div>
  )
}