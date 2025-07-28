import React, { useEffect, useState } from "react";
import Base from "../Base";
import usercontext from "../context/userContext";
import { useParams } from "react-router-dom";
import { getUser } from "./services/user-service";
import { CardBody, Table } from "reactstrap";
import ViewUserProfile from "../ViewUserProfile";
function profileinfo() {
    const object=usecontext(usercontext)
    const [user,setUser]=useState(Null)
    const { userId } = useParams()
    // console.log(userId);

    useEffect(()=>{
        getUser(userId).then(data=>{
            console.log(data);
            Setuser({...data})
        })
    } , [])

    const useView=()=>{
        return(
            <Row>
                <col md={{size:6,offset:3}}>

                <ViewUserProfile user={user} />
              
                </col>
            </Row>
        )
    }
    return (
        <Base>
      {user ? userView() : 'Loading user Data...'}
        </Base>
    )

}
export default profileinfo




