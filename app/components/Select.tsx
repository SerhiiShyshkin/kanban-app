import useToggleOpen from "@/lib/hooks/useToggleOpen";
import React, { ReactNode, useEffect, useRef, useState } from "react";

type SelectProps<T> = {
  options: T[];
  selectedOption: string;
  getOptionalValue: (option: T) => string;
  onChange: (option: T) => void;
};

const Select = <T,>({ options, selectedOption, onChange, getOptionalValue }: SelectProps<T>) => {
  const { isOpen, setIsOpen, ref } = useToggleOpen();

  const handleSelect = (option: T) => {
    onChange(option);
    toggleDropdown();
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div ref={ref} className="relative inline-block w-full" onClick={toggleDropdown}>
      <div className=" border border-solid border-textMuted border-opacity-25 rounded w-full font-sans text-s text-black focus:outline-none font-medium py-2 px-4">
        {selectedOption}
      </div>
      {isOpen && (
        <div className="absolute flex flex-col gap-2 w-full mt-2 bg-white rounded-lg shadow-dropdown p-4">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-1 text-sm text-textMuted leading-23 tracking-normal font-medium hover:bg-gray-100 cursor-pointer`}
              onClick={() => handleSelect(option)}
            >
              {getOptionalValue(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
