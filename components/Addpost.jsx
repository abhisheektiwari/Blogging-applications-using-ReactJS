import {Card ,CardBody,Container,Form,Input,Label, Button, Placeholder} from "reactstrap"
import { loadAllcategories } from "./pages/services/category-service"
import { useEffect,useState } from "react"
import JoditEditor from "jodit-react"
import { createpost as docreatepost, UploadPostImage } from "./pages/services/post-service"
import { getcurrentuserdetail } from "./auth"
const Addpost=()=>{

    const editor=useRef(null)
   // const[content,setcontent] = useState('')
    const [categories,setcategories]=usestate([])
    const [user,setuser]=usestate(undefined)

  const [post, setpost]=  useState({
        title:'',
        content:'',
        categoryId: -1
    })
    const[Image,setImage]=usestate(Null)

     //const config={
       // Placeholder:"start typing..."
   // }

    useEffect(
        ()=>{

            setuser(getcurrentuserdetail())
            loadAllcategories().then((data)=>{
                console.log(data)
                setcategories(data)
            }).catch(error=>{
                console.log(error)
            })
        },
        []
    )

    //field changed function
    const fieldchanged=(event)=> {
        
        setpost({...post,[event.target.name]:event.target.value})
    }

    const contentfieldchanged=(data)=> {
        setpost({...post,'content' :data})
    }

    // create post function
    const createpost = (event) => {
        event.preventDeafult();
        console.log(post)
        if(post.title.trim()===''){
            toast.error("post is required !! ")
            return;
        }

        if(post.content.trim()===''){
            toast.error("post content is required !! ")
            return;
        }

        if(post.categoryid===''){
            toast.error("select some category !! ")
            return;
        }

        //submit the form on server
        post['userid'] = user.id
        docreatepost(post).then(data=>{
            UploadPostImage(Image,data.postId).then(data=>{
                toast.success("Image Uploaded !! ")
            }).catch(error=>{
                toast.error("Error in Uploading Image")
                console.log(error)
            })

            toast.success("post created !! ")
           // console.log(post)
        }).catch((error)=>  {
            toast.error("post not created due to some error !!")
          //  console.log(error)

        })
    }

    //handling file change event
    const handleFilechange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    return (
        <div className="wrapper">
          <card className="shadow-sm border-0 mt-2">
              <CardBody>
             {/*JSON.stringify(post) */}
                <h3>what going in your mind ?</h3>
                <form onSubmit={createpost}>
                    <div className="my-3">
                        <label for="title">post title</label>
                        <input
                         type="text"  
                         id="title"
                         placeholder="Enter here"
                         className="rounded-0"
                         name="title"
                         onChange={fieldchanged}
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
                         onChange={contentfieldchanged}
                         />
                         </div>
                         { /* file field */}
                        <div className="mt-3">
                            <Label for="image">select Post banner</Label>
                            <Input id="image" type="file"  multiple onChange={handleFilechange}/>
                        </div>




                         <div className="my-3">
                        <label for="category">post category</label>
                        <input
                         type="select"  
                         id="category"
                         placeholder="Enter here"
                         className="rounded-0"
                         name="categoryid"
                         onChange={fieldchanged}
                         defaultValue={0}
                        
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
                        <Button className="rounded-0" color="primary">create post</Button>
                        <Button className="rounded-0 ms-2" color="danger">reset content</Button>
                    </Container>
                </form>
                     

              </CardBody>
        </card>
        </div>
    )
}
export default Addpost