import * as api from '../api'; // importing everything from api as api
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes';
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
export const getPosts = (page) => async (dispatch) => {
    try {

        dispatch({type: START_LOADING});

        const { data } = await api.fetchPosts(page); // data represents posts

        dispatch({ type: FETCH_ALL, payload: data});

        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery); 

        dispatch({ type: FETCH_BY_SEARCH, payload: data}); 

        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        
        const { data } = await api.fetchPost(id);
        
        dispatch({type: FETCH_POST, payload: data}); 

        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error);
    }
}
        
export const createPost = (post, Navigate) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});

        console.log(post);
        
        const { data } = await api.createPost(post);

        Navigate(`/posts/${data._id}`);

        dispatch({type: CREATE, payload: data});
        dispatch({type: END_LOADING});

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

export const  deletePost = (id, Navigate) => async (dispatch) => {
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

export const commentPost = (value, id) => async (dispatch) => {

    try {
        const { data } = await api.comment(value, id);

        dispatch({type: COMMENT, payload: data});

        return data.comments;
    } catch (error) {

    }

}