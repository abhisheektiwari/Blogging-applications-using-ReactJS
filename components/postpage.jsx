import { Link, useParams } from "react-router-dom"
import Base from "../Base"
import { Button, CardBody, CardText, Container, Input, Row } from "reactstrap"
import { useEffect, useState } from "react"
import { createcomment, loadpost } from "./services/post-service"
import { toast } from "react-toastify"
import { BASE_URL } from "./services/helper"
import { isloggedIn } from "../auth"



const postpage=() => {
    const {postid}=useParams()
    const [post,setpost]=useState(null)
    const [comment,setcomment]=useState({
        content:''
    })

    useEffect(()=>{
        //load post of postid
        loadpost(postid).then(data=>{
            console.log(data);
            setpost(data)
         }).catch(error=>{
            console.log(error)
            toast.error("error in loading post")
         })
    }, [])

    const printdate=(numbers)=>{

        return new data(numbers).tolocalstring()
    }

    const submitpost=()=> {

        if(!isloggedIn()){
            toast.error(" you Need to login first !!")
            return
        }
        if(comment.content.trim()===''){
            return
        }
       createcomment(comment,post.postid)
       .then(data=>{
        console.log(data)
        toast.success("comment added  ..")
        setpost({
            ...post,
            comments:[...posts.comments, data.data]
        })
        setcomment({
            content:''
        })
       }).catch(error=>{
        console.log(error)
       })
    }
    return(
        <Base>
        <Container className="mt-4">
            <Link to="/">Home</Link> / {post && (<Link to=""> {post.title}</Link>)}
            <Row>
                <col md={{
                    size:12
                }}>

                   <card className="mt-3 ps-2 border-0 shadow-sm" >
                  {  
                     (post) && (
                    <CardBody>
                        <CardText>posted By <b> {post.user.name}</b> on <b>{ printdate(post.addeddate )}</b> </CardText>
                        <CardText className="mt-3">
                            <h1>{[post.title]}</h1>
                        </CardText>
                        <CardText>
                            <span className="text-muted">{post.category.categorytitle}</span>
                        </CardText>
                        <div className="divider" style={{
                            width:'100%',
                            height:'1px',
                            background:'#e2e2e2',
                        }}></div>
                        <div className="image-container mt-4" style={{maxWidth:'50%'}}>
                            <img  className="img-fluid" src={ BASE_URL+ '/post/image/'+post.imageName} alt="" />
                        </div>
                        <CardText  className="mt-4" dangerouslySetInnerHTML={{__html:post.content}}></CardText>
                    
                    </CardBody>

                     )

                  }
                   </card>
                  

                </col>
            </Row>
            <Row className="my-4">
                <col md={
                    {
                    size:9,
                    offset:1,
                    }
                }>
                    <h3>comments ( {post ? post.comments.length : 0 })</h3>
                    {
                       post.comments && post.comments.map((c,index) => (

                     <card  className="mt-4 border-0" key={index}>
                        <CardBody>
                            <CardText>
                                {c.content}
                            </CardText>
                        </CardBody>
                       </card>
                       ))

                     }
                     <card  className="mt-4 border-0">
                        <CardBody>
                           
                           <Input
                            type="textarea"
                             placeholder="Enter comment here"
                             value={comment.content}
                             onChange={(event)=>setcomment({content:event.target.value})}
                              />
                           <Button onClick={submitpost}className="mt-2" color="primary">submit</Button>
                        </CardBody>
                       </card>
                       
                    
                </col>
            </Row>

        </Container>
        </Base>
    )
}
export default postpage