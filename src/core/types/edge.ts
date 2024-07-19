import { ObjectMetaProps } from "./object";

export interface EdgeMeta {
    id: string;
    color?: string; // 连接线颜色
    width?: number; // 连接线宽度
    opacity?:number; // 连接线透明度
    props?: Array<ObjectMetaProps>;
}

export interface EdgeData {
    id: string;
    data: any;
}