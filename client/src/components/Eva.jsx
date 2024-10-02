import React,{ useState } from 'react';
import { Button, Modal,Radio,Image,Input,Result   } from 'antd';
import { one, two, three } from '../assets';

const Eva = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { TextArea } = Input;
  const showModal = () => {
    setOpen(true);
  };
  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
  }

  async function sendPostRequest(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Success:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  const handleOk = async () => {
    setLoading(true);
    console.log(value);
    console.log(suggestion);
  
    try {
      await sendPostRequest('http://gpuserver.di.uminho.pt:36122/llam3-8b/eva', { value, suggestion });
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 500);
    } catch (error) {
      console.error('Error sending POST request:', error);
      setLoading(false);
    }
  };


  const handleCancel = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ backgroundColor: '#1677FF', borderColor: '#d9d9d9' }} >
        Feedback here ❤
      </Button>
      <Modal
        open={open}
        title={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              Does the RAG system give you a better answer?
            </div>
          }
        width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk} style={{ backgroundColor: '#1677FF'}}>
              Submit
            </Button>,
          ]}
      >
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Radio.Group onChange={handleChange} >
            <Radio value="not_at_all">
                <div className='flex flex-col'>
                    <Image
                        preview={false}
                        width={75}
                        src={one}
                    />
                    <span className='text-center'>Not at all</span>
                </div>
            </Radio>
            <Radio value="helpful"><div className='flex flex-col'>
                    <Image
                    preview={false}
                        width={75}
                        src={two}
                    />
                    <span className='text-center'>Helpful</span>
                </div></Radio>
            <Radio value="satisfied"><div className='flex flex-col'>
                    <Image
                    preview={false}
                        width={75}
                        src={three}
                    />
                    <span className='text-center'>Satisfied</span>
                </div></Radio>
          </Radio.Group>
        </div>
        <br/>
        <TextArea
            showCount
            onChange={handleSuggestionChange}
            maxLength={100}
            placeholder="Improvement suggestions and comments (optional)"
            style={{height: 120, resize: 'none',marginBottom: 10 }}
            />
        {/* <Result
        visible={resultVisible}
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
        //   <Button key="buy">Buy Again</Button>,
        ]}
        onClose={() => setResultVisible(false)}
      /> */}
      </Modal>
      
      
    </>
  );
};

export default Eva
