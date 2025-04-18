import generatePDF, { Options } from "react-to-pdf";
import Layout from "../assets/images/certificate.png";
import { useEffect, useState } from "react";
import {
  formatDateWithCurrentYear,
  getCertificateData,
} from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/user.service";

const DownloadCertificate = () => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();
  const userService = new UserService();
  const { id } = useParams();
  useEffect(() => {
    getProgram();
    setClicked(true);
  }, []);

  const getProgram = async () => {
    setLoading(true);
    try {
      const response = await userService.getProgramsCertificate(Number(id));
      setLoading(false);
      if (!response.status) {
        return;
      }
      const data = response.data;
      const CertificateData = {
        name: data.child.firstName + " " + data.child.lastName,
        title: "2 Days Free Cohort",
        date: formatDateWithCurrentYear(data.day),
      };
      setData(CertificateData);
    } catch (err) {
      setLoading(false);
      return;
    }
  };

  const options: Options = {
    filename: data.name + "-" + data.title,
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
        >
          Download as PDF
        </button>
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

export default DownloadCertificate;
