import React, { useEffect, useState } from 'react';
import Dropdown from './dropdown/Dropdown'
import { Link } from 'react-router-dom';
import { sendSystemPrompt } from '../services/messages';

const ParamsArea = ({curModelInfo, setCurModelInfo, versionCode, setModelParams}) => {
  const model_list1 = {
    "Qwen1.5-0.5B-Chat":"cuda:0",
    "Qwen1.5-0.5B-Chat-AWQ":"cuda:0",
    "Qwen1.5-0.5b-chat-GPTQ-Int4":"cuda:0",
    "Qwen1.5-1.8B-Chat":"cuda:0",
    "Qwen1.5-1.8B-Chat-AWQ":"cuda:1",
    "Qwen1.5-1.8B-Chat-GPTQ-Int4":"cuda:1",
    "Qwen1.5-4B-Chat":"cuda:7",
    "Qwen1.5-4B-Chat-AWQ":"cuda:1",
}
  const model_list2 = [ {"glm-3-turbo":["智谱AI", "zhipuai"]},
                        {"glm-4":["智谱AI", "zhipuai"]} , 
                        {"Baichuan2-53B":["百川","baichuan"]}, 
                        {"Baichuan2":["百川","baichuan"]},
                        {"abab5.5s-chat": ["MiniMax", "minimax"]},
                        {"abab5.5-chat":["MiniMax", "minimax"]} ]
  
  const personality_type = [
    'E人AI',
    'I人AI',
    '通用AI',
  ]


  const dataModels1 = Object.keys(model_list1)
  const dataModels2 = Object.keys(model_list2)
  const [selectedOption, setSelectedOption] = useState({model:"", personality:""});
  const [systemPrompt, setSystemPrompt] = useState('')
  const [modelFormParams, setModelFormParams] = useState({
    "top_p":0.75, "temperature":0.9,"system_prompt":''
    //默认的数据值
  })

  useEffect(()=>{
    console.log(curModelInfo)
    console.log(curModelInfo.model == '')
    console.log(curModelInfo.personality == '')
  },[curModelInfo])

  const handleSelect = async(option, type) => {
    
    console.log(`当前的option是: ${option}`)
    
    //invoke父组件函数
    if (type === 'model'){
      setCurModelInfo({...curModelInfo, model:option})
    }else if(type === 'personality'){
      setCurModelInfo({...curModelInfo, personality:option})
    }

    console.log(curModelInfo)
  
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // 阻止默认的回车换行行为
        handleSubmit(e); // 提交表单
    }
};

  const handleInputChange = (event) => {
    // 通过 event.target.value 获取输入框中的值，并更新状态
    setSystemPrompt(event.target.value);
  };
  

  const handleSubmit = async(e) =>{
    // 防止表单提交的默认行为
    e.preventDefault();
    console.log(`${modelFormParams.top_p}+'  '+ ${modelFormParams.temperature}`);
    console.log(`${systemPrompt}`);

    try {
      //query默认为空
      const data = await sendSystemPrompt(curModelInfo.model, {query:"", system_prompt:systemPrompt,  "top_p":parseFloat(modelFormParams.top_p), "temperature":parseFloat(modelFormParams.temperature)});
      setModelParams({
        "top_p": parseFloat(modelFormParams.top_p),
        "temperature": parseFloat(modelFormParams.temperature),
        "system_prompt": ''
     })
      setSystemPrompt('');
      console.log(`发送系统提示词成功,回复为:${data}`);
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="flex-none w-1/4 bg-gray-100 p-4 border-r-2">
        {/* <form className="flex flex-col" onSubmit={handleSubmit}> */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className='p-4 my-4 text-lg font-semibold bg-green-500 w-full rounded text-center'>
            <p className='my-4'>Click to select model and type parameters</p>
            <div className="flex justify-between gap-6">
              <Dropdown title={"选择模型种类"} modelList={model_list2} onSelect={handleSelect} version={versionCode}/>
            </div>
            
           
              <div className="mt-4 p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  当前模型: {curModelInfo.model ? curModelInfo.model:'未选择'}
                </h5>
              </div>
             
            
            {/* {selectedOption && <p className='mt-4'>当前模型: {selectedOption.model} + 当前人格：{selectedOption.personality} </p>}
           */}
          </div>
          
          
          {versionCode==='v2' &&
            <>
           <p className="text-sm font-semibold text-gray-700">
            <h1>Please contact the administrator to open the model parameter debugging interface</h1>
              </p>
          <div style={{ pointerEvents: 'none', opacity: 0.4 }}>
            
            <label htmlFor="top_p" className="text-sm font-semibold text-gray-700">
            top_p: <span className=' text-red-500'> {modelFormParams.top_p}</span>
            <input
              type="range"
              id="top_p"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none mt-1"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.75"
              //value = {modelFormParams.top_p}
              onChange={(e)=>setModelFormParams({
                ...modelFormParams, top_p:e.target.value
              })}
            />
          </label>
          <label htmlFor="temperature" className="text-sm font-semibold text-gray-700 mt-4">
            temperature:<span className=' text-red-500'> {modelFormParams.temperature}</span> 
            <input
              type="range"
              id="temperature"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none mt-1"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.9"
              //value = {modelFormParams.temperature}
              onChange={(e)=>setModelFormParams({
                ...modelFormParams, temperature:e.target.value
              })}
            />
          </label>
          <div className="mt-4 p-2 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">System Prompt (Only for chat mode)</p>
            <input
              type="text"
              value={systemPrompt}
              onChange={handleInputChange}
              placeholder="Answer with some emojis ONLY"
              className="mt-1 p-2 bg-gray-50 border rounded w-full"
            />
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            //onClick={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            Press ⌘ Submit to apply
          </button>
          </div> </>}
          
          <label htmlFor="top_p" className="text-sm font-semibold text-gray-700">
            <h1>Tips:</h1>
            <h2>1. Enter to send prompt words, Shift + Enter to change lines</h2>
            <h2>2. Click the icon on the left side of the input box to clear historical information</h2>
            <h2>3. Do not send prompt words too quickly</h2>
            <h2>4. The model parameter debugging interface is not open yet</h2>
            {/* <h2>5. The current default model memory dialogue round number is 4 </h2>
            ... */}
          </label>
        </form>
      </div>
  )
}

export default ParamsArea