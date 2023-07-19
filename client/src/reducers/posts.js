// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'FETCH_ALL':
//             return state; 
//         case 'CREATE':
//             return state;

//     }
// }

// reducer are functions which takes state and action
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
            
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
            
        case UPDATE: // same for LIKE
            return posts.map((post) => (action.payload._id === post._id ? action.payload : post));

        case FETCH_ALL:
            return action.payload; 
            
        case CREATE:
            return [...posts, action.payload];

        default :
            return posts;

    }
}