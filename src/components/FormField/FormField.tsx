import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import Styles from "./FormField.module.scss";

interface FormFieldType {
  id: string;
  label: string;
  value: string;
  type: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function FormField({ id, label, value, type, onChange }: FormFieldType) {
  return (
    <div className={Styles.form__field}>
      <label className={Styles.form__label} htmlFor={id}>
        {label}
      </label>
      <input
        className={Styles.form__input}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;
