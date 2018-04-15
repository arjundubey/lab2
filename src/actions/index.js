export const CREATE_SESSION = 'CREATE_SESSION';
export const LOGOUT_USER = 'LOGOUT_USER';


export function manageSession(logged,user) {
    return {
        type : CREATE_SESSION,
        logged,
        user                               
    }
}

