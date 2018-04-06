import React from 'react'
import {Title, SubTitle, Box, Media, Button, Icon, Delete, Input, Nav} from 'reactbulma'
import '../App.css'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import FaComment from 'react-icons/lib/fa/comment';
import Modal from 'react-modal'
import sortBy from 'sort-by'
import DisplayPostWithRouter from './DisplayPost';
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
                <Route exact path="/" render={() => ( 
                    <div>
                        <header>
                        <Title is='2'>Welcome to Read<span className='title-color'>able</span></Title>
                        <Nav>
                        <Nav.Right menu className='temp'>
                            <Nav.Item name='all-posts' id='allposts' onClick={this.handlePost}>
                            All-Posts
                            </Nav.Item>
                            &nbsp;&nbsp;
                            <Nav.Item id='react' onClick={this.handlePost}>
                            React
                            </Nav.Item> 
                            &nbsp;&nbsp;
                            <Nav.Item id='redux' onClick={this.handlePost}>
                            Redux
                            </Nav.Item>
                            &nbsp;&nbsp;
                            <Nav.Item id='udacity' onClick={this.handlePost}>
                            Udacity
                            </Nav.Item>
                        </Nav.Right>
                        </Nav>    
                        </header>
                        <div>Sort By</div>
                        <select style={{width: '100px'}} onChange={this.handleSort}>
                            <option value="none">--None--</option>
                            <option value="voteScore">Votes</option>
                            <option value="timestamp">Created</option>
                        </select>
                        <div className='post-content'>
                                {posts !== '' && (posts.map((post) => (
                                        <div key={post['id']}>
                                        <Link to={`${post['category']}/${post['id']}`}><h3><strong>{post['title']}</strong></h3></Link> by <em>{post['author']}</em> <br/>
                                        created on: {new Date(post['timestamp']).toString()} &nbsp;
                                        <div className="button-class">
                                            <Button small info onClick={() => this.openPostModal({post})}>Edit</Button>&nbsp;
                                            <Button small warning onClick={() => this.props.removePost(post['id'])}>Delete</Button>
                                        </div>
                                        <div className='post-body'>
                                                {post['body']}
                                                <br/>
                                                <TiThumbsUp onClick={() => this.props.likePost(post['id'])}/> 
                                                <TiThumbsDown onClick={() => this.props.unlikePost(post['id'])}/>&nbsp;
                                                {post['voteScore']} 
                                                <div style={{float: 'right'}}>
                                                <FaComment/> {this.props.comments.filter((comment) => post['id'] == comment['parentId']).length}
                                                </div>
                                        </div>
                                        
                                        </div>
                                )))}
                        </div>
                        <div className='add-post'>
                            <strong>New Post</strong><br/><br/>
                            <form onSubmit={this.handleNewPost}>
                                        <fieldset>
                                            <label>
                                            Title:
                                            <input  type="text" name='title' value={this.state.title} onChange={this.handleInputChange}/>
                                            </label><br/>
                                            
                                            <label>
                                            Content:&nbsp;
                                            <input type="text" name="content" value={this.state.content} onChange={this.handleInputChange}/>
                                            </label><br/>

                                            <label>
                                            Category:
                                            <select name="category" value={this.state.category} onChange={this.handleInputChange}>
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
                                            <Button info type="submit" value="Submit" >Submit</Button>
                                        </fieldset>
                            </form>
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
                        </div> 
                    </div>

                 )}/> 
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
                
                
            </div>
        )
    }
}

 
export default withRouter(Post)