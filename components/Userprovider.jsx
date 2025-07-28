import React, { useEffect, useState } from "react";
import usercontext from "./userContext";
import login from "../pages/login";
import { getcurrentuserdetail, isloggedIn } from "../auth";
function Userprovider({children}) {
   
   const [user,setuser]=useState({
            data: {},
            login: false
        })
        useEffect(()=>{
            setuser({
                data:getcurrentuserdetail(),
                login:isloggedIn()
            })
        },[])
       
    return (

       
        <UserContext.provider value={{ user,setuser}}>
          {children}
        </UserContext.provider>
    )
}

export default Userprovider