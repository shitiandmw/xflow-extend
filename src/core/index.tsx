import { Graph, XFlow, Path, XFlowGraph, Clipboard, Control, Grid } from '@antv/xflow';
import { DAG_CONNECTOR } from './consts';
import Panel from './panel';
import Setter from './setter';
import { Keyboard } from './keyboard';
import { getEdgeMeta } from './edge';
import React, { forwardRef } from 'react';
import { getFlowData, setFlowData } from './flow'
import { EdgeMeta, FLowMetaData } from './types';

import { registerNode } from './node'
import { StringSetter, BooleanSetter, RadioGroupSetter, registerSetter } from './setter'
import { CcNode, CcNodeMeta } from "./node";
import { AudioNode, AudioNodeMeta } from "./node";
import { EndNode, EndNodeMeta } from "./node";
import { StartNode, StartNodeMeta } from "./node";
import {getNode} from './node'

// 注册节点
// registerNode("AudioNode", AudioNode, AudioNodeMeta, { width:200, height:100 })
registerNode("StartNode", StartNode, StartNodeMeta)
registerNode("AudioNode", AudioNode, AudioNodeMeta)
registerNode("CcNode", CcNode, CcNodeMeta)
registerNode("EndNode", EndNode, EndNodeMeta)

// 注册设置器
registerSetter("StringSetter", StringSetter)
registerSetter("BooleanSetter", BooleanSetter)
registerSetter("RadioGroupSetter", RadioGroupSetter)

type EventRefType = {
    getFlowData: () => any;
    setFlowData: (data: FLowMetaData) => void
};

Graph.registerConnector(
    DAG_CONNECTOR,
    (s, e) => {
        const offset = 4;
        const deltaY = Math.abs(e.y - s.y);
        const control = Math.floor((deltaY / 3) * 2);

        const v1 = { x: s.x, y: s.y + offset + control };
        const v2 = { x: e.x, y: e.y - offset - control };

        return Path.normalize(
            `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `,
        );
    },
    true,
);



const XFlowExtend = forwardRef((_, ref) => {
    const registerEdge = (edgeMeta: EdgeMeta) => {
        try {
            Graph.registerEdge(edgeMeta.id, {
                attrs: {
                    line: {
                        stroke: edgeMeta.color,
                        strokeWidth: edgeMeta.width,
                        targetMarker: {
                            name: 'block',
                            width: 14,
                            height: 10,
                        },
                    },
                    label: {
                        fill: '#000',
                        fontSize: 14,
                        textAnchor: 'middle',
                        textVerticalAnchor: 'middle',
                        pointerEvents: 'none',
                    },
                    body: {
                        ref: 'label',
                        fill: '#ff3300',
                        stroke: '#ffa940',
                        strokeWidth: 1,
                        rx: 4,
                        ry: 4,
                        refWidth: '140%',
                        refHeight: '140%',
                        refX: '-20%',
                        refY: '-20%',
                    },
                },
            });
        } catch (error) {
        }

    }
    const edgeMeta = getEdgeMeta()
    registerEdge(edgeMeta)

    const eventRef = React.useRef<EventRefType>(null);
    React.useImperativeHandle(ref, () => ({
        getFlowData: getFlowData,
        setFlowData: (data: FLowMetaData) => {
            if(data.nodes && data.nodes.length>0){
                data.nodes = data.nodes.map(node => {
                    const newNode = {...node}
                    const nodeMeta = getNode(node?.shape||"")
                    if(nodeMeta){
                        const nodeMetaProps = nodeMeta.meta.props
                        newNode.data = {...(newNode?.data||[]), props:nodeMetaProps}
                    }
                    return newNode
                })
            }
            eventRef.current?.setFlowData(data)
            setFlowData(data)
        },
    }), []);


    return <div className='x-w-full x-h-full  x-text-sm '>
        <XFlow >
            <div className='x-w-full x-h-full x-flex '>
                <div className='x-w-44 x-h-full'>
                    <Panel />
                </div>
                <div className=' x-flex-1 x-relative'>
                    <XFlowGraph pannable
                        connectionOptions={{
                            snap: true,
                            allowBlank: false,
                            allowLoop: false,
                            allowNode: false,
                            highlight: true,
                            connectionPoint: 'anchor',
                            anchor: 'center',
                            connector: DAG_CONNECTOR,

                            validateMagnet({ magnet }) {
                                return magnet.getAttribute('port-group') !== 'top';
                            },
                        }}
                        connectionEdgeOptions={{
                            shape: edgeMeta.id,
                            animated: true,
                            zIndex: -1,
                        }}
                    />

                    <div className=' x-absolute x-top-2 x-left-2 x-shadow x-rounded'>
                        <Control
                            items={['zoomOut', 'zoomTo', 'zoomIn', 'zoomToFit', 'zoomToOrigin']}
                        />
                    </div>
                </div>

                <Grid
                    type="doubleMesh"
                    size={10}
                    options={[
                        {
                            color: '#E7E8EA',
                            thickness: 1,
                        },
                        {
                            color: '#f7f7f7',
                            thickness: 1,
                            factor: 4,
                        },
                    ]}
                />
                <Keyboard ref={eventRef} />
                <Clipboard />
                <div className=' x-w-64 x-h-full'>
                    <Setter />
                </div>
            </div>

        </XFlow>
    </div>;
})

export default XFlowExtend;

export * from './types'
export * from './setter'
export * from './edge'
export * from './node'
export * from './flow'