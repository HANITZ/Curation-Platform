import renewAccess from "../auth/renewAccess";
import { BASE_URL, Token } from 'pages/api/fetch';


export default async function getMission(){
    const response = await fetch(BASE_URL+'mission?array=time', {
        method:'GET',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    return data
}