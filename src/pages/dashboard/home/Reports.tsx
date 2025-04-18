import React, { useEffect, useState } from "react";
import { CustomModal, Empty } from "../../../components/ui";
import UserService from "../../../services/user.service";
import { toast } from "react-toastify";
import { formatDate } from "../../../components/custom-hooks";
import RegSubModal from "./RegSubModal";
import {
    setCart,
    setRenewal,
    setResume,
} from "../../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import ProgramsList from "../../../components/Certificate/ProgramsList";
import { formatDatee } from "../../../components/custom-hooks/formatDate";
import { useNavigate } from 'react-router-dom';
import thumbnail from '../../../assets/images/repp.png'


const tableHeader =
    "text-[15px] font-[400] leading-[26px] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary";
const tableBody =
    "text-[14px] font-[400] font-[AvertaStd-Light]  leading-[26px] text-[#616161]";
const attendanceBtnStyle =
    "rounded-[7px] bg-green-600 py-2.5 px-2.5 text-white text-[11px] border-0";
const btnStyle = "text-[8px] px-2 py-0.5 rounded-[8px] bg-white";

export default function Reports() {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const userService = new UserService();
    const dispatch = useDispatch();

    const [childrenArr, setChildrenArr] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [isRegComplete, setIsRegComplete] = useState(false);
    const [toggleDel, setToggleDel] = useState(false);
    const [toggleCertificate, setToggleCertificate] = useState(false);
    const [togglePayModal, setTogglePayModal] = useState(false);
    const [selectedChild, setSelectedChild] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [enableDone, setEnableDone] = useState(false);
    const [toggleReportsModal, setToggleReportsModal] = useState(false);
    const [childReports, setChildReports] = useState<any[]>([]);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [viewSingleReport, setViewSingleReport] = useState(false);
    const [loadingReports, setLoadingReports] = useState(false);
    const navigate = useNavigate();

    const getChildren = async () => {
        try {
            const response = await userService.getAllChildReportById(userInfo.id);
            if (!response.status) {
                // toast.error(response.message);
                return;
            }
            //    setData(response.data)
            const res = response.data;
            setChildrenArr(res);
            setLoading(false);
        } catch (err: any) {
            toast.error(err?.message);
            return;
        }
    };

        const handleClicked = async (id:any) => {
            try {
                const userService = new UserService();
                const response = await userService.clickedReport(id);
    
            } catch (err) {
                toast.error("Failed to submit comment");
            }
        };

    const handleReport = (data: any) => {
        navigate(`/parent/report/preview/${data.id}`)
        if(!data.clicked){
            handleClicked(data.id)
        }
    }

    useEffect(() => {
        getChildren();
    }, []);

    return loading ? (
        <div className="h-[100px] w-[100px] rounded-full absolute left-[50%] top-[50%] border border-ryd-primary border-l-white animate-spin"></div>
    ) : (
        <>
            <div
                className={`mt-[3rem] ${childrenArr?.length > 0
                    ? "border-x border-x-[#F7F7F7] border-b border-b-[#F7F7F7]"
                    : "border-0"
                    } md:w-full w-[700px] overflow-x-auto`}
            >
                {childrenArr?.length > 0 ? (
                    <>
                        <ul>
                            <li className="w-full flex items-center p-3 rounded-t-[10px] bg-[#F7F7F7]">
                                <p className={`${tableHeader} w-[20%]`}>First Name</p>
                                <p className={`${tableHeader} w-[20%]`}>Last Name</p>
                                <p className={`${tableHeader} w-[10%] `}>Age</p>
                                <p className={`${tableHeader} w-[20%] `}>Level</p>
                                <p className={`${tableHeader} w-[15%] `}>Date</p>
                                <p className={`${tableHeader} w-[18%] `}>Reg. Status</p>
                                <p className={`${tableHeader} w-[20%] text-left`}>Action</p>
                            </li>
                        </ul>
                        <ol>
                            {childrenArr?.slice().reverse()?.map((item: any, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className={`w-full flex items-center p-3 ${index % 2 !== 0 ? "bg-[#F7F7F7]" : "bg-white"
                                            }`}
                                    >
                                        <p className={`${tableBody} w-[20%] capitalize`}>
                                            {item?.child?.firstName}
                                        </p>
                                        <p className={`${tableBody} w-[20%] capitalize`}>
                                            {" "}
                                            {item?.child?.lastName}
                                        </p>
                                        <p className={`${tableBody} w-[10%] `}>{item?.child?.age}</p>
                                        <p className={`${tableBody} w-[20%] `}>{item?.program?.package?.title}</p>
                                        <p className={`${tableBody} w-[15%] `}>
                                            {formatDate(item?.createdAt)}
                                        </p>
                                        <p className={`${tableBody} w-[18%] `}>
                                            {item?.programs?.length === 0 ? (
                                                <span>Incomplete</span>
                                            ) : (
                                                <span>Completed</span>
                                            )}
                                        </p>
                                        <p className={`${tableBody}  w-[20%]`}>
                                            <button
                                                onClick={() => {
                                                    handleReport(item);
                                                }}
                                                className={`${btnStyle} border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`}
                                            >
                                                <span className="flex"><span className="me-1"> View</span> Reports</span>
                                            </button>
                                        </p>
                                    </li>
                                );
                            })}
                        </ol>
                    </>
                ) : (
                    <Empty text="You have no recent child report" />
                )}
            </div>
        </>
    );
}
