import { createContext,useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

export const AuthContext = createContext();
// import configData from "../config.json";
// const  SERVER_URL = configData.SERVER_URL;

export const AuthProvider = ({ children }) => 
{
    const navigate = useNavigate();
    
    const [onDataChange, setOnDataChange]=useState(true);

  
    const [current_user, setCurrentUser]  = useState(null);
    const [loading, setLoading] = useState(true);

   
    function something_went_wrong()
      {Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong",
      })}

      // USER REGISTRATION
      const register = (email,username,image_url,bio, password) => {

        fetch(`/api/signup`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email, username,image_url,bio, password
          })
          })
          .then((res)=> res.json())
          .then((response)=>{
            if (response.success) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Account created successfully',
                  showConfirmButton: false,
                  timer: 3000
                })
                setOnDataChange(!onDataChange);
                navigate("/login")
            }
          
            else if(response.error)
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.error,
              })

            } 
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong while saving!",
              })
            }
          })
        }
    
    // LOGIN
    const login = (email_username, password) => {

      fetch(`/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email_username,password })
        })
        .then(r => r.json())
        .then((response)=>{
          if(response.error)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.error,
            })
          }
          
          else if(response.email ) 
          {             
            setCurrentUser(response)  
            navigate("/")
            setOnDataChange(!onDataChange);
            Swal.fire({'icon':'success','timer':3000,'text':'Loggedin Successfully!',"confirmButtonColor": '#088F8F',
            'title':"Success", })   
          } 
          
          else
          {

          something_went_wrong()
          }
            
          
      })

       
    };



  //   // RESET PASSWORD USER
  //   const sendPassword = (email) => {
  //     toast.loading("Loading!")

  //     fetch(`/users/sendpassword`, {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json"
  //       },
  //     body: JSON.stringify({email})
  //     })
  //     .then((response)=> response.json() )
  //     .then((response)=>{
  //       console.log("pppop ", response)

  //          if(response.success) 
  //           {
  //             toast.dismiss();
  //             navigate("/login");
  //             toast.success(response.success)
  //           }
  //           else if(response.email_error) 
  //           {
  //             toast.dismiss();
  //             toast.error(response.email_error)
  //           }
  //           else if(response.error) 
  //           {
  //             toast.dismiss();
  //             toast.error(response.error)
  //           }
  //           else{
  //              toast.dismiss();
  //              toast.error("Something went wrong!!")
  //           }
  //       })
  //     .catch(()=>
  //       {
  //         toast.dismiss();
  //         toast.error("Something went wrong!!")
  //       })
  //   }


  //   // UPDATE PASSWORD from Profile section
  //   const updatePassword = (oldpassword, newpassword) => {
  
  //     fetch(`/users/updatepassword`, {
  //     method: "PATCH",
  //     headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authTokens.access}`
  //       },
  //     body: JSON.stringify({oldpassword, newpassword})
  //     })
  //     .then((response)=> response.json() )
  //     .then((response)=>{
  //          if(response.success) 
  //           {              
  //             oast.success(response.success + " Login again to access your account"), 1000);
  //             logout()   
  //           }
  //           else if(response.email_error) 
  //           {
  //             toast.error(response.email_error)
  //           }
  //           else if(response.password_error) 
  //           {
  //             toast.error(response.password_error)
  //           }
  //           else if(response.detail)
  //           {
  //             toast.warning("Session expired!"), 1000)           
  //             logout()
  //           }
  //           else{
  //              toast.error("Something went wrong!!")
  //           }
  //       })
  //     .catch(()=>
  //       {
  //         toast.error("Something went wrong!!")
  //       })
  //   }
    

  //    // UPDATE USERNAME from Profile section
  //    const updateUsername = (username) => {
  
  //     fetch(`/user/updateusername`, {
  //     method: "PATCH",
  //     headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authTokens.access}`
  //       },
  //     body: JSON.stringify({username})
  //     })
  //     .then((response)=> response.json() )
  //     .then((response)=>{
  //          if(response.success) 
  //           {        
  //             setOnDataChange(!onDataChange)      
  //             oast.success(response.success), 1000);
  //           }
  //           else if(response.error) 
  //           {
  //             toast.error(response.error)
  //           }
  //           else if(response.detail)
  //           {
  //             toast.warning("Session expired!"), 1000)           
  //             logout()
  //           }
  //           else{
  //              toast.error("Something went wrong!!")
  //           }
  //       })
  //     .catch(()=>
  //       {
  //         toast.error("Something went wrong!!")
  //       })
  //   }


    // LOGOUT USER
    const logout = () => 
    {
      fetch(`/api/logout`, {
        method: "DELETE"
        })
        .then((response)=>{
          console.log("response ", response.ok)
          if(response.ok)
          {
            setCurrentUser(null)
            setOnDataChange(!onDataChange);
            navigate("/")
            Swal.fire({'icon':'success','timer':3000,'text':'Logout Successfully!',"confirmButtonColor": '#088F8F',
            'title':"Success", }) 
            
          }
                    
          else
          {
           something_went_wrong()
          }
        })


    };

    // GET AUTHENTICATED USER
      useEffect(()=>
      {
         fetch(`/api/current_user`, {
         method: "GET",
         headers: {
             Accept: 'application/json'
             }
         })
         .then((response)=> response.json() )
         .then((response)=>{
          console.log("Curre ",response.email)

              if(response.email) 
               {
                 setCurrentUser(response)

               }
               else{
                setCurrentUser(null)
               }
           })
         .catch(()=>
           {
            something_went_wrong()

          })
        
    }, [loading,onDataChange])

    
    
    // CONTEXT DATA
    const contextData = 
    {
        register,
        login,
        current_user,
        logout
    };  
    
  

    


    return (
      <>
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
      </>
    )

}