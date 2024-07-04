import './App.css'
import XFlowExtend, { registerSetter, registerNode, setEdgeMeta, setEdgeProps } from './core'
import { StringSetter, BooleanSetter, RadioGroupSetter } from './core/setter'
import { CcNode, CcNodeMeta } from "./core/node";
import { AudioNode, AudioNodeMeta } from "./core/node";
import { EndNode, EndNodeMeta } from "./core/node";
import React, { useEffect } from 'react';
import { setFlowProps } from './core';


// 注册自定义的节点
// registerNode("AudioNode", AudioNode, AudioNodeMeta, { width:200, height:100 })
registerNode("AudioNode", AudioNode, AudioNodeMeta)
registerNode("CcNode", CcNode, CcNodeMeta)
registerNode("EndNode", EndNode, EndNodeMeta)
 
// 注册自定义的设置器
registerSetter("StringSetter", StringSetter)
registerSetter("BooleanSetter", BooleanSetter)
registerSetter("RadioGroupSetter", RadioGroupSetter)

// 设置连接线的颜色
setEdgeMeta({ color: '#000000' })
// 设置连接线属性
setEdgeProps(prev => {
  return [...prev,
  {
    name: "demo",
    title: "测试新增的连接线属性",
    setter: "StringSetter"
  }] 
})
// 设置流程属性
setFlowProps(prev => {
  return [...prev,
  {
    name: "demo",
    title: "测试新增的流程属性",
    setter: "StringSetter"
  }]
})


type FlowRefType = {
  getFlowData: () => any;
  setFlowData: (data: any) => void;
};
const App = () => {
  useEffect(() => {
  }, [])
  const flowRef = React.useRef<FlowRefType>();
  const getFlowData = () => {
    const flowData = flowRef.current?.getFlowData()
    localStorage.setItem('flowData', JSON.stringify(flowData))
    console.log('获取数据', flowData)
  }
  const setFlowData = () => {
    const flowData = JSON.parse(localStorage.getItem('flowData') || '{}')
    flowRef.current?.setFlowData(flowData)
    console.log('设置数据', flowData)
  }
  return <div className='x-w-screen x-h-screen x-bg-gray-400 x-flex x-justify-center x-items-center x-flex-col x-gap-4'>
    <div className='x-w-[1200px] x-h-16 x-border x-rounded-lg x-bg-white x-flex x-items-center x-px-4 x-gap-2'>
      <div onClick={getFlowData} className=' x-rounded x-border x-bg-blue-500  x-text-gray-50 x-p-4 x-w-32 x-h-10 x-cursor-pointer x-flex x-justify-center x-items-center '>
        获取数据
      </div>
      <div onClick={setFlowData} className=' x-rounded x-border x-bg-green-500  x-text-gray-50 x-p-4 x-w-32 x-h-10 x-cursor-pointer x-flex x-justify-center x-items-center '>
        设置数据
      </div>
    </div>

    <div className='x-w-[1200px] x-h-[800px] x-border x-rounded-lg x-bg-white'>

      <XFlowExtend ref={flowRef} />
    </div>
  </div>
}

export default App
