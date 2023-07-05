import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children}) => 
{
  const {current_user} = useContext(AuthContext)

    const nav = useNavigate()
        
 

    useEffect(() => {

      if(current_user==null)
      {
         nav("/login")
      } 
      // else
      // {
      //   return children
      // }
       

      
    },[])
    
    if (current_user ) {
      return children
    }
  
      
}