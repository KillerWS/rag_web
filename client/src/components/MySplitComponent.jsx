import React, { useState } from 'react'
import ChatArea from './ChatArea';
import ParamsArea from './ParamsArea';
const MySplitComponent = ({code}) => {

    //初始的模型
    const [curModelInfo, setCurModelInfo] = useState({model:"", personality:""})
    
    //截止0412号版本禁用了参数调整接口，所以此state没有使用
    const [modelParams, setModelParams] = useState({
      //参数默认值
      "top_p":0.75, "temperature":0.9,"system_prompt":''
    })

    

  return (
     <div className="flex">
        {/* Parms Area - Left side  */}
        <ParamsArea curModelInfo={curModelInfo} setCurModelInfo={setCurModelInfo} versionCode={code} setModelParams={setModelParams}/>
        {/* Chat Area - Right side  */}
        <ChatArea curModelInfo={curModelInfo} modelParams={modelParams}/>
     </div>
    
 
  );
};

export default MySplitComponent;
