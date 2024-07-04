import {Setter} from  "./setter"
export interface ObjectMetaProps {
    name: string
    title: string
    setter: string | Setter
    propType?: string
    defaultValue?: string | any
}


export interface ObjectData {
    id: string;
    data: any;
}