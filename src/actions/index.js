/* store object has 3 keys
1. Posts - addPost, removePost, likePost, unlikePost
2. Comments - addComment, removeComment, likeComment, unlikeComment
3. Categories - addCategories 
*/

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const LIKE_POST = 'LIKE_POST'
export const UNLIKE_POST = 'UNLIKE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const LIKE_COMMENT = 'LIKE_COMMENT'
export const UNLIKE_COMMENT = 'UNLIKE_COMMENT'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export function addPost(post)
{
    const {id, timestamp, title, body, author, category, deleted} = post
    let { voteScore } = post;
    if(voteScore < 0){
        voteScore = 0;
    }
    return {
        type:ADD_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted,
    }
}

export function removePost(id){
    return {
        type:REMOVE_POST,
        id,
    }
}

export function likePost(id){
    return {
        type:LIKE_POST,
        id,
    }
}

export function unlikePost(id){
    return {
        type:UNLIKE_POST,
        id,
    }
}

export function addComment(comment)
{   
    let { voteScore } = comment;   
    const {id, parentId, timestamp, body, author, deleted, parentDeleted} = comment;
    if(voteScore < 0){
        voteScore = 0;
        }
    return {
        type:ADD_COMMENT,
        id,
        parentId,
        timestamp,
        body,
        author,
        voteScore,
        deleted,
        parentDeleted,
    }
}

export function removeComment(id){
    return {
        type:REMOVE_COMMENT,
        id,
    }
}


export function likeComment(id){
    return {
        type:LIKE_COMMENT,
        id,
    }
}


export function unlikeComment(id){
    return {
        type:UNLIKE_COMMENT,
        id,
    }
}

export function addCategories(category){
    return {
        type:ADD_CATEGORIES,
        category,
    }
}