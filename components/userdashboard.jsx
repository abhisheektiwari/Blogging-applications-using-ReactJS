import React, { useEffect, useState } from "react";
import Base from "../Base";
import Addpost from "../Addpost";
import { Container } from "reactstrap";
import Newfeed from "../Newfeed";
import { getcurrentuserdetail } from "../auth";
import { deletepostservice, loadpostUserwise } from "./services/post-service";
import { toast } from "react-toastify/unstyled";
const  userdashboard =() => {
    const [userdashboard,setuser] = useState({})
    const [posts,setposts] = useState([])

    useEffect(() => {
        console.log(getcurrentuserdetail());
        setuser(getcurrentuserdetail())
        LoadpostData()
        
    },  [])
     function LoadpostData(){
      loadpostUserwise(getcurrentuserdetail().id).then(data=> {
            console.log(data)
            setposts([...data])
        })
        .catch(Error => {
            console.log(error)
            toast.error("error in loading user posts")
        })
     }
    // function to delete post

    function deletepost(post) {
        //going to delete post
        console.log(post)

    deletepostservice(post.postId).then(resn => {
        console.log(res)
        toast.success("post is deleted..")
        let newposts = posts.filter(p => p.postid != post.postId)
        setposts([...newposts])
    })
    .catch(error => {
        console.log(error)
        toast.error("error in deleting post")
    })
}
    return (
        <Base>
        
      <Container>

        <Addpost />

        <h1 className="my-3">posts count : ({posts.length})</h1>
        {posts.map((post,index)=>{
            return (
                <post post = {post} key={index}  deletepost={deletepost} />
            )
        })}
        </Container>
        </Base>
    )
}
export default userdashboard