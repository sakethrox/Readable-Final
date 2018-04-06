
/* 
- Main class where initial API call is made to fetch data
- Data is persisted to store and through mapStateToProps and mapDispatchToProps the component receives data and actions
- Leveraging Bulma CSS framework for styling
*/


import React, { Component } from 'react'
import { addPost, removePost, likePost, unlikePost, addComment, removeComment, likeComment, unlikeComment, addCategories } from '../actions'
import * as ReadableAPI from '../utils/api'
import { connect } from 'react-redux'
import Post from './Post.js'
import PostDetail from './PostDetail.js'
import { Button, Container, Nav, Title } from 'reactbulma'
import {withRouter, Link, Route} from 'react-router-dom'
import '../App.css'


class App extends Component {

 //On mount, we get the data from the API using getInfo()
  componentDidMount () {
    this.getInfo();
 }

 //this function makes fetch calls and populates store with posts, comments, and categories
  getInfo() {
    ReadableAPI.getPosts().then((posts) => (
    posts.map((post) => (this.props.addPost(
  post))))).then(() => (this.props.posts.map((post) => (
    ReadableAPI.getComments(post['id']).then((comments) => comments.map((comment) => (this.props.addComment(
        comment))))))))

    ReadableAPI.getCategories().then((categories) => (
    categories.map((category) => (this.props.addCategories(
  category['name'])))))
  } 

  //functions related to posts

  //same function will be used to add or update posts
  addNewPost = (post) => {
    let temp = this.props.posts.filter((post1) => post1['id'] === post['id']);
    this.props.addPost(post)
    if(temp == ''){
      ReadableAPI.addPost(post)
    }
    else{
      ReadableAPI.updatePost(post)
    }
    
  }
  
  likePost = (postId) => {
    this.props.likePost(postId)
    ReadableAPI.votePost(postId, 'upVote')
  }

  unlikePost = (postId) => {
    this.props.unlikePost(postId)
    ReadableAPI.votePost(postId, 'downVote')
  }

  removePost = (postId) => {
    this.props.removePost(postId);
    ReadableAPI.deletePost(postId)
  }

  //functions related to comments

  //function to add or update comment
  addNewComment = (comment) => {
    let temp = this.props.comments.filter((comment1) => comment1['id'] === comment['id']);
    this.props.addComment(comment)
    if(temp == ''){
      ReadableAPI.addComment(comment)
      console.log('added')
    }
    else{
      ReadableAPI.updateComment(comment)
      console.log('updated')
    }
  }

  removeComment = (commentId) => {
    this.props.removeComment(commentId);
    ReadableAPI.deleteComment(commentId)
  }

  likeComment = (commentId) => {
    this.props.likeComment(commentId)
    ReadableAPI.voteComment(commentId, 'upVote')
  }

  unlikeComment = (commentId) => {
    this.props.unlikeComment(commentId)
    ReadableAPI.voteComment(commentId, 'downVote')
  }

  render() {
    let posts = this.props.posts.filter((post) => post['deleted'] !== true);
    let comments = this.props.comments.filter((comment) => comment['deleted'] !== true);
    return (
        <Container>
          {/* All the data is passed down to 'post' component to render the UI */}
          
              <Post 
              posts={posts} 
              comments={comments}
              likePost={this.likePost} 
              unlikePost={this.unlikePost} 
              removePost={this.removePost}
              categories={this.props.categories}
              addNewPost={this.addNewPost}
              addNewComment={this.addNewComment}
              removeComment={this.removeComment}
              likeComment={this.likeComment}
              unlikeComment={this.unlikeComment}/>
        </Container>
     
    )
  }
}

function mapStateToProps({ posts, comments, categories}){
  return {
    posts: Object.keys(posts).map((id) => ({
      id,
      ...posts[id],
    }
    )),
    comments: Object.keys(comments).map((id) => ({
      id,
      ...comments[id],
    }
    )),
    categories: categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    likePost: (data) => dispatch(likePost(data)),
    unlikePost: (data) => dispatch(unlikePost(data)),
    removePost: (data) => dispatch(removePost(data)),
    addComment: (data) => dispatch(addComment(data)),
    removeComment: (data) => dispatch(removeComment(data)),
    likeComment: (data) => dispatch(likeComment(data)),
    unlikeComment: (data) => dispatch(unlikeComment(data)),
    addCategories: (data) => dispatch(addCategories(data))
  }
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(App))
