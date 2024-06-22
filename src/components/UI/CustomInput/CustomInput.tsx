import { FC } from "react";

import s from './CustomInput.scss'

interface IProps {
  holder: string;
  type: string;
  label: string;
  errors: any;
  register: any;
}

const CustomInput: FC<IProps> = ({ holder, type, label, errors, register }) => {
  return (
    <div className={s.inputBlock}>
      <label>
        <span className="enter__form-name">{label}</span>
        <input
          type={type}
          className="enter__form-input border border-black w-full"
          placeholder={holder}
          {...register}
        />
      </label>
      <div className="enter__form-error text-[14px] text-[red]">
        {errors && <h3>{errors.message}</h3>}
      </div>
    </div>
  );
};

export default CustomInput;
