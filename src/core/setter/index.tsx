import { useEffect, useState } from "react";
import { useGraphEvent, useGraphStore } from '@antv/xflow';
import { SelectDom, ObjectData } from "../types"
import { getEdgeMeta } from '../edge';
import SetterRender from "./setterRender";
import { getFlowData, setFlowData, getFlowProps } from '../flow';
import { eventEmitter } from '../events';


const Setter = () => {
    const edgeMeta = getEdgeMeta();
    const [nodeSelected, setNodeSelected] = useState<ObjectData>()
    const [edgeSelected, setEdgeSelected] = useState<ObjectData>()
    const [flow, setFlow] = useState<ObjectData>()
    const [showDom, setShowDom] = useState(SelectDom.Flow)
    const [activeTab, setActiveTab] = useState(SelectDom.Flow)
    const updateEdge = useGraphStore((state) => state.updateEdge);
    const updateNode = useGraphStore((state) => state.updateNode);

    const initFlow = () => {
        const flowData = getFlowData()
        const flowProps = getFlowProps()
        setFlow({
            id: 'flow',
            data: {
                ...flowData,
                props: [...flowProps]
            }
        })
    }
    useGraphEvent('node:selected', ({ node }) => {
        const nodeCopy = {
            id: node.id,
            data: {
                ...node.data,
                selected: true,
            },
        }
        console.log('node:selected', nodeCopy)
        setShowDom(SelectDom.Node)
        setNodeSelected(nodeCopy)
        updateNode(node.id!, {
            data: nodeCopy.data
        });
    });
    useGraphEvent('node:unselected', ({ node }) => {
        setShowDom(SelectDom.Flow)
        setNodeSelected(undefined)
        updateNode(node.id!, {
            data: {
                ...node.data,
                selected: false,
            }
        });
    });
    useGraphEvent('edge:selected', ({ edge }) => {
        console.log('edge:selected', edge)
        const edgeCopy = {
            id: edge.id,
            data: {
                props: edgeMeta.props,
                ...edge.data,
                selected: true,
            },
        }
        setShowDom(SelectDom.Edge)
        setEdgeSelected(edgeCopy)
    });
    useGraphEvent('edge:unselected', () => {
        setShowDom(SelectDom.Flow)
    });
    useEffect(() => {
        setActiveTab(showDom)
    }, [showDom])

    useEffect(() => {
        initFlow()
        eventEmitter.on('reloadFLow', initFlow);
        return () => {
            eventEmitter.off('reloadFLow', initFlow);
        }
    }, [])
    return <div className="x-setter x-w-full x-h-full x-flex x-flex-col ">
        <div className="x-h-10 x-w-full x-border-b x-px-4 x-flex x-justify-between x-gap-x-4 x-select-none">
            {showDom != SelectDom.Edge && <h2 className={`x-h-10 -x-mb-1 x-flex-1 x-flex x-items-center x-justify-center x-cursor-pointer x-box-border  x-border-blue-400  ${activeTab == SelectDom.Node ? '  x-border-b-2 ' : ''}`} onClick={() => setActiveTab(SelectDom.Node)}>节点属性</h2>}
            {showDom == SelectDom.Edge && <h2 className={`x-h-10 -x-mb-1 x-flex-1 x-flex x-items-center x-justify-center x-cursor-pointer  x-box-border  x-border-blue-400   ${activeTab == SelectDom.Edge ? '  x-border-b-2  ' : ''}`} onClick={() => setActiveTab(SelectDom.Edge)}>连接线属性</h2>}
            <h2 className={`x-h-10 -x-mb-1 x-flex-1 x-flex x-items-center x-justify-center x-cursor-pointer  x-box-border  x-border-blue-400  ${activeTab == SelectDom.Flow ? ' x-border-b-2 ' : ''}`} onClick={() => setActiveTab(SelectDom.Flow)}>流程属性</h2>
        </div>
        <div className=" x-flex-1 x-box-border x-p-2 x-w-full x-flex x-flex-col x-gap-y-2 x-overflow-y-auto">
            {activeTab == SelectDom.Node && <SetterRender objName="节点" obj={nodeSelected} updateObj={(node: any) => {
                updateNode(nodeSelected?.id!, { data: node.data })
                setNodeSelected(node)
            }} />}
            {activeTab == SelectDom.Edge && <SetterRender objName="连接线" obj={edgeSelected} updateObj={(edge: any) => {
                const label = edge.data?.label || edge.data?.title
                updateEdge(edgeSelected?.id!, 
                    { 
                        data: edge.data ,
                        label: label ? {
                            attrs: {
                                text: {
                                  text: label,
                                  fill: edgeMeta.color,
                                },
                              },
                        }: null
                    })
                setEdgeSelected(edge)
            }} />}
            {activeTab == SelectDom.Flow && <SetterRender objName="流程" obj={flow} updateObj={(flow: any) => {
                console.log('flow', flow)
                setFlow(prev => ({ ...prev, id: prev?.id || "", data: { ...prev?.data || {}, ...flow.data } }))
                delete flow.data.edges
                delete flow.data.nodes
                delete flow.data.props
                setFlowData({ ...flow.data })
            }} />}
        </div>
    </div>
}

export default Setter;
export * from './components';
export * from './setterRegistry';