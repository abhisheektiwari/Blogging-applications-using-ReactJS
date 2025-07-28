import { myaxios } from "./helper";

 export const loadAllcategories=()=>{
    return myaxios.get( `/categories/`).then(response=>{return response.data})
}