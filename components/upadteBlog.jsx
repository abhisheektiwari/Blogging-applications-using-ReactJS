import React, { useState } from "react";
import Base from "../Base";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import usercontext from "../context/userContext";
import { loadpost,updatepost as doupdatepost } from "./services/post-service";
import { loadAllcategories } from "./services/category-service";
import { Card,Form,CardBody, Input,Label,Button,Container } from "reactstrap";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { toast } from "react-toastify";
function updateblog() {
    const editor = useRef(Null)

     const [categories, setcategories] = useState([])
    const { blogId } = useParams()
    const object=useContext(usercontext)
    const navigate=useNavigate()
    const [post,setpost]=useState(null)

    useEffect(() => {
        loadAllcategories().then((data) => {
            console.log(data)
            setcategories(data)
        }).catch(error => {
            console.log(error)
        })

     //load the blog from database
     loadpost(blogId).then(data=>{
        setpost({...data,categoryId:data.category.categoryId})
     })
     .catch(Error=>{
        console.log(error);
        toast.error("error in loading the blog")
     })
    }, [])

    useEffect(()=>{
        if(!post){
            if(post.user.id!=object.user.data.id){
                toast.error("this is not your post !!")
                    navigate("/")
                
            }
        }
    }, [post])

    const handlechange = (event, fieldName)=> {
        setpost({
            ...post,
           [fieldName]: event.target.value
            
        })
    }
    const updatepost = (event) => {
        event.preventDefault()
        console.log(post)
        doupdatepost({...post,category:{categoryId:post.categoryId}},post.postId)
        .then(res =>{
            console.log(res)
            toast.success("post updated")
        })
        .catch(error => {
            console.log(error);
            toast.error("Error in updating post")
        })
    }
    
    const updateHtml=()=>{
        return(
             <div className="wrapper">
          <card className="shadow-sm border-0 mt-2">
              <CardBody>
             {/*JSON.stringify(post) */}
                <h3>Update post from here !!</h3>
                <form onSubmit={'updatepost'}>
                    <div className="my-3">
                        <label for="title">post title</label>
                        <input
                         type="text"  
                         id="title"
                         placeholder="Enter here"
                         className="rounded-0"
                         name="title"
                         value={post.title}
                         onChange={(event)=>handlechange(event,'title')}
                         /> 
                    </div>
                    <div className="my-3">
                        <label for="content">post content</label>
                        {/*<input
                         type="textarea"  
                         id="content"
                         placeholder="Enter here"
                         className="rounded-0"
                         style={{height:'300px'}}
                         /> */}
                         <JoditEditor
                         ref={editor}
                         value={post.content}
                         onChange={newContent => setpost({...post,content:newContent})}
                         />
                         </div>
                         { /* file field */}
                        <div className="mt-3">
                            <Label for="image">select Post banner</Label>
                            <Input id="image" type="file"  multiple onChange={''}/>
                        </div>




                         <div className="my-3">
                        <label for="category">post category</label>
                        <input
                         type="select"  
                         id="category"
                         placeholder="Enter here"
                         className="rounded-0"
                         name="categoryid"
                         onChange={ ''}
                         value={post.categoryId}

                        
                         > 

                         <option disabled value={0}>--select category--</option>

                         {
                            categories.map((category)=>{
                                <option value={category.categoryId} key={category.categoryId}>
                                    {category.categoryTitle}
                                </option>
                            })
                         }
                            
                         

                         </input>
                    </div>

                    <Container className="text-center">
                        <Button className="rounded-0" color="primary">Update post</Button>
                        <Button className="rounded-0 ms-2" color="danger">reset content</Button>
                    </Container>
                </form>
                     

              </CardBody>
        </card>
        </div>

        )
    }

    return (
        <Base>
        <Container>
          { post && updateHtml()}
          </Container>
        </Base>
    )

        
    
}
export default updateblog