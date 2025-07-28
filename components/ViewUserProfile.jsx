import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Col, Container,Row, Table } from "reactstrap";
import { getcurrentuserdetail, isloggedIn } from "./auth";

const ViewUserProfile = ({user}) => {

    const [currentUser,setCurrentUser] = useState(Null)
    const [login, setLogin] = useState(false)
    useEffect(() => {
        setCurrentUser(getcurrentuserdetail())
        setLogin(isloggedIn())
    },  [])
    return (
        <card className='mt-2 border-0 rounded-0 shadow-sm'>
                    <CardBody>
                        <h3 className="text-uppercase">user Information</h3>
                        <Container className='text-center'>
                            <img style={{maxWidth: '200px',maxHeight:'200px' }}src={user.image ? user.image :"https://www.google.com/search/about-this-image?img=H4sIAAAAAAAA_wEXAOj_ChUI4rDtg8uv4ZHZARDm-Z67q5DZ00Rs3rZpFwAAAA%3D%3D&q=https:%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522default+profile+picture%2522&ctx=iv&hl=en-IN&sa=X&ved=0CA4Qg4ILahcKEwjYnKuumNuOAxUAAAAAHQAAAAAQBA "} alt="user profile picture" className="img-fluid" />
                            
                        </Container>
                       < Table responsive striped  hover bordered={true} className=" text-center mt-5">
                        <thead>
                            <tr >
                                <td>
                                 LCWDB1LOGS ID
                                </td>
                                <td>
                                    LCWD{user.Id}
                                </td>
                            </tr>
                            <tr >
                                <td>
                                 USER NAME
                                </td>
                                <td>
                                    {user.name}
                                </td>
                            </tr>
                            <tr >
                                <td>
                                 USER EMAIL
                                </td>
                                <td>
                                   { user.email}
                                </td>
                            </tr>
                             <tr >
                                <td>
                                 ABOUT
                                </td>
                                <td>
                                   { user.about}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    ROLE
                                </td>
                                <td>
                                    {user.roles.map((role)=>{
                                        return(
                                            <div key={role.id}>{role.name}</div>
                                        )
                                    })}
                                </td>
                            </tr>
                        </thead>
                        </Table> 
                        {currentUser ? (currentUser.id == user.id) ? (
                             <CardFooter className="text-center">
                            <Button color="warning">update profile</Button>

                        </CardFooter>

                        ) : '' : ''}
                
                    </CardBody>
                </card>
    )
}
export default ViewUserProfile