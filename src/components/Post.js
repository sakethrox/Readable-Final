import React from 'react'
import {Title, SubTitle, Box, Media, Button, Icon, Delete, Input, Nav} from 'reactbulma'
import '../App.css'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import FaComment from 'react-icons/lib/fa/comment';
import Modal from 'react-modal'
import sortBy from 'sort-by'
import DisplayPostWithRouter from './DisplayPost';

import PostView from './PostView'
import {Link, Route, withRouter} from 'react-router-dom'


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

  //Component that render the UI. Nav bar, Content, New post
class Post extends React.Component{
    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    state = {
        postModalOpen: false,
        title: '',
        content: '',
        createdBy: '',
        category:'react',
        post: null,
        posts: '',
      
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            posts: nextProps['posts']
        })
    }

    //method to handle any change on form elements
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        
        this.setState(() => ({
        [name]: value
        }))   
      }
    
    //Methods to handle Modal for editing the post
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
    closePostModal = () => {
    this.setState(() => ({
        postModalOpen: false,
        post: null,
        title: '',
        content: '',
        createdBy: '',
    }))
    }

    //Method to handle New Post
    handleNewPost = (event) => {
        event.preventDefault();
        let post = {
            'id': Date.now(),
            'timestamp': Date.now(),
            'title': this.state.title,
            'body': this.state.content,
            'author': this.state.createdBy,
            'category': this.state.category,
            'voteScore': 0,
            'deleted': false,
            'commentCount': 0,
        }
        this.props.addNewPost(post);
        this.setState(() => ({
            postModalOpen: false,
            post: null,
            title: '',
            content: '',
            createdBy: '',
            category: '',
          })) 
        
    }
    //Method to handle Update Post
    updatePostHandler = (event) => {
        event.preventDefault();
        let post = {
            'id': this.state.post['id'],
            'timestamp': this.state.post['timestamp'],
            'title': this.state.title,
            'body': this.state.content,
            'author': this.state.createdBy,
            'category': this.state.category,
            'voteScore': this.state.post['voteScore'],
            'deleted': this.state.post['deleted'],
            'commentCount': 0,
        }
        this.closePostModal();
        this.props.addNewPost(post);
    }

    //Sort Function - sortBy votes or created
    handleSort = (event) => {
        event.preventDefault();
        this.setState({posts: this.props.posts.sort(sortBy(event.target.value))})
    }
    
    //This function handles the category view for the application
    handlePost = (event) => {
        event.preventDefault();
        
        if(event.target.id == 'allposts'){
            this.setState({posts: this.props.posts})
        }
        else{
            this.setState({posts: this.props.posts.filter((post) => post['category'] == event.target.id)})
        }
    }

    render(){
        const { postModalOpen, post, posts} = this.state
        return (
            <div><br/>

                    <header>
                        <Title is='2'>Welcome to Read<span className='title-color'>able</span></Title>
                        <Nav>
                        <Nav.Right menu className='temp'>
                            <Link to='/'>
                            All-Posts
                            </Link>
                            &nbsp;&nbsp;
                            <Link to='/react'>
                            React
                            </Link> 
                            &nbsp;&nbsp;
                            <Link to='/redux'>
                            Redux
                            </Link>
                            &nbsp;&nbsp;
                            <Link to='/Udacity'>
                            Udacity
                            </Link>
                        </Nav.Right>
                        </Nav>    
                        </header>
                    
                        <Route exact path="/" render={() => ( 
                        <div>
                            <PostView 
                            handleSort={this.handleSort}
                            openPostModal={this.openPostModal}
                            removePost={this.props.removePost}
                            likePost={this.props.likePost}
                            unlikePost={this.props.unlikePost}
                            comments={this.props.comments}
                            posts={this.props.posts}
                            categories={this.props.categories}
                            addNewPost={this.props.addNewPost}
                            />
                        </div>
                        )}/>

                        {this.props.categories.map((category) => (
                            <Route exact path={`/${category}`} render={() => ( 
                                <div>
                                    <PostView 
                                    handleSort={this.handleSort}
                                    openPostModal={this.openPostModal}
                                    removePost={this.props.removePost}
                                    likePost={this.props.likePost}
                                    unlikePost={this.props.unlikePost}
                                    comments={this.props.comments}
                                    posts={this.props.posts.filter((post) => post['category'] == category)}
                                    categories={this.props.categories}
                                    addNewPost={this.props.addNewPost}
                                    />
                                </div>
                                )}/>
                        ))}    

                        

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
                        </div> 
                    
                {/* DisplayPostWithRouter handles the post view. It receives all the info. related to the post and renders UI */}
                <Route exact path={`/:category/:postId`} render={() => (
                    <DisplayPostWithRouter posts={this.props.posts}
                    comments={this.props.comments}
                    categories={this.props.categories}
                    addNewPost={this.props.addNewPost}
                    likePost={this.props.likePost}
                    unlikePost={this.props.unlikePost}
                    removePost={this.props.removePost}
                    addNewComment={this.props.addNewComment}
                    removeComment={this.props.removeComment}
                    likeComment={this.props.likeComment}
                    unlikeComment={this.props.unlikeComment}/>
                )
                }/>
                </div>)
            
    }
}

 
export default withRouter(Post)