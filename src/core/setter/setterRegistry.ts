import React from "react";
import { Setter } from "../types";
import { DefaultSetter, SetterWapper } from "./components";


// setterRegistry.js
const setterRegistry: { [name: string]: React.FC<any> } = {};

export function registerSetter(name: string, component: React.FC<any>) {
    setterRegistry[name] = SetterWapper(component);
}

export function getSetter(name: string | Setter): React.FC<any> {
    if (typeof name === "string") {
        return setterRegistry[name] || SetterWapper(DefaultSetter);
    }
    else {
        return setterRegistry[name.name] || SetterWapper(DefaultSetter);
    }
}
