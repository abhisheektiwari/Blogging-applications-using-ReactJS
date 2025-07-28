import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, col } from "reactstrap";
import CategorysideMenu from "../CategorysideMenu";
import { deletepostservice, loadpostCategoryWise } from "./services/post-service";

function categories() {
    const [posts,setposts]=usestate([])

    const {categoryId} = useParams()
    useEffect(() => {
        console.log(categoryId);
        loadpostCategoryWise(categoryId).then(data=>{
            setposts([...data])
        })
           .catch(error => {
            console.log(error)
            toast.error("error in loading posts")
           })
    },  [categoryId])

    function deletepost(post) {
        //going to delete post
        console.log(post)

        deletepostservice(post.postId).then(res => {
            console.log(res)
            toast.success("post is deleted..")
            let newposts = post.filter(p => p.postId != post.postId)
            setposts([...newposts])
        })
        .catch(error => {
            console.log(error)
            toast.error("error in deleting post")
        })
    }
    return (
        <Base>
         <container className="mt-3">
             <Row>
               <col md={2} className="pt-3">
               <CategorysideMenu />
               </col>
               <col md={10}>
               <h1>Blogs Count({posts.length})</h1>
               {
                post && post.map((post,index)=>{
                    return (
                        <post deletepost={deletepost} key={index} post={posts} />
                    )
                })
               }

               { posts.length<=0 ? <h1>No post in this category</h1> : '' }
               </col>
             </Row>
             </container>
         

        </Base>
    )
}
export default categories