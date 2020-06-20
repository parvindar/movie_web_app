import React from 'react';
import {Button} from 'antd';

function RowElement(props) {



    return (
        
        <div class='row-element' style={{borderStyle:'solid', borderWidth:'2px',borderRadius:'25px',height:'80px',marginTop:'10px',width:'100%',background:'white'}}>
            <div style={{display:'inline-block',textAlign:'left',width:'33%',height:'100%'}}>
                <a href = {`/movie/${props.movieId}`}><img style={{borderTopLeftRadius:'23px',borderBottomLeftRadius:'23px',height:'100%'}} src={props.movieImage} alt='No Image' /></a>
            </div>
            <div style={{display:'inline-block',width:'33%',textAlign:'center'}}>
                <div>
                <a style={{color:'gray',fontSize:'0.9rem',fontWeight:'bold'}} href = {`/movie/${props.movieId}`}>{props.movieTitle}</a>
                </div>
                <div>
                {props.movieRuntime} Minutes
                </div>
            </div>

            <div style={{display:'inline-block',width:'33%',textAlign:'center'}}>
                <Button class='remove-from-fav-button' onClick={()=>props.onClickRemoveFromFavourite(props.movieId)}>Remove</Button>
            </div> 
        </div>
    
    );
}

export default RowElement;