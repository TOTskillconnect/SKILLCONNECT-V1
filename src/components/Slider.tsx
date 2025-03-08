interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min,
  max,
  step
}) => {
  return (
    <div className="relative w-full h-6 flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
      />
      <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-secondary-text">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-secondary-text">
        {value}
      </div>
    </div>
  );
}; 