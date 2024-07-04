import React from "react";
import { NodeMeta } from "../types";
import ports from "./ports";
import { NodeWarpper } from "./components"
import { NodeRegistryProps } from "../types"

// setterRegistry.js
const nodeRegistry: { [name: string]: NodeRegistryProps } = {};

const defaultNodeProps = {
    width: 150,
    height: 40,
    ports: ports,
}

export function registerNode(name: string, component: React.FC<any>, meta: NodeMeta, props?: any) {
    nodeRegistry[name] = {
        component,
        warpper: NodeWarpper(component),
        meta,
        props: {
            ...defaultNodeProps,
            ...props || {},
        }
    };
}

export function getNode(name: string): NodeRegistryProps {
    return nodeRegistry[name];

}

export function getNodes(): { [name: string]: NodeRegistryProps } {
    return nodeRegistry;
}
