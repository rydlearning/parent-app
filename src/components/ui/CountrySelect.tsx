import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";
  

const  countriesArr = require('../../utils/countries.json');

interface Props {
  handleCountryChange: (data: any) => void,
  placeholder?: string,
  className: string,
}

export default function CountrySelectInput({ placeholder, handleCountryChange, className }: Props) {
  const [ countries, setCountries ] = useState([]);
  const [ selectedCountry, setSelectedCountry ] = useState<any>({});
  const [ toggle, setToggle ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ _placeholder, setPlaceholder ] = useState<any>("- select country -");

  const countrySelectRef = useRef(null);

  const boxStyle = 'relative';

  const closeModal = () => {
    setToggle(false);
    setSearchQuery('');
    setCountries(countriesArr)
  }

  useOnClickOutside(countrySelectRef, closeModal)

  const handleCountrySearch = (e: any) => {
    const text = e.target.value;
    setSearchQuery(text.toLowerCase());
  }

  useEffect(() => {
    setCountries(countriesArr);
    setSelectedCountry(countriesArr[0])
    handleCountryChange(countriesArr[0])
  },[]);



  useEffect(() => {
    if(searchQuery === ''){
      setCountries(countriesArr)
    }else{
      const filteredCountries = countriesArr.filter((item: any) => item.name.toLowerCase().includes(searchQuery));
      setCountries(filteredCountries);
    }
  }, [searchQuery]);


  return (
    <div className={`${boxStyle}`} ref={countrySelectRef}>
      <div
        className={`${className} hover:cursor-pointer`}
        onClick={() => setToggle(prevState => !prevState)}
      >
        { _placeholder || selectedCountry?.name }
      </div>
      {toggle &&
        <div className="h-[30vh] z-20 overflow-y-auto absolute top-3 w-full shadow bg-white text-ryd-subTextPrimary text-[14px]">
          <input 
            type="search" 
            onChange={handleCountrySearch} 
            className="w-full h-[35px] outline-gray-50 px-[20px]" 
            placeholder="Search Country..." 
            />

          {countries.length > 0 && countries.map((item: { name: string, value: string}, index: number) => (
            <div key={index} 
              className="hover:bg-ryd-gray px-4 py-1 hover:cursor-pointer" 
              onClick={() => {
                setSelectedCountry(item);
                setToggle(false)
                handleCountryChange(item);
                setPlaceholder(null)
                }}>
              {item.name}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

