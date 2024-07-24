import * as api from '../api'

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
export const getMessages =async(modelInfo, data)=>{
    // to do: 写一个根据模型名字映射成路由的函数
    console.log(modelInfo.model)
    try {
        
        const resData = await api.fetchMessages(modelInfo.model, matchTypeMap(modelInfo.personality), data);
        //const resData = await api.testApi();
        console.log(resData)
        return JSON.stringify(resData.data) 
    } catch (error) {
        console.log(error)
        return JSON.stringify({message:error.message}) 
    }
}

export const sendSystemPrompt = async(model, data)=>{

    try {
        console.log(`前段传过来的数据: `)
        console.log(data)
        const resData = await api.sendSystemPrompt(model,data);
        //const resData = await api.testApi();

        return JSON.stringify(resData.data) 
    } catch (error) {
        console.log(error)
        return JSON.stringify({message:error.message}) 
    }
}