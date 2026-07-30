
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './Login'
import Register from './Register'
import MainPage from './MainPage'
import Store from './store'
import View from './View'

function App() {
 

  return (
    <>
  <Routes>
    <Route path='' element={<Login></Login>}></Route>
    <Route path='/Signup' element={<Register></Register>}></Route>
    <Route path='/Main' element={<MainPage></MainPage>}></Route>
    <Route path='/Store' element={<Store></Store>}></Route>
    <Route path='/View' element={<View></View>}></Route>
  </Routes>
    </>
  )
}

export default App
