import React from 'react';
import ReactPlayer from 'react-player/youtube'
function Trailer(props) {
    const video_URL = 'https://www.youtube.com/watch?v=';
    
    return (
        <div className='item' >
            <ReactPlayer height='100%' width='100%' margin='auto' light controls url = {`${video_URL}${props.videoId}`}/>
        </div>
    );
}

export default Trailer;