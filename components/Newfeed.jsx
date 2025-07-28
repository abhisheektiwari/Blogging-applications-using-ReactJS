import React, { useState } from "react";
import { useEffect } from "react";
import { deletepostservice, loadallposts } from "./pages/services/post-service";
import { Row,Col,Pagination,PaginationItem, PaginationLink, Container } from "reactstrap";
import post from "./post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
function Newfeed() {

    const [postcontent,setpostcontent]=useState({
        content:[],
        totalpages:'',
        totalelement:'',
        pagesize:'',
        lastpage:false,
        pageNumber:'',
    })
    const[currentpage,setcurrentpage]=useState(0)

     useEffect(()=> {

   changepage(currentpage)


  },[currentpage])

  const changepage=(pageNumber=0,pagesize=5) => {
    if(pageNumber>postcontent && postcontent.lastpage) {
        return;
    }
    if(pageNumber<postcontent && postcontent.pageNumber===0) {
        return;
    }
   
    
    loadallposts(pageNumber,pagesize).then(data=>{
        setpostcontent({
            content:[...postcontent.content, ...data.content],
            totalpages: data.totalpages,
        totalelement:data.totalElements,
        pagesize:data.pagesize,
        lastpage:data.lastpage,
        pageNumber:data.pageNumber,
        })
        console.log(data);
        window.scroll(0,0)
    }).catch(error=>{
        toast.error("error in loading posts")
    });
  };
  function deletepost(post) {
    //going to delete post
    console.log(post)

    deletepostservice(post.postid).then(res => {
        console.log(res)
        total.success("post is deleted..")

      let newpostcontents=  postcontent.content.filter(p=>p.postId!=post.postId)
      setpostcontent({...postcontent,contentnewpostcontents})
    })
    .catch(error => {
        console.log(error)
        toast.error("error in deleting post")
    })
  }

  const changepageInfinite=() =>{
    console.log("paged changed")
    setcurrentpage(currentpage+1)
  }

    return (

        <div className="container-fluid">
            <Row>
                <col onMouseDown={
                    {
                        size:10,
                        offset:1
                    }
                }>
                    <h1>Blogs count ( {postcontent?.totalelement } )</h1>
                <InfiniteScroll
                      dataLength={postcontent.content.length}
                      next={changepageInfinite}
                      hasMore={!postcontent.lastpage}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: 'center'}}>
                            <b>Yay! you have seen it all</b>
                        </p>
                      }
                
                >
                  {
                    postcontent.content.map((post)=>(
                        <post deletepost={ deletepost} post={post}  key={post.postid}/>

                    ))
                }
                    </InfiniteScroll>
                
                 {/* <Container className=' mt-3'>
                  <Pagination size="lg">
                    <PaginationItem  onclick={()=> changepage(postcontent.pageNumber -1)}disabled={postcontent.postNumber===0}>
                        <PaginationLink previous>
                            previous
                    </PaginationLink>
                    </PaginationItem>

                    {
                        [...Array(postcontent.totalpages)].map((item, index)=>(
                        
                             <PaginationItem onClick={() => changepage(index)} active={index===postcontent.pageNumber} key={index}>
                        <PaginationLink>
                         {index+1}
                        </PaginationLink>
                    </PaginationItem>
                        
                    ))
                    }
                        
                    
                     <PaginationItem onClick={()=>changepage( postcontent.pageNumber +1)} disabled={postcontent.lastpage}>
                        <PaginationLink next>
                            next
                        </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                  </Container>
                 */}
                </col>
            </Row>
        </div>
    )
}
export default Newfeed