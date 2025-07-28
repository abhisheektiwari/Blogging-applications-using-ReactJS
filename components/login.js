import { Label, card, CardBody, cardHeader,col,container, Form,formgroup, Input, Row } from "reactstrap";
import Base from "../Base";
import { useState } from "react";
import { dologin } from "../auth";
import { useNavigate } from "react-router-dom";
import usercontext from "../context/userContext";
const login = () => {

   const usercontextData=usecontext(usercontext);

  const navigate=useNavigate()

 const [logindetail,setlogindetail]=useState({
    username:'',
    password:'',
 });

 const handlechange=(event,field)=>{

    let actualvalue= event.target.value
    setlogindetail({
      ...logindetail,
      [field]:actualvalue
    });
 };

 const handlereset = () => {
  setlogindetail({
    username:"",
    password:"",
  });
 };

 const  handleformsubmit=(event)=>{
  event.preventdefault();
  console.log(logindetail);
  //validation
  if(
    logindetail.username.trim()==''  ||
     loginindetail.password.trim()==''
    ) {
    toast.error("username  or password is required !!");
    return;

  }

    // submit the data to server to generate token
   loginuser(logindetail).then((data)=>{
    console.log("user login: ")
    console.log(data)

    // save the data to localstorage
    dologin(data,()=>{
      console.log("login detail is saved to localstorage")
      // redirect to user dashboard page 
      usercontextData.setuser({
        data: data.user,
        login: true,
      });
      navigate("/user/dashboard")
    });


    toast.success("login success")
   }).catch(error=>{
    console.log(error)
    if(error.response.status==400 || error.response.status==404 ) {
      toast.error(error.response.data.message)
    }else{
      toast.error("something went wrong on server !!")
    }
   })
 };



return (
  <Base>
   <container>
    <Row className="mt-4">
      <col sm={
        {
          size:6,
          offset:3

        }
      }>
        <card color="dark"  inverse>

        
          <cardHeader>
            <h3>Login Here !!</h3>
          </cardHeader>
          <CardBody>
            <Form onSubmit={handleformsubmit}>
              
          {/* Email field */}

          <formgroup>
            <label for="email">
             Enter Email
            </label>
            <Input
            type="text"
            id="email"
            value={logindetail.username}
            onChange={(e)=> handlechange(e,'username')}
            />
          </formgroup>
          {/* Password field */}

          <formgroup>
            <label for="Password">
             Enter Password
            </label>
            <Input
            type="Password"
            id="Password"
            value={logindetail.password}
             onChange={(e)=> handlechange(e,'password')}
            />
          </formgroup>

          <container className="text-Center">
            <Button color="Light" outline>Login</Button>
            <Button  onclick ={handlereset} className="ms-2"  outline color="secondary">Reset</Button>
          </container>
            </Form>
          </CardBody>
        </card>
      </col>
    </Row>
   </container>
  </Base>
  );
};
export default login