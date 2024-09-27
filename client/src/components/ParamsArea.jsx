import React, { useEffect, useState } from 'react';
import Dropdown from './dropdown/Dropdown'
import { Link } from 'react-router-dom';
import { sendSystemPrompt } from '../services/messages';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Button, Modal } from 'antd';

const ParamsArea = ({curModelInfo, setCurModelInfo, versionCode, setModelParams}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const { Dragger } = Upload;
  const props = {
    name: 'file',
    multiple: true,
    action: 'http://gpuserver.di.uminho.pt:36122/upload', // 修改为Flask服务器的UR
    beforeUpload(file) {
      //限制.txt和.pdf
      const isTxtOrPdf = file.type === 'text/plain' || file.type === 'application/pdf';
      if (!isTxtOrPdf) {
        message.error('You can only upload .txt or .pdf files!');
        return Upload.LIST_IGNORE;
      }
      //限制2M之内
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('File must be smaller than 2MB!');
        return Upload.LIST_IGNORE;
      }
      return isTxtOrPdf && isLt2M;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onError(err) {
      message.error(`File upload failed: ${err.message}`);
    },
    
  };
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
                        {"abab5.5-chat":["MiniMax", "minimax"]}, 
                        {"Meta-llama3:8b":["llama3:8b", "llama3:8b"]} ]
  
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

  const showModal = () => {
    setOpen(true);
  };

 

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <div className="flex-none w-1/4 bg-gray-100 p-4 border-r-2">
        {/* <form className="flex flex-col" onSubmit={handleSubmit}> */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className='p-4 my-4 text-lg font-semibold bg-green-500 w-full rounded text-center'>
            <p className='my-4'>Click to select model and type parameters</p>
            <div className="flex justify-between gap-6">
              <Dropdown title={"Select Model"} modelList={model_list2} onSelect={handleSelect} version={versionCode}/>
            </div>
            
           
              <div className="mt-4 p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  Current Model: {curModelInfo.model ? curModelInfo.model:'No model'}
                </h5>
              </div>
          </div>
          
            {/* 上传pdf */}
           <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Supports single upload. Please upload your .txt or pdf file
            </p>
          </Dragger>
          
          <Button type="primary" onClick={showModal}>
            Show knowledge base
          </Button>
          <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
          

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