import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import Post from './Post'
import {Title, SubTitle, Box, Media, Button, Icon, Delete, Input, Textarea} from 'reactbulma'
import '../App.css'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaComment from 'react-icons/lib/fa/comment';
import TiDeleteOutline from 'react-icons/lib/ti/delete-outline';
import Modal from 'react-modal'

//styles for Modal
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class DisplayPost extends Component{

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    state = {
        postModalOpen: false,
        commentModalOpen:false,
        title: '',
        content: '',
        createdBy: '',
        category:'react',
        post: null,
        comment: '',
        comment1:'',
    }

    //handles form input change
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        
        this.setState(() => ({
        [name]: value
        }))   
      }
    
    openPostModal = ({ post }) => {

        this.setState(() => ({
          postModalOpen: true,
          post,
          title:post['title'],
          content:post['body'],
          createdBy: post['author'],
          category: post['category'],
        }))
      }

    openCommentModal = ({ comment }) => {
    this.setState(() => ({
        commentModalOpen: true,
        comment,
        content:comment['body'],
    }))
    }

    closeCommentModal = () => {
    this.setState(() => ({
        commentModalOpen: false,
        comment: '',
        content:'',
    }))
    }

    closePostModal = () => {
        this.setState(() => ({
          postModalOpen: false,
          post: null,
          title: '',
          content: '',
          createdBy: '',
          category:'',
        }))
      }

    updatePostHandler = (event) => {
    event.preventDefault();
    let post = {
        id: this.state.post['id'],
        timestamp: this.state.post['timestamp'],
        title: this.state.title,
        body: this.state.content,
        author: this.state.createdBy,
        category: this.state.category,
        voteScore: this.state.post['voteScore'],
        deleted: this.state.post['deleted'],
    }
    this.closePostModal();
    this.props.addNewPost(post);
    }

    addNewComment = ({post}) => {
        let comment = {
            id: Date.now(),
            timestamp: Date.now(),
            parentId: post['id'],
            body: this.state.comment,
            author: post['author'],
            voteScore: 0,
            deleted: false,
            parentDeleted: post['deleted']
        }
        this.setState(() => ({
            comment: '',
          })) 
        this.props.addNewComment(comment);
    }

    updateCommentHandler = (event) => {
        event.preventDefault();
        let comment = {
            id: this.state.comment['id'],
            timestamp: this.state.comment['timestamp'],
            parentId: this.state.comment['parentId'],
            body: this.state.content,
            author: this.state.comment['author'],
            voteScore: this.state.comment['voteScore'],
            deleted: this.state.comment['deleted'],
            parentDeleted: this.state.comment['parentDeleted'],
        }
        this.closeCommentModal();
        this.props.addNewComment(comment);
    }
    
    
    render(){
        const { postModalOpen} = this.state
        let post = this.props.posts.filter((post) => post['id'] == this.props.match.params.postId)
        let comments = this.props.comments.filter((comment) => comment['parentId'] == this.props.match.params.postId)
        return (
            <div>
                {post !== '' &&  (post.map((post) => (     
                        <div className='post-view' key={post['id']}>
                            <h3><strong>{post['title']}</strong></h3> by <em>{post['author']}</em> <br/>
                            created on: {new Date(post['timestamp']).toString()} &nbsp;
                            <div className="button-class">
                                <Button small info onClick={() => this.openPostModal({post})} >Edit</Button>&nbsp;
                                <Button small warning onClick={() => this.props.removePost(post['id'])} >Delete</Button>
                            </div>
                            <div className='post-body'>
                                <Textarea readOnly info value={post['body']}/>
                                <br/>
                                <TiThumbsUp onClick={() => this.props.likePost(post['id'])}/> 
                                <TiThumbsDown onClick={() => this.props.unlikePost(post['id'])}/>&nbsp;
                                {post['voteScore']} 
                                <div style={{float: 'right'}}>
                                <FaComment/> {comments.length}
                                </div>
                                <Input primary placeholder="Add Comment..." name="comment" value={this.state.comment} onChange={this.handleInputChange}/>
                                <Button small info style={{float: 'right'}}  onClick={() => this.addNewComment({post})}>Submit</Button>
                                <div className="comment-view">
                                    {comments.map((comment) => (
                                        <div key={comment['id']}>
                                            <Input value={comment['body']} name="comment1" onChange={this.handleInputChange} info /><br/>
                                            @{comment['author']}
                                            <div style={{float: 'right'}}>
                                                <TiThumbsUp onClick={() => this.props.likeComment(comment['id'])}/> {comment['voteScore']}&nbsp;
                                                <TiThumbsDown onClick={() => this.props.unlikeComment(comment['id'])}/>&nbsp;&nbsp;
                                                <FaEdit onClick={() => this.openCommentModal({comment})}/>&nbsp;&nbsp;
                                                <TiDeleteOutline onClick={() => this.props.removeComment(comment['id'])}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                            <Modal
                                isOpen={postModalOpen}
                                ariaHideApp={false}
                                contentLabel='Modal'
                                style={customStyles}
                            >
                            {post !== null && (
                                <div>
                                    <p >Edit Post</p> 
                                    <form onSubmit={this.updatePostHandler} >
                                            <fieldset>
                                                <label>
                                                Title:
                                                <input type="text" name='title' value={this.state.title} onChange={this.handleInputChange}/>
                                                </label><br/>
                                                
                                                <label>
                                                Content:&nbsp;
                                                <input type="text" name="content" value={this.state.content} onChange={this.handleInputChange}/>
                                                </label><br/>

                                                <label>
                                                Category:
                                                <select value={this.state.category} name="category" onChange={this.handleInputChange}>
                                                    {this.props.categories.map((category) => (
                                                        <option value={category} key={category}>{category.charAt(0).toUpperCase()+ category.slice(1)}</option>
                                                    ))}
                                                </select>
                                                </label>
                                                <label>
                                                Created by:
                                                <input type="text" name="createdBy" value={this.state.createdBy} onChange={this.handleInputChange}/>
                                                </label><br/>
                                                <br/>
                                                <Button success type="submit" value="Submit">Update</Button>
                                            </fieldset>
                                        </form>
                                </div>
                                )}
                                </Modal>

                            <Modal 
                                isOpen={this.state.commentModalOpen}
                                ariaHideApp={false}
                                contentLabel='Modal'
                                style={customStyles}
                            >
                                        Edit Comment
                                        <Input type="text" info name='content' value={this.state.content} onChange={this.handleInputChange} />
                                        <Button success type="submit" value="Submit" onClick={this.updateCommentHandler}>Update</Button>
                            </Modal>
                        </div> 
                        
                        </div>
                )))}
            </div>
        )
    }
}
//withRouter to prevent update blocking
const DisplayPostWithRouter = withRouter(DisplayPost)

export default DisplayPostWithRouter