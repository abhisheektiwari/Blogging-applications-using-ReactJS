import { myaxios, privateAxios } from "./helper";

// create post function
 export const createpost=(postdata) =>{
//   console.log(postdata);

    return privateAxios.post(`/user/${postdata.userid}/category/${postdata.categoryid}/posts`,postdata).then(Response=>Response.data)

};

// get all posts

export const loadallposts=(pageNumber,pagesize)=>{

    return myaxios.get(`/posts?&pageNumber=${pageNumber}&pagesize=${pagesize}&sortby=addeddate&sortDir=desc`)
    .then(Response=>Response.data);
};

//load single post of given id
export const loadpost=(postid)=>{
    return myaxios.get("/posts/"+postid).then(Response=>Response.data)
};

export const createcomment=(Comment,postId)=>{
    return privateAxios.post(`/post/${postId}/comments`,Comment)
}
// upload post banner image

export const UploadPostImage = (image,postId) => {
    let FormData = new FormData()
    FormData.append("image",image);
  return privateAxios
  .post(`Post/image/Upload/ ${postId}`,FormData,{
    Headers:{
        'content-Type':'multipart/form-data'
    }
  })
  .then((response)=>response.data);
};
//get category wise posts
export function loadpostCategoryWise(categoryid)
{
    return privateAxios.get( `/category/${categoryid}/posts`).then(res=>res.data);
}

export function loadpostUserwise(userid)
{
    return privateAxios.get(`/user/${userid}/posts`).then(res=>res.data);
}
//delete post
export function deletepostservice(postid){
    return privateAxios.delete(`/posts/${postid}`).then(res=>res.data);

}
//update post
export function updatepost(post, postId) {
    console.log(post)
    return privateAxios.put(`/posts/${postId}`, post).then((resp)=> resp.data);
}


