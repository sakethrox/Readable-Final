/* 
Our store has 3 properties:
1. Posts
2. Comments
3. Categories
We'll have 3 reducers
*/
import { combineReducers } from 'redux';
import {ADD_POST, REMOVE_POST, LIKE_POST, UNLIKE_POST, ADD_COMMENT, REMOVE_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT, ADD_CATEGORIES} from '../actions'

function posts(state = {}, action){
    const {id, timestamp, title, body, author, category, voteScore, deleted} = action
    switch(action.type){
        case ADD_POST:
            return {
            //business logic to add post to store
            ...state,
            [id]:{
                timestamp:timestamp,
                title:title,
                body:body,
                author:author,
                category:category,
                voteScore:voteScore,
                deleted:deleted
            },
            }
        case REMOVE_POST:
            return {
                //business logic to remove post from store
                ...state,
                [id]:{
                    ...state[id],
                    ['deleted']:true,
                }
            }
        case LIKE_POST:
            return {
                //business logic to like the post
                ...state,
                [id]:{
                    ...state[id],
                    ['voteScore']:state[id]['voteScore'] + 1,
                }
            }
        case UNLIKE_POST:
            return {
                //business logic to unlike the post
                ...state,
                [id]:{
                    ...state[id],
                    ['voteScore']:state[id]['voteScore'] - 1,
                }
            }
       default:
            return state;
    }
}


function comments(state = {}, action){
    const {id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted} = action
    switch(action.type){
        case ADD_COMMENT:
            return {
            //business logic to add comment to store
            ...state,
            [id]:{
                id, 
                parentId, 
                timestamp, 
                body, 
                author, 
                voteScore, 
                deleted, 
                parentDeleted
            },
            }
        case REMOVE_COMMENT:
            return {
                //business logic to remove comment from store
                ...state,
                [id]:{
                    ...state[id],
                    ['deleted']:true,
                }
            }
        case LIKE_COMMENT:
            return {
                //business logic to like the comment
                ...state,
                [id]:{
                    ...state[id],
                    ['voteScore']:state[id]['voteScore'] + 1,
                }
            }
        case UNLIKE_COMMENT:
            return {
                //business logic to unlike the comment
                ...state,
                [id]:{
                    ...state[id],
                    ['voteScore']:state[id]['voteScore'] - 1,
                }
            }
       default:
            return state;
    }
}


function categories(state = [], action){
    const {category} = action
    switch(action.type){
        case ADD_CATEGORIES:
            return [
            //business logic to add categories to store
            ...state,
            category,
            ]
       default:
            return state;
    }
}

export default combineReducers({posts, comments, categories});