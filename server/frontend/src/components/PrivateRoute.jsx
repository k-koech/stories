import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children}) => 
{
  const {current_user} = useContext(AuthContext)

    const nav = useNavigate()
        
    if (current_user ) {
      return children
    }

    useEffect(() => {

      if(current_user==null)
      {
        return nav("/login")
      } 
      return children

      
    },[])
  
      
}