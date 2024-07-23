
import React, { useEffect, useState, useRef } from 'react'
import { arrow, clearIcon } from '../assets'
import MessageBox from './MessageBox';

import { getMessages } from '../services/messages';

const ChatArea = ({curModelInfo, modelParams}) => {
  
    const [allMessages, setAllMessages] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [clear, setClear] = useState(false);
    //const textAreaRef = useRef(null);

    useEffect(()=>{
      setAllMessages([])
      //console.log(curModel)
    }, [curModelInfo])

    // 用户输入的内容
    const [useInput, setUseInput] = useState('');
    const [rows, setRows] = useState(1);
    const handleInputChange = (event) => {
        setUseInput(event.target.value);
        const textareaRows = event.target.value.split('\n').length;
        setRows(textareaRows < 5 ? textareaRows : 5); // 设置最大行数为5行
    };
    
    
    const handleClear = ()=>{
      setAllMessages([])
      //setUseInput('')
      console.log(allMessages)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // 阻止默认的回车换行行为
          handleSubmit(e); // 提交表单
      }
  };

  //映射出要发送的人格类型
  const matchTypeMap=(input)=>{
    // 定义映射对象
    const typeMap = {
      'E人AI': 1,
      'I人AI': 2,
      '通用AI': 3,
    };
  
    // 检查输入字符串是否在映射对象中
    // 如果是，则返回映射的值；否则，返回null或其他默认值
    return typeMap[input] || null;
  }
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        //添加入用户的输入
        setAllMessages(prevMessages =>[...prevMessages, {
          id: allMessages.length,
          text: useInput,
          fromUser: true,
        }])
        
        //清除当前用户输入
        setUseInput('')
        
        

        const response = await getMessages(curModelInfo, {"query":useInput, "personalityType": matchTypeMap(curModelInfo.personality),
        //暂时没用到其他参数
        "system_prompt":'', "top_p":modelParams.top_p, "temperature":modelParams.temperature});
        
        //const renderedData = JSON.parse(response)
        const renderedData = JSON.parse(response)
        console.log(renderedData)
        setAllMessages(prevMessages =>[...prevMessages, {
          id: allMessages.length+1,
          text: renderedData.data,
          fromUser: false ,
        }])
        
        // console.log(`后端模拟返回的数据： ${response}`)

    }
    
    

  return (
    <div className="flex flex-col p-4 w-full h-screen bg-white">
  {/* 标题 */}
  <div className="bg-gray-800 text-white my-3 py-4 text-center text-xl font-semibold rounded">Chat with {curModelInfo.model} {curModelInfo.personality}</div>
  
  {/* 聊天消息框 */}
  
  {/* flex-1：铺满剩余区域 */}
  <MessageBox messages={allMessages}/>
  
 
  
  {/* 回复消息输入框 */}
  <form className="bg-white flex flex-row gap-1" onSubmit={handleSubmit}>

    <button 
    className="bg-white mt-2 text-white rounded-md  hover:bg-gray-100 hover:text-gray-700 transition duration-300 ease-in-out" 
    onClick={handleClear}
    type="button"
    title='清空当前页面所有聊天'
  >
    <img src={clearIcon} alt="Send" className="inline-block h-12 mr-2" />
  </button>
  
    <textarea className="resize-none m-2 p-2 w-full border border-gray-300 rounded-md"
        rows={rows}
        //ref={textAreaRef}
        disabled={isDisabled}
        onChange={handleInputChange}
        value = {useInput}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        >
    </textarea>

    <button className="bg-white text-white rounded-md hover:bg-gray-100 hover:text-gray-700"
      // onClick={handleSubmit}
      type="submit">
      <img src={arrow} alt="Send" className="inline-block h-12 mr-2" />
    </button>
  </form>
</div>

  )
}

export default ChatArea