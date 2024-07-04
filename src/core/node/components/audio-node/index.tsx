import { useEffect, useState } from "react";
import Svg from './svg'
import mata from './meta'
export interface AudioNodeProps {
    label?: string;
    selected?: boolean;
    isCanvas?: boolean;
}

const AudioNode = ({ label = "审核节点",selected=false ,isCanvas=false }: AudioNodeProps) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        setValue(label)
    }, [label]);
    const canvasRander = <div className={`x-w-full x-h-full x-border x-border-slate-300 x-rounded x-shadow-md x-bg-white x-flex x-items-center x-justify-center x-gap-x-2 x-cursor-pointer x-border-l-4 x-border-l-cyan-500 x-text-gray-600 x-outline-sky-600   ${selected?"x-outline":""}`}>
        <Svg className=" x-w-4 x-h-4 " />{value} 
    </div>;
    // 演示：可以使用isCanvas来判断当前节点是否在画布上，用来渲染不同的UI
    if (!isCanvas) return canvasRander
    return canvasRander;

};

const AudioNodeMeta = mata
export { AudioNode, AudioNodeMeta };