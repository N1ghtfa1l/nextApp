import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './TextBox.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    onChange?: (value: any) => void;
    value?: any,
    error: boolean
}

const TextBox = forwardRef<HTMLDivElement, Props>(
    (
        {
            label,
            onChange,
            description,
            className,
            value,
            error,
            ...props
        }: Props,
        ref,
    ) => {


        return (
            <>
                <div ref={ref} className={styles.box}>
                    <input
                        {...props}
                        type="text"
                        value={value}
                        className={error ? styles.errorInput : styles.input}
                        onChange={(e) => onChange?.(e.target.value)}
                    />
                    {error && description && <div className={styles.error}> {description}</div>}
                </div>
            </>
        );
    },
);

export default TextBox;
