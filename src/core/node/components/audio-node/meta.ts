export default {
    title: "审核节点",
    category: "节点",
    props: [
        {
            name: "label",
            title: "标题",
            propType: "string",
            setter: "StringSetter",
            defaultValue: "审核节点"
        },
        {
            name: "auditor",
            title:"审核人",
            propType: "object",
            setter: "AuditorSetter",
        },
        {
            name: "condition",
            title: "存在多个审批人时审批方式",
            propType: "string",
            defaultValue: "1",
            setter:{
                name: "RadioGroupSetter",   
                props:{
                    options: [
                        {
                            label: "并行会签，可同时处理（需所有人同意）",
                            value: "1"
                        },
                        {
                            label: "顺序会签，按匹配顺序依次审批（需所有人同意）",
                            value: "2"
                        },
                        {
                            label: "或签（只要有一个人同意即可）",
                            value: "3"
                        }
                    ]
                }
            },
        },
        {
            name: "showOtherOpinion",
            title: "允许查看其他人的审批意见",
            propType: "boolean",
            defaultValue: false,
            setter: "BooleanSetter"
        },
        {
            name: "timeout",
            title: "节点超时提醒",
            propType: "object",
            setter: "TimeoutSetter",
        },

    ]
}