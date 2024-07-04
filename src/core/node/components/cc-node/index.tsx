import { useEffect, useState } from "react";
import Svg from './svg'
import mata from './meta'
export interface CcNodeProps {
    label?: string;
    selected?: boolean;
}

const CcNode = ({ label = "抄送节点", selected = false }: CcNodeProps) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        setValue(label)
    }, [label]);
    return <div className={`x-w-full x-h-full x-border x-border-slate-300 x-rounded x-shadow-md x-bg-white x-flex x-items-center x-justify-center x-gap-x-2 x-cursor-pointer x-border-l-4 x-border-l-lime-500 x-text-gray-600 x-outline-sky-600  ${selected ? "x-outline" : ""}`}>
        <Svg className=" x-w-4 x-h-4 " />{value}
    </div>;
};

const CcNodeMeta = mata
export { CcNode, CcNodeMeta };