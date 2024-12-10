"use client";

import React, {ChangeEvent} from "react";

type InputProps = {
    id: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type?: string;
    placeholder?: string;
    checked?: boolean;
};

const Input: React.FC<InputProps> = ({id, onChange, value, type = "text", placeholder, checked}) => {
    return (
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="placeholder-black placeholder-opacity-25 appearance-none border border-solid border-textMuted border-opacity-25 rounded w-full text-caption text-black focus:outline-none py-2 px-4"
            placeholder={placeholder}
            checked={checked}
        />
    );
};

export {Input};
