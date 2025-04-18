import { useEffect, useState } from "react";
import { Button, Empty, ProgramCard } from "../../../components/ui";
import UserService from "../../../services/user.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import {
  setCart,
  setRenewal,
  setResume,
} from "../../../redux/reducers/userSlice";
import closeIcon from "../../../assets/icons/closeIcon.svg";

interface Props {
  handlePrevious?: () => void;
  childInfo: any;
  setSuccessModal?: any;
  closeRegTab: () => void;
  isRenewing?: boolean;
}

const divStyle = `h-fit  overflow-y-auto px-7 pb-[2rem] pt-[2rem]`;
const h1Style = `font-[400] text-[25px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mb-[2rem]`;

export default function RegSubModal({
  childInfo,
  setSuccessModal,
  closeRegTab,
  isRenewing,
}: Props) {
  const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
  const userService = new UserService();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<any>(null);
  const [programArr, setProgramArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const getPackages = async () => {
    setLoading(true);
    try {
      const response = await userService.getAllPackages();
      setLoading(false);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      //check programs
      const hasPrograms = Array.isArray(childInfo?.programs);
      const hasProgramAndPackages =
        hasPrograms && childInfo?.programs[0].hasOwnProperty("package");
      //console.log(hasPrograms)
      //console.log(childInfo?.programs)
      const programFilter = response?.data?.filter(
        (item: any) =>
          item.minAge <= childInfo.age &&
          item.maxAge >= childInfo.age &&
          item?.level ===
            (hasProgramAndPackages
              ? childInfo?.programs[0].package?.level + 1
              : 1)
      );
      //const programFilter = response?.data?.filter((item: any) => (item.minAge <= childInfo.age) && (item.maxAge >= childInfo.age) && (item?.level === 1));
      if (programFilter?.length > 0) {
        setSelected(programFilter[0]?.id);
      }
      setProgramArr(programFilter);
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.message);
      return;
    }
    return false;
  };

  //console.log(childInfo, 'childInfo')

    const handleSubmit = async () => {

        if (selected) {
            console.log(isRenewing)
            console.log(childInfo)
            console.log(userInfo?.timeOffset)
            //filter options
            const isProgramsAvailable = Array.isArray(childInfo?.programs)
            const isRenewConfirm = isProgramsAvailable && isRenewing
            //const packageId = isRenewing ? childInfo?.programs[0]?.package?.id : selected;
            const packageId = selected;
            const timeOffset = isRenewing ? (childInfo?.programs?childInfo?.programs[0]?.timeOffset: userInfo?.timeOffset) : userInfo?.timeOffset;
            const day = isRenewConfirm ? childInfo?.programs[0]?.day : (childInfo?.selectedDay?.value.toString() || childInfo?.programs[0]?.day.toString());
            const level = isRenewConfirm ? childInfo.level : 1;
            const time = isRenewConfirm ? childInfo.programs[0]?.time : (childInfo?.selectedTime?.value.toString() || childInfo.programs[0]?.time.toString());
            const childId = childInfo.id;
            const payload = {packageId, timeOffset, day, time, level, cohortId: (childInfo?.cohortId || childInfo?.programs[0]?.cohortId)}

      setSubmitLoading(true);
      try {
        const response = await userService.addProgram(payload, childId);
        setSubmitLoading(false);
        if (!response.status) {
          toast.error(response.message);
          dispatch(setCart(false));
          return;
        }
        setSuccessModal();
        closeRegTab();
        dispatch(setCart(true));
        dispatch(setRenewal(null));
        dispatch(setResume(null));
      } catch (err: any) {
        setSubmitLoading(false);
        toast.error(err.message);
      }
    }
    return false;
  };

  useEffect(() => {
    getPackages();
  }, []);

    const disabled = !selected;
    // const disabled = !selected ? true : false;

  return (
    <div className={divStyle}>
      <img
        src={closeIcon}
        alt="close"
        className="float-right relative -top-4 -right-3 hover:cursor-pointer"
        onClick={closeRegTab}
      />

      <h1 className={h1Style}>Available Program</h1>

      <div className="lg:w-[75%] mx-auto">
        {programArr.length > 0 ? (
          <>
            {" "}
            {programArr.map((item: any) => (
              <ProgramCard
                // setSelected={(data) => setSelected(data)}
                // selected={selected}
                id={item.id}
                key={item.id}
                price={item.amount}
                program={item.title}
                description={item.description}
                minAge={item.minAge}
                maxAge={item.maxAge}
                duration={item.weekDuration}
                altPrice={item.altAmount}
                country={userInfo.country}
              />
            ))}
          </>
        ) : (
          <Empty
            text={
              <>
                There is no available package for this age group, kindly contact
                the admin via{" "}
                <a href="tel:+18337371275" target="_blank">
                  +1-8337371275
                </a>{" "}
                or{" "}
                <a href="https://t.me/+kRUSHEc8S_thYzJk" target="_blank">
                  Telegram
                </a>
              </>
            }
          />
        )}
      </div>

      <div
        className={`grid ${
          !isRenewing
            ? "lg:gap-3 gap-y-4 lg:grid-cols-5"
            : "lg:gap-0 gap-y-0 lg:grid-cols-1"
        } grid-cols-1 mt-[4rem]`}
      >
        {!isRenewing && (
          <div className="col-span-2">
            <Button
              text="Cancel"
              isInverted={true}
              category="button"
              handleClick={() => {
                closeRegTab();
              }}
              btnStyle="w-full rounded-[16px] text-[16px] leading-[26px] font-[400] text-ryd-primary border border-ryd-primary px-[26px] py-[12px]"
            />
          </div>
        )}
        <div className="lg:col-span-3 col-span-1">
          <Button
            text={submitLoading ? "Processing..." : "Submit"}
            isInverted={false}
            category="button"
            disabled={disabled}
            handleClick={handleSubmit}
            btnStyle="w-full border rounded-[16px] border-0 text-[16px] leading-[26px] font-[400] text-white px-[26px] py-[12px]"
          />
        </div>
      </div>
    </div>
  );
}
