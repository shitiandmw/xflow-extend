import { useEffect, useState } from "react";
import Svg from './svg'
import mata from './meta'
export interface EndNodeProps {
    label?: string;
    selected?: boolean;
    ignore?: boolean;
    isFinishd?: boolean;
}

const EndNode = ({ label = "结束节点", selected = false , ignore=false, isFinishd=false}: EndNodeProps) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        setValue(label)
    }, [label]);
    return <div className={`${ignore?"x-opacity-30":""} x-w-full x-h-full x-border x-border-slate-300 x-rounded-full x-shadow-md x-bg-white x-flex x-items-center x-justify-center x-gap-x-2 x-cursor-pointer  x-text-gray-600 x-outline-sky-600  ${selected ? "x-outline" : ""} ${isFinishd?"x-outline  ":""}`}>
        <div className="x-text-red-500"><Svg className=" x-w-4 x-h-4 " /></div>{value}
    </div>;
};

const EndNodeMeta = mata
export { EndNode, EndNodeMeta };