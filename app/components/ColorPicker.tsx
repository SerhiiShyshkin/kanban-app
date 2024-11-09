"use client";

import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

type ColorPickerProps = {
  defaultColor: string;
};

const ColorPicker = ({ defaultColor }: ColorPickerProps) => {
  const [color, setColor] = useState(defaultColor);
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative">
      <div
        style={{ backgroundColor: color }}
        className="w-[15px] h-[15px] rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div ref={pickerRef} className="absolute top-4 left-3">
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
