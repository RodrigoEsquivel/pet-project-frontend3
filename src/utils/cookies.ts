import Cookies from 'universal-cookie'; 
export function getToken(){
    const cookies = new Cookies();
    return cookies.get('token');
}

export function getUserId(){
    const cookies = new Cookies();
    return cookies.get('user_id');
}
