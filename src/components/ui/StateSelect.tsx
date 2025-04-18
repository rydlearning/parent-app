import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";


interface Props {
  country: any,
  handleStateChange: (data: any) => void,
  className: any,
  placeholder?: string
}


export default function StateSelectInput({ country, placeholder, handleStateChange, className }: Props) {
  const [ stateList, setStateList ] = useState([]);
  const [ selectedState, setSelectedState ] = useState<any>({});
  const [ toggle, setToggle ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ untouchedStateArr, setUntouchedStateArr ] = useState([]);
  const [ _placeholder, setPlaceholder ] = useState<any>("- select state -");

  const stateSelectRef = useRef(null);

  const boxStyle = `relative`;

  const closeModal = () => {
    setToggle(false);
    setSearchQuery('');
    setStateList(country?.states)
  }

  useOnClickOutside(stateSelectRef, closeModal);

  const handleStateSearch = (e: any) => {
    const text = e.target.value;
    setSearchQuery(text.toLowerCase());
  }

  useEffect(() => {
    setStateList(country?.states);
    setSelectedState(country?.states[0]);
    setUntouchedStateArr(country?.states);
  }, [country]);




  useEffect(() => {
    const allStates = stateList;
    if(searchQuery === ''){
      setStateList(untouchedStateArr);
    }else{
      const filteredStates = allStates.filter((item: any) => item?.name?.toLowerCase().includes(searchQuery));
      setStateList(filteredStates);
    }
  }, [searchQuery]);
  

  return (
    <div className={`${boxStyle}`} ref={stateSelectRef}>
      <div
        className={`${className} hover:cursor-pointer`}
        onClick={() => setToggle(prevState => !prevState)}
      >
        { _placeholder || selectedState?.name || 'No available state'}
      </div>
      {toggle &&
        <div className="h-[30vh] overflow-y-auto absolute z-10 top-3 w-full shadow bg-white text-ryd-subTextPrimary text-[14px]">
          <input 
            type="search" 
            onChange={handleStateSearch} 
            className="w-full h-[35px] outline-gray-50 px-[20px]" 
            placeholder="Search State..." 
            />
          
          {stateList.length > 0 ? 
            stateList.map((item: any, index: number) => (
              <div key={index} 
                className="hover:bg-ryd-gray px-4 py-1 hover:cursor-pointer" 
                onClick={() => {
                  setSelectedState(item);
                  setToggle(false)
                  handleStateChange(item);
                  setPlaceholder(null)
                  }}>
                {item?.name}
              </div>
            )) :
            <p className="text-center mt-[15%]">No available state</p>
          }
        </div>
      }
    </div>
  )
}