import React, { useContext, useEffect, useState } from "react";
import {Button, Card, CardBody, CardText } from "reactstrap";
import { getcurrentuserdetail, isloggedIn } from "./auth";
import usercontext from "./context/userContext";
import { Link } from "react-router-dom";


function post({post={ id:-1, title: "this is default post title",content :"this is default post content"} ,deletepost}) {
  
    const userContextdata=useContext(usercontext)
   const [user,setuser] = useState(null)
   const [login , setlogin] = useState(null)
   useEffect(() => {
    setuser(getcurrentuserdetail)()
    setlogin(isloggedIn())
   },  [])
   
   
   
   
    return (
        
        <card className='border-0 shadow-sm mt-3'>
            <CardBody>
                <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,70)+"...."}}>
               
            </CardText>

            <div>
                <link className="btn btn-secondary border-0" to={'/posts/'+post.postid}> Read More</link>
             {  userContextdata.user.login  && (user && user.id === post.user.id ? <Button  onClick={()=>deletepost}color="danger" className="ms-2">delete</Button> : '')}
             {  userContextdata.user.login  && (user && user.id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.postId}`}color="Warning" className="ms-2">Update</Button> : '')}
            

            </div>

            </CardBody>
        </card>
    )
}
export default post