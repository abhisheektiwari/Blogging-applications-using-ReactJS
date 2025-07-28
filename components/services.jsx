import Base from "../Base";
import usercontext from "../context/userContext";
const services=()=>{
    return (
        <usercontext.consumer>
            {
                (user) => (
                    <Base>
                    <h1>
                        this is services page
                    </h1>
                    <h1>welcome {user.user.login && user.user.data.user.name}</h1>
                    </Base>
                )
            }
        </usercontext.consumer>
        

       
    )
}
export default services