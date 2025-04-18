import React, { ButtonHTMLAttributes } from "react";

// Define an interface to extend the button type
interface ExtendedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  category: "link" | "button";
  to?: string;
  text?: string;
  isInverted: boolean;
  handleClick?: () => void;
  btnStyle?: string;
  btnIcon?: string;
}

function Button({
  category,
  to,
  text,
  isInverted,
  handleClick,
  btnStyle,
  type,
  btnIcon,
  disabled
}: ExtendedButtonProps) {

  if (category === "link") {
    return (
      <a
        href={to}
        onClick={handleClick}
        className={`${btnStyle} ${
          isInverted ? "bg-transparent text-ryd-primary" : "bg-ryd-primary text-white"
        } outline-0 text-[14px] cursor-pointer`}
      >
        {text}
      </a>
    );
  }
  if (category === "button") {
    return (
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={`${btnStyle} ${disabled && 'cursor-not-allowed bg-gray-200 border-0'} ${
          isInverted
            ? "bg-transparent text-ryd-primary border-ryd-primary "
            : "bg-ryd-primary text-white"
        } outline-none text-[14px] cursor-pointer`}
      >
        {btnIcon && <img src={btnIcon} alt="icon" />}
        {text}
      </button>
    );
  }
  return <></>;
}

export default Button;
