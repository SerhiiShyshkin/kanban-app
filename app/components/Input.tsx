"use client";

import React, { useState, ChangeEvent } from "react";

type InputProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({ label, onChange, value, type = "text", placeholder }) => {
  return (
    <div>
      <input
        type={type}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
      />
    </div>
  );
};

export { Input };
