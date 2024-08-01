import axios from 'axios'


//console.log(process.env.SERVER_ADDRESS)
// 'http://198.18.0.1:2001'
const TESTAPI = axios.create({baseURL:'https://shikimori.one/api'})

const API = axios.create({
    // baseURL: 'http://82.156.30.42:5001'
    // baseURL: 'http://127.0.0.1:5001'
    baseURL: 'http://gpuserver.di.uminho.pt:36122'
    // headers : {
    //     //Origin是一个安全头，报错：Refused to set unsafe header "Origin"
    //     'Origin': 'http://10.12.5.216:2001'
    // }
})
function matchModel(input) {
    // 定义映射对象
    const modelMap = {
      "Baichuan2-53B": "baichuan",
      "Baichuan2": "baichuan",
      "abab5.5-chat": "minimax",
      "abab5.5s-chat": "minimax",
      "glm-3-turbo": "zhipuai",
      "glm-4": "zhipuai",
      "Meta-llama3:8b": "llam3-8b"
    };
  
    // 检查输入字符串是否在映射对象中
    // 如果是，则返回映射的值；否则，返回null或其他默认值
    return modelMap[input] || null;
  }
  
const SYSTEMPROMPTAPI = axios.create({
    baseURL:'http://10.12.5.216:2001',
    // headers : {
    //     //Origin是一个安全头，报错：Refused to set unsafe header "Origin"
    //     'Origin': 'http://10.12.5.216:2001'
        
    // }
})

export const fetchMessages=(modelName,personality , data)=> API.post(`/${matchModel(modelName)}`, data, {
    headers:{
        'Content-Type': 'application/json'
    }
});

export const sendSystemPrompt=(model, data)=> API.post(`/${model}`, data, {
    headers:{
        'Content-Type': 'application/json'
    }
})

//测试用GET请求
export const testApi =()=>API.get("/testRoute")

