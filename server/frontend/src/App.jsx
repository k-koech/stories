import './App.css'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Layout from './layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Favourites from './pages/Favourites'
import Story from './pages/Story'
import { AuthProvider } from './context/AuthContext'
import { BooksProvider } from './context/BooksContext'
import AddBook from './pages/AddBook'
import { PrivateRoute } from './components/PrivateRoute'
import Updatepassword from './pages/Updatepassword'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <BooksProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/updatepassword" element={<Updatepassword/>} />

        <Route path="/addbook" element={<PrivateRoute><AddBook/></PrivateRoute>} />
        <Route path="/story/:id" element={<PrivateRoute><Story/></PrivateRoute>} />
        <Route path="/favourites" element={<PrivateRoute><Favourites/></PrivateRoute>} />

      </Route>
      </Routes>
      </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
