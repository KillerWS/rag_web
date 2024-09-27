import React, { useEffect, useState } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Drawer , Card, Image,Divider, Modal,Descriptions   } from 'antd';
// import PdfViewer from './PDFViewer';
// // Core viewer
// import { Viewer } from '@react-pdf-viewer/core';
// // Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// // Import styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// // Create new plugin instance
// const defaultLayoutPluginInstance = defaultLayoutPlugin();

const MessageCard = ({message, fromUser, source, image_data, eva_result}) => {
    const { Meta } = Card;
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [sourceData, setSourceData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showDrawer = () => {
      setOpen(true);
    };
    const showModal = () => {
      setOpen1(true);
    };
  
   
  
    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setTimeout(() => {
        setOpen1(false);
      }, 2000);
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen1(false);
    };
    const onClose = () => {
      setOpen(false);
    };
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
                <Drawer title=" Source documents" onClose={onClose} open={open}>
                            {source && source?.map((item, index) => (
                                <div key={index}>
                                {/* <p>{doc.page_content}</p> */}
                                 {/* <List.Item>
                                 <List.Item.Meta
                                   title={<a href="https://ant.design">{index}</a>}
                                   description={item.page_content}
                                 />
                               </List.Item> */}
                               <Divider orientation="left">{`Source ${index}`}</Divider>
                               <p>{item.page_content}</p>
                               </div>
                        ))}
                        
                
                </Drawer>
                <Card className="w-72 p-0"
                actions={[
                    <SettingOutlined key="setting" onClick={showDrawer}/>,
                    <EditOutlined key="edit" onClick={() => setVisible(true)}/>,
                    <EllipsisOutlined key="ellipsis" onClick={() => showModal()}/>,
                  ]}>
                <div className="text-black text-base rounded-lg break-words whitespace-pre-wrap ">
                    {msg.text}
                </div>
                </Card>
                <Modal
                  title="Title"
                  open={open1}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  {/* <Card title="数据详情" style={{ width: 300 }}> */}
                    <Descriptions title="Evaluate Result" column={1}>
                      <Descriptions.Item label="Answer_relevancy">{eva_result?.answer_relevancy}</Descriptions.Item>
                      <Descriptions.Item label="Context_relevancy">{eva_result?.context_relevancy}</Descriptions.Item>
                      <Descriptions.Item label="Faithfulness">{eva_result?.faithfulness}</Descriptions.Item>
                    </Descriptions>
                 {/* </Card>
                   {eva_result} */}
                </Modal>  
                <Image
                  width={200}
                                style={{ display: 'none' }}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                preview={{
                                    visible,
                                    src : `data:image/png;base64,${image_data}`,
                                    onVisibleChange: (value) => {
                                      setVisible(value);
                                    },
                    }}
                    />

                {/* <Viewer
                fileUrl='/assets/pdf-open-parameters.pdf'
                plugins={[
                    // Register plugins
                    defaultLayoutPluginInstance,
                ]}
                /> */}
                    
            </div>
            </div>
        )
            
            
    }
}

export default MessageCard