import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { dologout, getcurrentuserdetail, isloggedIn } from './auth';
import usercontext from './context/userContext';

const CustomNavbar = () => {
  const userContextdata= useContext(usercontext)
  let Navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [login,setlogin]=useState(false)
  const [user,setuser]=useState(undefined)

  useEffect(()=>{

    setlogin(isloggedIn())
    setuser(getcurrentuserdetail())


  },[login])

  const Logout=()=>{
    dologout(()=>{
      //logged out
      setlogin(false)
      userContextdata.setuser({
        data: null,
        login: false
      })
      Navigate("/")
    })
  }

  return (
    <div>
      <Navbar color="light" light expand="md"  fixed="" className="px-5">
        <NavbarBrand tag={ReactLink} to="/" >MyBlogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
           <NavItem>
              <NavLink tag={ReactLink} to="/" >
              New Feed
              </NavLink>
              
            </NavItem>
             <NavItem>
              <NavLink tag={ReactLink} to="/about" >
              about
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services" >
              services
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/services" >Contact us</DropdownItem>
                <DropdownItem>facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>YouTube</DropdownItem>
                 <DropdownItem>Instagram</DropdownItem>
                  <DropdownItem>linkedin</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <nav navbar>
           {
                login && (

                <>
                 <NavItem>
              <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                profile info
              </NavLink>
            </NavItem>


             <NavItem>
              <NavLink tag={ReactLink} to="/user/dashboard" >
              {user.email}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={Logout}>
                Logout
              </NavLink>
            </NavItem>


             </>

                )
           }
          
          {
           !login && (
            <>
             <NavItem>
              <NavLink tag={ReactLink} to="/Login" >
                Login
              </NavLink>
            </NavItem>
             <NavItem>
              <NavLink tag={ReactLink} to="/signup" >
                signup
              </NavLink>
            </NavItem>

            </>
           )
          }
             
          </nav>
        </Collapse>
      </Navbar>
    </div>
  );hre
};

export default CustomNavbar;
