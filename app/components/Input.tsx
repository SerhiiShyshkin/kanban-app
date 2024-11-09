"use client";

import React, { useState, ChangeEvent } from "react";

type InputProps = {
  label: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  placeholder?: string;
  checked?: boolean;
};

const Input: React.FC<InputProps> = ({ label, name, onChange, value, type = "text", placeholder, checked }) => {
  return (
    <input
      type={type}
      id={label}
      name={name}
      value={value}
      onChange={onChange}
      className="placeholder-black placeholder-opacity-25 appearance-none border border-solid border-textMuted border-opacity-25 rounded w-full font-sans text-s text-black focus:outline-none font-medium py-2 px-4"
      placeholder={placeholder}
      checked={checked}
    />
  );
};

export { Input };
