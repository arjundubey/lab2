import {CREATE_SESSION} from "../actions/index";


const initialState = {
     guest : true,
  userLoggedIn : false,
  user : { firstname:'' } 
};

const USER = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_SESSION :
            
            var guest= true , logged = false;

            if(action.logged === true) {
                logged = true;
                guest = false;
            } 

           return { guest: guest , userLoggedIn: logged, user:action.user };

      
        default :
            return state;

    }

};

export default USER;