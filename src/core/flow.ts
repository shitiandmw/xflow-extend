import { FLowMeta, FLowMetaData, ObjectMetaProps } from "./types";
import { eventEmitter } from './events';

let Meta: FLowMeta = {
    data: {
        allowRevoke: true,
        repeatApprove: true,
        allowComment: true,
        approveType: {
            type: 1,
            viewParentComment: true,
        },
        nodes: [],
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
};

const createHandler = (): ProxyHandler<any> => ({
    set(target, prop, value) {
        target[prop] = value;
        eventEmitter.emit('dataChanged', target);
        return true;
    }
});

let proxyMetaData = new Proxy(Meta.data, createHandler());

export function getFlowData() {
    return proxyMetaData;
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
        data = data(proxyMetaData);
    }
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            proxyMetaData[key] = data[key as keyof FLowMetaData];
        }
    }
    eventEmitter.emit('reloadFlow', {});
}

export function setFlowDataByName(name: keyof typeof Meta.data, value: any) {
    proxyMetaData[name] = value;
}

export function registerDataChangeHandler(handler: (data: FLowMetaData) => void) {
    eventEmitter.on('dataChanged', handler);
}

export function unregisterDataChangeHandler(handler: (data: FLowMetaData) => void) {
    eventEmitter.off('dataChanged', handler);
}
