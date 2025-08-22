import { Layout, Menu, Button, message, Tooltip, Skeleton } from "antd";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'  
import SideBar from './components/SideBar/SideBar'
import AppHeader from './components/AppHeader/AppHeader'
import { ConfigProvider } from 'antd' 
import './App.css'
import PageContent from "./components/PageContent/PageContent.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <ConfigProvider>
      <div className="App">
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<div>Homepage</div>} />
              <Route
                path="/*"
                element={
                    <>
                      <AppHeader />
                      <div className="sidebar-and-page-content">
                        <SideBar
                        ></SideBar>
                        <PageContent></PageContent>
                      </div>
                    </>
                  
                }
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>  
      </div>
    </ConfigProvider>
  )
}

export default App
