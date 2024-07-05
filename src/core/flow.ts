import { FLowMeta, FLowMetaData, ObjectMetaProps } from "./types";
import { eventEmitter } from './events'
// import {getNode} from './node'
let Meta: FLowMeta = {
    data: {
        // 允许撤回
        allowRevoke: true,
        // 重复审批人允许自动通过
        repeatApprove: true,
        // 允许评论
        allowComment: true,
        // 审批方式
        approveType: {
            type: 1,
            // 允许查看上级节点审批意见
            viewParentComment: true,
        },
        // 节点数据
        nodes: [],
        // 连接线数据
        edges: [],
    },
    props: [
        {
            name: "allowRevoke",
            title: "允许撤回",
            propType: "boolean",
            setter: "BooleanSetter",
            defaultValue: true
        },
        {
            name: "repeatApprove",
            title: "重复审批人自动通过",
            propType: "boolean",
            setter: "BooleanSetter",
            defaultValue: true
        },
        {
            name: "allowComment",
            title: "允许评论",
            propType: "boolean",
            setter: "BooleanSetter",
            defaultValue: true
        },
        // {
        //     name: "approveType",
        //     title: "审批方式",
        //     propType: "object",
        //     setter: "ApproveTypeSetter",
        //     defaultValue: {
        //         type: 1,
        //         viewParentComment: true,
        //     }
        // }
    ],
}

export function getFlowData() {
    return Meta.data;
}

export function getFlowProps() {
    return Meta.props;
}

export function setFlowProps(
    newProps: Array<ObjectMetaProps> | ((prev: Array<ObjectMetaProps>) => Array<ObjectMetaProps>)
) {
    const updatedProps = typeof newProps === 'function' ? newProps(Meta.props) : newProps;
    Meta.props = updatedProps.reduce((acc, prop) => {
        const index = acc.findIndex(item => item.name === prop.name);
        if (index !== -1) {
            acc[index] = prop;
        } else {
            acc.push(prop);
        }
        return acc;
    }, [...Meta.props]);
    eventEmitter.emit('reloadFlow', {});
}


export function setFlowData(data: FLowMetaData | ((prev: FLowMetaData) => FLowMetaData)) {
    if (typeof data === 'function') {
        data = data(Meta.data);
    }
    Meta.data = { ...Meta.data, ...data };
   
    eventEmitter.emit('reloadFLow', {})
}

export function setFlowDataByName(name: keyof typeof Meta.data, value: any) {
    Meta.data[name] = value;
}
