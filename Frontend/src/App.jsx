
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './Login'
import Register from './Register'
import MainPage from './MainPage'
import Store from './store'
import View from './View'
import { createContext } from 'react'

export let UserContext=createContext();
function App() {

 let backend='https://khatabook-1l6z.onrender.com'

  return (
    <>
    <UserContext.Provider value={backend}>
  <Routes>
    <Route path='' element={<Login></Login>}></Route>
    <Route path='/Signup' element={<Register></Register>}></Route>
    <Route path='/Main' element={<MainPage></MainPage>}></Route>
    <Route path='/Store' element={<Store></Store>}></Route>
    <Route path='/View' element={<View></View>}></Route>
  </Routes>
  </UserContext.Provider>
    </>
  )
}

export default App

