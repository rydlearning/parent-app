import generatePDF, { Options } from "react-to-pdf";
import Layout from "../assets/images/certificate.png";
import { useEffect, useState } from "react";
import { getCertificateData } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const CertificateView = () => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] =  useState<any>({});
  const navigate = useNavigate()
  useEffect(()=>{
    const data = getCertificateData()
    if(data === null || data === undefined || !data){
      navigate('/parent/home')
    }
    setClicked(true)
    setData(data)
    console.log(data)
  },[])

  const options: Options = {
    filename: data.name+"-"+data.title,
    page: {
      margin: 20,
      format: "A4",
      orientation: "landscape",
    },
  };

  const getTargetElement = () => document.getElementById("container");

  const downloadPdf = () => generatePDF(getTargetElement, options);

  return (
    <>
    <center>
    <button
    className="m-5 flex items-center gap-x-2 px-5 py-3 text-[14px] rounded-[10px] hover:cursor-pointer  bg-ryd-primary text-white"
    onClick={downloadPdf}
    >Download as PDF</button>
    </center>
      <div id="container">
        <center>
          <div className="Certificate">
            <img src={Layout} className="background" alt="" />
            <div className="text">
              <div className="text">
                <h2 className={`name ${clicked ? " " : "pt-5"}`}>
                  {data.name}
                </h2>
                <h1 className={`title ${clicked ? " " : "pt-5"}`}>
                  {data.title}
                </h1>
                <span className="date">{data.date}</span>
              </div>
            </div>
          </div>
        </center>
      </div>
    </>
  );
};

export default CertificateView;
