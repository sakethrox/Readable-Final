/* Build API functions
1. getPosts
2. addPost
3. updatePost
4. deletePost
5. votePost
6. getPost
 _____________
7. getComments
8. postComment
9. addComment
10.voteComment
11.updateComment
12.deleteComment
______________
13.getCategories
*/

const api = "http://localhost:3001"

const headers = {
    'Accept': 'application/json',
    'Authorization': 'whatever-you-want',

}

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => (res.json()))
    .then(data => data)

export const addPost = (post) => 
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => (res.json()))

export const updatePost = (post) =>
fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
}).then(res => res.json())

export const deletePost = (post) =>
fetch(`${api}/posts/${post}`, {
    method: 'DELETE',
    headers: {
    ...headers,
    },
}).then(res => res.json())

export const votePost = (post, option) =>
fetch(`${api}/posts/${post}`, {
    method: 'POST',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({option}),
}).then(res => (res.json()))

//Comments Section

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments/`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( comment )
  }).then(res => res.json())

export const updateComment = (comment) =>
fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify( comment )
}).then(res => res.json())

export const deleteComment = (commentId) =>
fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
    ...headers,
    },
}).then(res => res.json())

export const voteComment = (comment, option) =>
fetch(`${api}/comments/${comment}`, {
    method: 'PUT',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
}).then(res => res.json())

//Categories

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data['categories'])

