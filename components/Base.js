import { Children } from "react";
import CustomNavbar from "./Navbar";

const Base = ({title="welcome to our website",Children})=>{

    return (
        <div className="container-fluid">
        <CustomNavbar />

            {Children}

            
        </div>
  );
};

export default Base;