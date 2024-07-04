import { EdgeMeta, ObjectMetaProps } from './types'
import { DAG_EDGE } from './consts'

const defaultEdgeMeta: EdgeMeta = {
    id: DAG_EDGE,
    color: '#5fcfad',  // '
    width: 1,
    props: [
        {
            name: "label",
            title: "连接线名称",
            propType: "string",
            setter: "StringSetter",
            defaultValue: ""
        },
        {
            name: "flowCondition",
            title: "流转条件",
            propType: "object",
            setter: "ConditionSetter",
            defaultValue: ""
        },
    ]
}

let edgeMeta: EdgeMeta = { ...defaultEdgeMeta }

export function getEdgeMeta(): EdgeMeta {
    return edgeMeta
}

interface setEdgeMetaParams {
    id?: string
    color?: string
    width?: number
    props?: Array<ObjectMetaProps>
}
export function setEdgeMeta(meta: setEdgeMetaParams | ((prev: EdgeMeta) => EdgeMeta)) {
    if (typeof meta === 'function') {
        meta = meta(edgeMeta)
    }
    edgeMeta = {
        ...edgeMeta,
        ...meta,
        props: edgeMeta.props || [],
    }
}

export function setEdgeProps(
    newProps: Array<ObjectMetaProps> | ((prev: Array<ObjectMetaProps>) => Array<ObjectMetaProps>)
) {
    const updatedProps = typeof newProps === 'function' ? newProps(edgeMeta.props||[]) : newProps;
    edgeMeta.props = updatedProps.reduce((acc, prop) => {
        const index = acc.findIndex(item => item.name === prop.name);
        if (index !== -1) {
            acc[index] = prop;
        } else {
            acc.push(prop);
        }
        return acc;
    }, [...(edgeMeta.props||[])]);
}
