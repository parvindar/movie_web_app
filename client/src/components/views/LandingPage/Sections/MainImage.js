import React,{useState} from 'react';
import {Typography} from 'antd';

const {Title} = Typography;



function Mainimage(props) {

    const [muted,setMuted] = useState(false);

    const handleOnMouseEnter=(event)=>{
        // unmute
    }

    const handleOnMouseLeave=(event)=>{
        // mute     
    }

    if(props.video) return (
        
        <div style ={{background:`linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))`,width:'100%',height:'auto',overflow:'hidden'}} >
            
            <div className='main-video' style={{ position: 'relative',zIndex:'-1', width: '105%' }} >
            <iframe frameBorder="0" width='100%' height='100%' allowFullScreen
                 src={`https://youtube.com/embed/${props.videoId}?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1&loop=1&modestbranding=1`}>
            </iframe>
            </div>
            

            <div className='main-image-text' style={{position:'absolute',maxWidth:'500px',bottom:'50px',marginLeft:'10px',marginBottom:'10px'}}>
                <Title style={{color:'white'}} level={2}>
                    {props.title}
                </Title>
                <p style={{color:'white'}}>{props.text}</p>
            </div>

      </div>
     


    )
    
    
    return (
        <div  style={{background:
            `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url(${props.image}),#1c1c1c`,
            height: '500px',
            backgroundSize: '100%, cover',
            backgroundPosition : 'center,center',
            width:'100%',
            position: 'relative'
            
            }}>

            <div style={{position:'absolute',maxWidth:'500px',bottom:'2rem',marginLeft:'2rem'}}>
                <Title style={{color:'white'}} level={2}>
                    {props.title}
                </Title>
                <p style={{color:'white',fontsize:'1rem'}}>{props.text}</p>

            </div>

        </div>
    );

}

export default Mainimage;