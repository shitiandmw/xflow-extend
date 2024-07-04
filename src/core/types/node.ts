import React from "react";
import {NodeWarpper} from "../node";
import { ObjectMetaProps } from "./object";

export interface NodeMeta {
    title: string;
    category: string;
    props?: Array<ObjectMetaProps>;
}
export interface Node {
    name: string;
    meta: NodeMeta,
    component: React.FC<any>;
    warpper: ReturnType<typeof NodeWarpper>
    props: any;
}

export interface NodeRegistryProps {
    component: React.FC<any>
    meta: NodeMeta
    props?: any
    warpper: ReturnType<typeof NodeWarpper>
}
export interface NodeData {
    id: string;
    data: any;
}