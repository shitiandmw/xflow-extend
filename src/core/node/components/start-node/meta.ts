export default {
    title: "开始节点",
    category: "节点",
    props: [
        {
            name: "label",
            title: "标题",
            propType: "string",
            setter: "StringSetter",
            defaultValue: "开始节点"
        },
        {
            name: "desc",
            title: "说明",
            propType: "object",
            setter: {
                name: "DescSetter",
                props: {
                    editable: false,
                    content: "标志流程开始的节点，通常作为第一个节点出现。"
                }
            }
        },

    ]
}