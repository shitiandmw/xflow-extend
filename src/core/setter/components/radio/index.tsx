import React from 'react';
interface RadioProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ label, value, checked, onChange }) => {
    return (
        <label className="x-flex x-items-start x-cursor-pointer">
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className="x-sr-only"
            />
            <div
                className={`x-w-4 x-h-4 x-mt-[2px] x-mr-2 x-rounded-full x-box-border x-border x-transition-all ${checked ? ' x-border-4 x-border-blue-500' : 'x-bg-white x-border-gray-300'
                    }`}
            ></div>
            <span className="x-text-gray-700 x-flex-1">{label}</span>
        </label>
    );
};


interface RadioGroupProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options = [
    {
        label: "选项一",
        value: "1"
    },
    {
        label: "选项二",
        value: "2"
    }
], value, onChange }) => {
    return (
        <div className="x-flex x-flex-col x-space-y-2">
            {options.map((option) => (
                <Radio
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    checked={option.value == value}
                    onChange={onChange}
                />
            ))}
        </div>
    );
};


const RadioGroupSetter = RadioGroup;
export { Radio, RadioGroup, RadioGroupSetter };
