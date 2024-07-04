export interface Setter{
    name: string
    props: any
}

export interface SetterProps {
    name: string
    
}

export enum SelectDom {
    Flow = 'flow',
    Node = 'node',
    Edge = 'edge'
}