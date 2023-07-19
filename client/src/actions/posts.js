import * as api from '../api'; // importing everything from api as api
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
// action creators : functions that return actions

//this is a action creator
// const getPosts = () => {
//     const action = {type: 'FETCH_ALL', payload: [] }

//     return action;
// }


// it will takes some time therefore it is async; that's why we are using thunk which allows to specify an additional arrow function
// const getPosts = () => async (dispatch) => {
//     const action = {type: 'FETCH_ALL', payload: [] }

//     dispatch(action); // in redux thunk instead returning actions we dispatch it
// }

// dispatch is given by redux thunk
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(); // data represents posts

        dispatch({ type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const  deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}