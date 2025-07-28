import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Toast } from "reactstrap";
import { loadAllcategories } from "./pages/services/category-service";
import { toast } from "react-toastify";
function CategorysideMenu() {

    const[categories, setcategories] = useState([])
    useEffect(()=>{
        loadAllcategories().then(data=>{
            console.log("loading categories ")
            console.log(data)
            setcategories([...data])
        })
        .catch(error =>{
            console.log(error);
            Toast.error("error in loading categories")

        })

    },[])
    return (
        <div>
          <ListGroup>
            <ListGroupItem tag={link} to="/" action={true} className="border-0">
                All Blogs
            </ListGroupItem>
          </ListGroup>
          { categories && categories.map((cat, index) => {
            return (
                <ListGroupItem tag={link} to={'/categories/'+ cat.categoryId} className="border-0 shadow-0 mt-1" key={index} action={true}>
                    {cat.categorytitle}
                </ListGroupItem>
            )
          })}
        </div>
    )
}

export default CategorysideMenu