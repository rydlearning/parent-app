import React, { useEffect, useState } from "react";
import Layout from "../../assets/images/crop.png";
import { formatDate, newFormatDate, setCertificateData } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

function ProgramsList(programs: any) {
  const [childPrograms, setChildPrograms] = useState<any>({});

  useEffect(() => {
    setChildPrograms(programs.programs);
  }, [programs]);
  const navigate = useNavigate()
  const toggleDownload =(title:any, end:any)=>{
    const  data ={
        name: childPrograms.firstName + " " + childPrograms.lastName,
        title: title,
        date: newFormatDate(end)
    }
    setCertificateData(data)
    navigate('/parent/certificate')
  }
  return (
    <div className="p-4" style={{overflow:"scroll", height:"90vh"}}>
      {childPrograms ? (
        <>
          <div className="flex items-center rounded w-full bg-ryd-primary text-white lg:px-[2rem] px-2 lg:py-[1rem] py-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            <h2 className="mx-2">
              {" "}
              {childPrograms.firstName + " " + childPrograms.lastName}
            </h2>
          </div>
          <div className="header py-4">
            <h1 className="text-[20px]">Lists of programs</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {childPrograms.programs?.map((each:any, i:any) => (
              <div className="border-2 border-gray-200 rounded " key={i}>
                <img src={Layout} alt="" className="rounded-t-lg" />
                <div className="p-2">
                  <h2 className="my-3">Title : {each.package.title}</h2>
                  <h2 className="my-3">Level : {each.package.level}</h2>
                  <h2 className="my-3">Duration : {each.package.weekDuration} Weeks</h2>
                  <button 
                  onClick={()=>toggleDownload(each.package.title,each.endClassDate)}
                  className="flex w-full items-center justify-between gap-x-2 px-5 py-3 text-[14px] rounded hover:cursor-pointer  bg-ryd-primary text-white">
                    <span>Download Certificate</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-file-earmark-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <center>
            <span>Loading......</span>
        </center>
      )}
    </div>
  );
}

export default ProgramsList;
