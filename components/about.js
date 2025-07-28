import usercontext from "../context/userContext";
import Base from "../Base";


const about = () => {
    return (
        <usercontext.consumer>
            {(object) => (
                <Base>
                <h1>this is about page</h1>
                <p> we are building blog website</p>
                {console.log(object)}
                <h1>welcome user:{ object.user && user.user.data.user.name} </h1>
                </Base>
            )}
        </usercontext.consumer>
    )
};

export default about;