import { EdgeOptions, NodeOptions } from '@antv/xflow';
import { ObjectMetaProps } from './object';
export interface FLowMetaData {
    // 允许撤回
    allowRevoke?: boolean;
    // 重复审批人允许自动通过
    repeatApprove?: boolean;
    // 允许评论
    allowComment?: boolean;
    // 审批方式
    approveType?: {
        type: 1 | 2;
        // 允许查看上级节点审批意见
        viewParentComment: boolean;
    };
    // 节点数据
    nodes?: NodeOptions[];
    // 连接线数据
    edges?: EdgeOptions[];
}
export interface FLowMeta {
    data: FLowMetaData;
    props: Array<ObjectMetaProps>;
}