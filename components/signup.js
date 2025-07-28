import { Button, CardBody, CardHeader, FormFeedback, FormGroup, Input } from "reactstrap";
import Base from "../Base";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";
import {toast} from 'react-toastify';
const signup = () => {

const [data,setdata] = useState({

  name:'',
  email:'',
  password:'',
  about:'',

})

const [error,seterror] =useState({
    errors:{},
    isError:false
})

useEffect(()=>{
  console.log(data);
},[data])


// handle change
const handlechange=(event,property)=>{
   // dynamic setting the values
  setdata({...data,[property]:event.target.value})
}
//resetting the form
const resetdata=()=>{
  setdata({
    name:'',
    Email:'',
    password:'',
    about:'',
  })
}
//submit the form
const Submitform=(Event)=>{
  Event.preventDefault()

    //if(error.iserror){
   // toast.error("from data is invalid , correct all details then submit.");
   //  seterror({...error,iserror:false});
   // return;
 // }

  console.log(data);
  //data validate

   // call server api for sending data
   signup(data).then((resp)=>{
    console.log(resp)
    console.log("success log")
    toast.success("user is registered successfully !!" + resp.id)
    setdata({
      name:'',
    Email:'',
    password:'',
    about:'',
   })
   }).catch((error)=>{
    console.log(error);
    console.log("error log");
    //handle errors in proper way
    seterror({
      errors:error,
      iserror:true
    })
   })
   ;
};



return (
  <Base>
    <container>
      <Row className="mt-4">

        {JSON.stringify(data) }

        <col sm={{ size: 6, offset: 3}}>
        <Card color="dark" outline>
          <CardHeader>
             <h3>Fill Information to register !!</h3>
          </CardHeader>

          <CardBody>
            {/* creating form */}

            <form onSubmit={Submitform}>
            
            {/* Name field */}
              <FormGroup>
                <Label for="name">Enter Name</Label>
                <Input
                type="text"
                placeholder="Enter Here"
                id="name"
                onChange={(e)=>handlechange(e,'name')}
                value={data.name}
                invalid={ error.errors?.response?.data?.name? true:false }
                
                />

                 <FormFeedback>
                  { error.errors?.response?.data?.name }
                 </FormFeedback>


               </FormGroup>
               {/* Email field */}
              <FormGroup>
                <Label for="Email">Enter Email</Label>
                <Input
                type="Email"
                placeholder="Enter Here"
                id="Email"
                 onChange={(e)=>handlechange(e,'Email')}
                 value={data.Email}
                 invalid={ error.errors?.response?.data?.email? true:false }
                
                />

                 <FormFeedback>
                  { error.errors?.response?.data?.email }
                 </FormFeedback>


               </FormGroup>
              { /* Password field */}
              <FormGroup>
                <Label for="Password">Enter Password</Label>
                <Input
                type="Password"
                placeholder="Enter Here"
                id="Password"
                 onChange={(e)=>handlechange(e,'password')}
                 value={data.password}
                  invalid={ error.errors?.response?.data?.password? true:false }
                
                />

                 <FormFeedback>
                  { error.errors?.response?.data?.password }
                 </FormFeedback>


               </FormGroup>
               {/* about field */}
              <FormGroup>
                <Label for="about">Enter Passowrd</Label>
                <Input
                type="textarea"
                placeholder="Enter Here"
                id="about"
                style={{height:"250px"}}
                 onChange={(e)=>handlechange(e,'about')}
                 value={data.about}
                 invalid={ error.errors?.response?.data?.about? true:false }
                
                />
               
               <FormFeedback>
                  { error.errors?.response?.data?. about }
                 </FormFeedback>



               </FormGroup>
               <container className="text-center">

                  <Button color="dark">Register</Button>
                  <Button  onClick={resetdata} color="secondary" type="Reset" className="ms-2">Reset</Button>
               </container>
            </form>


          </CardBody>
        </Card>
        </col>
      </Row>


      
      
    
  </container>
    
  </Base>
  );
};
export default signup