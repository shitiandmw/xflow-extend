export default {
    title: "抄送节点",
    category: "节点",
    props: [
        {
            name: "label",
            title: "标题",
            propType: "string",
            setter: "StringSetter",
            defaultValue: "抄送节点"
        },
        {
            name: "auditor",
            title:"抄送人",
            propType: "object",
            setter: "AuditorSetter",
        },
    ]
}