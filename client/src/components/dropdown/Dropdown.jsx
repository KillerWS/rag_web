import React, { useState } from 'react';
import './Dropdown.css'; // 样式文件
import { Link } from 'react-router-dom';

const Dropdown = ({ title, curModelInfo, modelList, personalities, onSelect, version }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleDropdown = () => {
    if(curModelInfo?.model == ''){
      alert("请先选择模型种类")
      
    }else{
      setIsOpen(!isOpen);
    }
    
  };
  
  const handleOptionClick = (option) => {
    
    onSelect(option, "model");
    setIsOpen(false);
    //navigate(`/${version}/${selectedOption}`); // 使用编程式导航跳转
  };

  const handleTypeClick = (option) => {
    
      onSelect(option, "personality");
      setIsOpen(false);
  
    
  };
  
  return (
    <div className="w-full relative">
    <button
      className="w-full px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline"
      onClick={toggleDropdown}
      type='button'
    >
      {title} 
    </button>
    {isOpen && (
        <ul className="py-1 w-full absolute mt-2 rounded-md shadow-lg bg-white z-50">
          {modelList?.map((option, index) => (
                     <li key={index} 
                     onClick={() => handleOptionClick(Object.keys(option))}
                     className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition duration-150 ease-in-out"
                     >
               {/* <Link to={`/${version}/${option.toLowerCase()}`}>{Object.keys(option)}</Link>  */}
              {/* <Link to={`/${version}/${Object.keys(option)}`}>{Object.values(option)[0][0]}: {Object.keys(option)}</Link>  */}
              {/* {Object.values(option)[0][0]}: {Object.keys(option)} */}
              {Object.values(option)[0][0]}: {Object.keys(option)}
            </li>
          ))}

          {personalities?.map((option, index) => (
                     <li key={index} 
                     onClick={() => handleTypeClick(option)}
                     className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition duration-150 ease-in-out"
                     >
               
              <Link to={`/${version}/${curModelInfo?.model}/${matchTypeMap(option)}`}>{option}</Link> 
                
            </li>
          ))}

        </ul>
      
    )}
  </div>

  );
};

export default Dropdown;