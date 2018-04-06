import React from 'react'
import '../App.css'
import {Title, SubTitle, Box, Media, Button, Icon, Delete, Input, Nav} from 'reactbulma'

class NewPost extends React.Component{

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    state = {
        title: '',
        content: '',
        createdBy: '',
        category:'react',
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        
        this.setState(() => ({
        [name]: value
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
            title: '',
            content: '',
            createdBy: '',
          })) 
        
    }
    render(){
        return (
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
        )
    }

}

 
export default NewPost