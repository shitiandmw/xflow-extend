import React from "react";

const NodeWarpper = (Component: React.FC) => {
    return ({ node }: any) => {
        const props = node?.getData();
        return <Component {...props} isCanvas={true} />
    }
}

export {NodeWarpper};