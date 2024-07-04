import { register, useDnd } from '@antv/xflow';
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from "react";
import { Node } from "./types";
import { getNodes } from "./node";


const Panel = () => {
    const [nodes, setNodes] = useState<Array<Node>>([]);
    const { startDrag } = useDnd();
    const registerNode = (node: Node) => {
        setNodes(prev => {
            if (prev.find(n => n.name === node.name)) {
                return prev;
            }
            // 注册自定义节点
            register({
                shape: node.name,
                component: node.warpper,
                effect: ['data'],
                ...node.props
            });
            return [...prev, node];
        });
    }
    const handleMouseDown = (e: React.MouseEvent<Element, MouseEvent>, node: Node) => {
        const id = nanoid()
        const data = {} as any
        data.id = id
        data.props = node.meta.props
        node.meta.props?.forEach(prop => {
            data[prop.name] = prop.defaultValue || ""
        })
        startDrag(
            {
                id: id,
                shape: node.name,
                data: data,
                ...node.props
            },
            e,
        );
    }

    useEffect(() => {
        for (const nodeName in getNodes()) {
            const node = getNodes()[nodeName]
            registerNode({
                name: nodeName,
                meta: node.meta,
                component: node.component,
                warpper: node.warpper,
                props: node.props
            })
        }
    }, [])

    return <div className="x-w-full x-h-full x-box-border x-p-3 x-flex x-flex-col x-gap-y-2">
        {nodes.map(node => {
            return <div className="x-w-full x-h-8" onMouseDown={(e) => handleMouseDown(e, node)} key={node.name}>
                <node.component />
            </div>
        })}
    </div>;
};

export default Panel;