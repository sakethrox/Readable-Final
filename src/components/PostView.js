import React from 'react'
import '../App.css'
import {Title, SubTitle, Box, Media, Button, Icon, Delete, Input, Nav} from 'reactbulma'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import FaComment from 'react-icons/lib/fa/comment';
import Modal from 'react-modal'
import sortBy from 'sort-by'
import {Link, Route, withRouter} from 'react-router-dom'
import NewPost from './NewPost'

class PostView extends React.Component{


    render(){
        let posts = this.props.posts;
        return (
            <div>
                <div>Sort By</div>
                <select style={{width: '100px'}} onChange={this.props.handleSort}>
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
                                        <Button small info onClick={() => this.props.openPostModal({post})}>Edit</Button>&nbsp;
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
                <NewPost 
                        addNewPost={this.props.addNewPost}
                        categories={this.props.categories}
                        />
            </div>
        )
    }
}

export default PostView