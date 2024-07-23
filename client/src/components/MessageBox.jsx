import React, { useEffect, useState, useRef } from 'react'
import MessageCard from './messageCard/MessageCard'

const MessageBox = ({messages}) => {
    const [allMsg, setAllMsg] = useState([]);
    const messagesEndRef = useRef(null);


    useEffect(()=>{
      setAllMsg(messages)
      // 滚动到底部
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    }, [messages]);

  
  return (
    <div className="flex-1 bg-gray-100 p-1 overflow-y-auto" ref={messagesEndRef}>
      {allMsg.map((message)=>(
        <MessageCard message={message.text} key={message.id} fromUser ={message.fromUser}/>
    ))}
  
    </div>   
     
  )
}

export default MessageBox