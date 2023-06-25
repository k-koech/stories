import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() 
{
  const {login} = useContext(AuthContext)

  const [email_username, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) 
  {
    e.preventDefault();
    
    
      setIsLoading(true);
      login(email_username, password)
    
  }
  return (
    <div className='min-h-[80vh] flex items-center'>
        
        <div className='container mx-auto grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3'>
            <div ></div>

        <form onSubmit={handleSubmit} className='sm:col-span-2 lg:col-span-1 mx-5 mx-10 md:mx-0 p-10 bg-gray-100 rounded-lg'>
        <h1 className='my-5 text-center font-bold text-md sm:text-3xl'>Login</h1>
            <div className="relative z-0 w-full mb-6 mt-6 group">
                <input type="text" value={email_username} onChange={(e) => setEmailUsername(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email / Username</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Signin</button>
            <div className='my-3'>
              Not registered?
              <Link to="/register" className='text-green-500 hover:text-green-700'> Register</Link>
            </div>
        </form>

        <div></div>
    </div>

    </div>
  )
}
