import { FC } from "react";

import s from './CustomInput.module.scss'

interface IProps {
  holder: string;
  type: string;
  label: string;
  errors: any;
  register: any;
}

const CustomInput: FC<IProps> = ({ holder, type, label, errors, register }) => {
  return (
    <div className={s.enterForm}>
      <label>
        <span className={s.enterForm_name}>{label}</span>
        <input
          type={type}
          className={s.enterForm_input}
          placeholder={holder}
          {...register}
        />
      </label>
      <div className={s.enterForm_error}>
        {errors && <h3>{errors.message}</h3>}
      </div>
    </div>
  );
};

export default CustomInput;
