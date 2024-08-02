import React, { useEffect, useState } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Button, Modal } from 'antd';

const MessageCard = ({message, fromUser}) => {
    const { Meta } = Card;

    const [msg, setMsg] = useState({text:"", isFromUser:true});

    useEffect(()=>{
        setMsg({text:message, isFromUser:fromUser})
        // console.log(fromUser)
        // console.log(message)

    }, [])

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000)
    }


    if(fromUser){
        return (
            <div className="flex flex-col space-y-2">
         <div className="flex items-center justify-end gap-1">
         <div className="bg-blue-500 text-white text-base rounded-lg p-2 max-w-xs">
            {msg.text}
         </div>
        <img className="w-8 h-8 rounded-full mr-2" src="https://via.placeholder.com/50" alt="User" />
            
        </div>
        </div>  
        // <div className="flex flex-col space-y-2">



        //     <div className="flex items-center justify-end gap-1"> 
        //                 <div className="w-72 p-0">
        //         <div className="text-black text-base rounded-lg break-words whitespace-pre-wrap ">
        //             {msg.text}
        //         </div>
        //         <img className="w-8 h-8 rounded-full mr-2" src="https://via.placeholder.com/50" alt="User" />
        //         </div>
        //         </div>
        //     </div>
    
        )
    }else{
        return (
            <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-1">
                <img className="w-8 h-8 rounded-full ml-2" src="https://via.placeholder.com/50" alt="User" />
                {/* <div className="bg-gray-300 text-gray-800 rounded-lg p-2 max-w-xs">{msg.text}</div> */}
                <Card className="w-72 p-0"
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                  ]}>
                <div className="text-black text-base rounded-lg break-words whitespace-pre-wrap ">
                    {msg.text}
                </div>
                </Card>
            </div>
            </div>
        )
            
            
    }
}

export default MessageCard