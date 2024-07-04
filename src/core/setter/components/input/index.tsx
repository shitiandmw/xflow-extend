interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const StringSetter = ({ value, onChange }: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    return <div className="x-w-full x-h-7 x-border x-rounded x-overflow-hidden x-bg-gray-100">
        <input type="text" className=" x-border-0 focus:x-outline-none x-w-full x-h-full x-px-2 x-text-gray-700 " value={value} onChange={handleChange} />
    </div>;
};
export { StringSetter }