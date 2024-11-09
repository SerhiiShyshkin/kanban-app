import { useState } from "react";

type SelectProps<T> = {
  options: T[];
  getOptionalLabel: (option: T) => string;
  getOptionalValue: (option: T) => string;
  getOptionalId: (option: T) => string;
  state: T;
  onChange: (option: T) => void;
};

const Select = <T,>({ options, getOptionalLabel, state, getOptionalValue, onChange }: SelectProps<T>) => {
  //const [selectedOption, setSelectedOption] = useState<T | null>(options[0]);

  const handleSelect = (option: T) => {
    onChange(option);
    
  };

  return (
    <div className="relative inline-block w-full">
      <div className=" border border-solid border-textMuted border-opacity-25 rounded w-full font-sans text-s text-black focus:outline-none font-medium py-2 px-4">
        {state? getOptionalLabel(state) : "Выберите..."}
      </div>
      {false && (
        <div className="absolute flex flex-col gap-2 w-full mt-2 bg-white rounded-lg shadow-dropdown p-4">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-1 text-sm text-textMuted leading-23 tracking-normal font-medium hover:bg-gray-100 cursor-pointer ${
                state === option ? "bg-gray-100" : ""
              }`}
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
