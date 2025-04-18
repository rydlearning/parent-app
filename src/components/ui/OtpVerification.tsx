import React, { useState } from "react";
import Button from "./Button";

interface Props {
  btnText: string;
  handleVerification?: (data: string | number) => void;
}

function OtpVerification({ btnText, handleVerification }: Props) {
  const [codeBox, setCodeBox] = useState(new Array(4).fill(""));

  const handleNext = () => {
    const isCodeValid = codeBox.every((value) => value.trim() !== "");
    if (!isCodeValid) {
      alert("Input an OTP");
      return;
    }
    if (handleVerification) {
      const otpInput = codeBox.join('');
      handleVerification(otpInput);
    }
  };

  const handleChange = (element: HTMLInputElement, index: number): void => {
    if (isNaN(Number(element.value))) return;

    setCodeBox((prevCodeBox) =>
      prevCodeBox.map((d, idx) => (idx === index ? element.value : d))
    );

    // Focus next input
    if (element.nextSibling instanceof HTMLInputElement) {
      element.nextSibling.focus();
    }
  };

  function handleDelete(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void {
    if (
      e.key === "Backspace" &&
      e.currentTarget.previousSibling instanceof HTMLInputElement
    ) {
      e.preventDefault();
      e.currentTarget.previousSibling.focus();

      setCodeBox((prevCodeBox) =>
        prevCodeBox.map((data, i) => (i !== index ? data : ""))
      );
    } else if (
      e.key === "Backspace" &&
      !e.currentTarget.previousSibling &&
      e.currentTarget.nextSibling instanceof HTMLInputElement
    ) {
      e.preventDefault();
      setCodeBox((prevCodeBox) =>
        prevCodeBox.map((data, i) => (i !== index ? data : ""))
      );
    } else if (e.key === "Enter") {
    }
  }

  function handlePaste(e: any) {
    const value = e.clipboardData.getData("text");
    if (isNaN(value)) return false;
    const updatedValue = value.toString().split("").slice(0, codeBox.length);
    setCodeBox(updatedValue);

    const focusedInput = e.target.parentNode.querySelector("input:focus");
    if (focusedInput) {
      focusedInput.blur();
    }

    const lastInput = e.target.parentNode.querySelector(
      'input[type="password"]:last-child'
    );
    if (lastInput) {
      lastInput.focus();
    }
  }

  return (
    <>
      <div className="flex gap-[19px] my-10 justify-center">
        {codeBox.map((value, i) => (
          <input
            type="text"
            className="max-w-[62px] w-full h-[62px] border py-[27px] lg:px-6 px-4 text-center border-ryd-borderInput outline-ryd-primary rounded-[15px]"
            key={i}
            value={value}
            maxLength={1}
            onChange={(e) => handleChange(e.target, i)}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;
              if (e.keyCode === 8 || e.key === "Backspace") {
                handleDelete(e, i);
              } else if (e.key === "ArrowLeft" && target.previousSibling) {
                e.preventDefault();
                (target.previousSibling as HTMLInputElement).focus();
              } else if (e.key === "ArrowRight" && target.nextSibling) {
                e.preventDefault();
                (target.nextSibling as HTMLInputElement).focus();
              }
            }}
            onPaste={(e) => {
              handlePaste(e);
            }}
          />
        ))}
      </div>
      <Button
        isInverted={false}
        text={btnText}
        category="button"
        btnStyle='w-full rounded-[16px] border-0  text-[14px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
        handleClick={handleNext}
      />
    </>
  );
}

export default OtpVerification;
