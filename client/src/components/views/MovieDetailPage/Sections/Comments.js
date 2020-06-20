import React, { useState } from 'react';
import {Button,Input} from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment';
const {TextArea} = Input;
function Comments(props) {

    const [comment,setComment] = useState('');
    
    const handleOnChange = (event)=>{
        setComment(event.currentTarget.value);
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        const variables = {
            writer : localStorage.getItem('userId'),
            content : comment,
            movieId : props.movieId
        }

        axios.post('/api/comment/submitComment',variables)
        .then(response=>{
            if(response.data.success)
            {
                setComment('');
                props.updateComments(response.data.result);
            }
            else{
                alert('failed to submit comment');
            }
        })
    }

    return (
        <div>
            <p>Comments</p>

            {console.log('comments bro : ',props.commentList)}
            {props.commentList && props.commentList.map((comment,index)=>{
                return (
             
                    <SingleComment comment={comment}/>
                  
                )
            })}

            <hr/>

            <form style={{display:'flex'}} onSubmit>
                <TextArea style={{width:'100%',borderRadius:'10px'}}
                onChange={handleOnChange}
                value ={comment}
                placeholder="Write a Comment"
                />
                <Button style={{width:'20%',height:'50px'}} onClick={onSubmit}>
                    Submit
                    </Button>
            </form>
        </div>
    );
}

export default Comments;