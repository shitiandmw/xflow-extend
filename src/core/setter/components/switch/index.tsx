import React from 'react';
interface SwitchProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
    const toggleSwitch = () => {
        onChange(!value);
    };

    return (
        <label className="x-flex x-items-center x-cursor-pointer">
            <div className="x-relative">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={toggleSwitch}
                    className="x-sr-only"
                />
                <div
                    className={`x-block x-w-12 x-h-6 x-rounded-full x-transition-colors ${value ? 'x-bg-blue-500' : 'x-bg-gray-300'
                        }`}
                ></div>
                <div
                    className={`x-absolute x-top-1 x-left-1 x-w-4 x-h-4 x-bg-white x-rounded-full x-shadow x-transition-transform ${value ? 'x-transform x-translate-x-6' : ''
                        }`}
                ></div>
            </div>
        </label>
    );
};

const BooleanSetter = Switch;
export { Switch }
export { BooleanSetter }
