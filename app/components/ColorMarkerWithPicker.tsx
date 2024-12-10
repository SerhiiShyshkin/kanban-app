'use client';

import { updateColumnColor } from '@/lib/server-actions/board-actions';
import useToggleOpen from '@/lib/hooks/useToggleOpen';
import { useState } from 'react';

import { HexColorPicker } from 'react-colorful';

type ColorMarkerWithPickerProps = {
  id: string;
  color: string;
};

const ColorMarkerWithPicker = ({ id, color }: ColorMarkerWithPickerProps) => {
  const { ref, isOpen, toggleOpen } = useToggleOpen();
  const [newColor, setColor] = useState<string>(color);

  return (
    <div ref={ref} className="flex flex-col relative">
      <div
        style={{ backgroundColor: `${color}` }}
        className="w-[15px] h-[15px] rounded-full"
        onClick={toggleOpen}
      />
      {isOpen && (
        <div className="absolute top-4 left-3">
          <HexColorPicker
            color={newColor}
            onChange={setColor}
            onClick={() => updateColumnColor(id, newColor)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorMarkerWithPicker;
