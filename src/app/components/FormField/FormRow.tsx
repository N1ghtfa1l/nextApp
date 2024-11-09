import React, { FC } from 'react';
import TextBox from '../UI/TextBox/TextBox';
import SelectCity from '../SelectCity/SelectCity';
import styles from './FormField.module.css';

interface Props {
    label: string,
    placeholder?: string,
    type?: 'text' | 'checkbox' | 'select' | 'phone',
    selectCity?: (item: string) => void,
    onSelectValue?: (value: any) => void,
    onChange?: (value: any) => void,
    value?: string | boolean,
    error: boolean,
    description?: string,
    required: boolean
}

const star = <span className={styles.star}>*</span>

const FormRow: FC<Props> = ({
    label,
    placeholder,
    type = "text",
    selectCity,
    onSelectValue,
    onChange,
    value,
    error,
    description,
    required
}) => (
    <div className={styles.row}>
        <span>{label}{required && star}</span>
        {type === 'text' && (
            <TextBox
                placeholder={placeholder}
                onChange={onSelectValue}
                error={error}
                description={description}
                value={value}
            />
        )}
        {type === 'checkbox' && (
            <div className={styles.checkbox}>
                <input
                    id="checkbox"
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(e) => onSelectValue?.(e.target.checked)}
                />
                <label className={styles.label} htmlFor="checkbox">
                    принимать актуальную информацию на емейл
                </label>
            </div>
        )}
        {type === 'select' && <SelectCity onChange={selectCity} description={description} error={error} />}
        {type === 'phone' && (
            <TextBox
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                //@ts-ignore
                value={value}
                error={error}
            />
        )}
    </div>
);

export default FormRow;
