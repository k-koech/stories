import './App.css'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Layout from './layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Favourites from './pages/Favourites'
import Stories from './pages/Stories'
import Story from './pages/Story'
import { AuthProvider } from './context/AuthContext'
import { BooksProvider } from './context/BooksContext'
import AddBook from './pages/AddBook'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <BooksProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/addbook" element={<AddBook/>} />

        <Route path="/stories" element={<Stories/>} />
        <Route path="/story/:id" element={<Story/>} />

        <Route path="/favourites" element={<Favourites/>} />

      </Route>
      </Routes>
      </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
