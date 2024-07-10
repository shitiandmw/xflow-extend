export default {
    title: "结束节点",
    category: "节点",
    props: [
        {
            name: "label",
            title: "标题",
            propType: "string",
            setter: "StringSetter",
            defaultValue: "结束节点"
        },
        {
            name: "desc",
            title: "说明",
            propType: "object",
            setter: {
                name: "DescSetter",
                props: {
                    editable: false,
                    content: "标志流程结束的节点，通常作为最后一个节点出现。"
                }
            }
        },

    ]
}