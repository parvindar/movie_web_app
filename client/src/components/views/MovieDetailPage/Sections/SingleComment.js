import React from 'react';

function SingleComment(props) {
    console.log('i M in single comment');
    return (
    
        <div style={{width:'100%',borderStyle:'solid',borderWidth:'0.5px',borderRadius:'20px',marginTop:'5px'}}>
            
            <div style={{margin:'5px 10px 5px 10px'}}>
                <div style={{display:'inline-block',textAlign:'left',width:'50%'}}>
                <b>{props.comment.writer.name}</b>
                </div>
                <div style={{display:'inline-block',textAlign:'right',width:'50%'}}>
                {props.comment.createdAt}
                </div>
            </div>
            <div style={{margin:'5px 10px 5px 10px'}}>
                {props.comment.content}
            </div>
        </div>
    );
}

export default SingleComment;