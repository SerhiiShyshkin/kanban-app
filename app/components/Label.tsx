import React from "react";

type LabelProps = {
  htmlFor: string;
  label: string;
};

const Label: React.FC<LabelProps> = ({ htmlFor, label }) => {
  return (
    <label htmlFor={htmlFor} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
  );
};

export { Label };
