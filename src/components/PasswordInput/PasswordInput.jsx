import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function PasswordInput({ value, onChange, placeholder, name, disabled }) {
    const [visible, setVisible] = useState(false);

    return (
        <div css={S.SInputWrapper}>
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                disabled={disabled}
                css={S.SInputStyle}
            />
            <span onClick={() => setVisible(!visible)} css={S.SIconStyle}>
                {visible ? <FiEyeOff /> : <FiEye />}
            </span>
        </div>
    );
}

export default PasswordInput;
