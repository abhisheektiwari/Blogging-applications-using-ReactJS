//isloggedIn=>

export const isloggedIn = () => {
    let data = localStorage.getItem("data");
    if (data == null) {
        return false;
    } else {
        return true;
    }
};

//dologin=> data =>set  to localstorage

export const dologin=(data, next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next()
};

//dologout=>remove from localstorage

export const dologout=(next)=>{
    localStorage.removeItem("data");
    next()
};

// get currentuser
export const getcurrentuserdetail = ()=> {
    if(isloggedIn()) {
        return JSON.parse(localStorage.getItem("data")).user;
    } else {
        return undefined;
    }
};

export const gettoken=() => {
    if(isloggedIn()){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return null;
    }
}