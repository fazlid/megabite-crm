import {FC} from 'react'
import s from "./CustomBtn.module.scss";

interface ICustomBtnProps {
    text: string;
    icon?: string;
    width: number;
    height: number;
    mt?: string;
    mg?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const CustomBtn:FC<ICustomBtnProps> = ({text, icon, width, height, mt, disabled, mg, onClick}) => {

  return (
    <button className={s.btn} style={{width: width, height: height,  margin: mg, marginTop: mt}} disabled={disabled} onClick={onClick}>
        {icon && <img src={icon} alt="" />}
        <span>{text}</span>
    </button>
  )
}

export default CustomBtn