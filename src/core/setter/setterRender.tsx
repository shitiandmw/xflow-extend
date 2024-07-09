import React from "react";
import { getSetter } from "./setterRegistry";
import { ObjectMetaProps } from "../types"

interface ObjData {
    id: string;
    data: any;
}
interface SetterRenderProps {
    objName?: string;
    obj: ObjData | undefined;
    updateObj: (data: any) => void;
}

const SetterRender: React.FC<SetterRenderProps> = ({ objName = "对象", obj, updateObj }) => {
    const handlePropChange = (propName: string, value: any) => {
        const updatedObj = {
            ...obj,
            data: {
                ...obj?.data,
                [propName]: value
            }
        };
        updateObj(updatedObj);
    };
    if (!obj) return <div className=" x-w-full x-h-full x-flex x-flex-col x-items-center x-justify-center  x-text-gray-500">
        <span className=" x-text-xl x-mb-2 x-text-gray-800">未选中</span>
        <span>请先选择需要设置的{objName}</span>
    </div>;

    if (!obj?.data?.props || obj?.data?.props?.length == 0)
        return <div className=" x-w-full x-h-full x-flex x-flex-col x-items-center x-justify-center  x-text-gray-500">
            <span className=" x-text-xl x-mb-2 x-text-gray-800">无属性</span>
            <span>选中的{objName}没有可以设置的属性</span>
        </div>
    return (
        <div key={obj?.id}>
            {obj?.data?.props.map((item: ObjectMetaProps, index: number) => {
                const SetterComponent = getSetter(item.setter);
                let setterProps = {}
                if (!SetterComponent) return null;
                if (typeof item.setter == 'object') {
                    setterProps = item.setter.props || {}
                } 
                return (
                    <SetterComponent {...setterProps} key={`${item.name}-${index}`} label={item.title} name={item.name} value={typeof obj.data[item.name] == "undefined" ? item.defaultValue : obj.data[item.name]} onChange={(value: string) => { handlePropChange(item.name, value) }} />
                )
            })}
        </div>
    );
};

export default SetterRender;

