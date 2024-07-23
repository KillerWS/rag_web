//import React from 'react'

import './App.css'
import MySplitComponent from "./components/MySplitComponent"
import { BrowserRouter, Route, Routes, } from "react-router-dom";
const App = () => {
  return (
    <main>
        <BrowserRouter>
          <Routes>
          <Route path="/*" exact element={<MySplitComponent code='v2'/>}></Route>
            {/* <Route path="/v1" exact element={<MySplitComponent code='v1'/>}></Route> */}
            <Route path="/v2" element={<MySplitComponent code='v2'/>} />
            <Route path="/v1/:modelNum" element={<MySplitComponent code='v1'/>} />
            <Route path="/v2/:modelNum" element={<MySplitComponent code='v2'/>} />
          </Routes>
       </BrowserRouter>     
            
         {/* <div className="app">
                <MySplitComponent/>
            </div> */}

    </main>
  )
}

export default App
