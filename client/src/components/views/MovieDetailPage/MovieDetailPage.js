import React,{useEffect,useState,Fragment} from 'react';
import {IMG_URL, API_URL,API_KEY, VID_API_KEY} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import {Descriptions,Row} from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import Favourite from './Sections/Favourite';
import Trailer from './Sections/Trailer';
import './MovieDetailPage.css'
import Comments from './Sections/Comments';
import {Button} from 'antd';
import axios from 'axios';


function MovieDetailPage(props) {


    const movieId = props.match.params.movieId;
    
    const [movie,setMovie] = useState({});
    const [crew,setcrew] = useState([]);
    const [ToggleActor,setToggleActor] = useState(false);
    const [showCastText,setShowCastText] = useState('Show Cast');
    const [trailers,setTrailers] = useState([]);
    const [commentList,setCommentList] = useState([]);
    useEffect(()=>{
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetch(endpoint).then(response=> response.json())
        .then(response=>{
            console.log('Moviedetail: ',response);
            setMovie(response);
        })

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
        .then(response=>response.json())
        .then(response=>{
            console.log('MovieCast: ',response);
            setcrew(response.cast);

        })

        fetch(`${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
        .then(response=>response.json())
        .then(response=>{
            console.log('MovieTrailers: ',response);
            setTrailers(response.results.slice(0,3));
        })

        const variable={
            movieId : movieId
        }
        axios.post('/api/comment/getComments',variable)
        .then(response=>{
            if(response.data.success)
            {
                setCommentList(response.data.result);
            }
            else{
                alert('failed to get comments');
            }
        })

    },[])
    

    const updateComments = (newComment) =>{
       setCommentList(commentList.concat(newComment));
    }

    const handleClick = ()=>{
        if(!ToggleActor)
            setShowCastText('Hide Cast');
        else
            setShowCastText('Show Cast');
        setToggleActor(!ToggleActor);

    }

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    return (
 
        <div>
            {movie && <MainImage image={`${IMG_URL}w1280${movie.backdrop_path}`} title={movie.title} text={movie.overview}/>}
            
            <div className='MovieContainer'>
            <div className='MoviePlayer'>
            <iframe margin='auto' frameBorder="0" width='100%' height='100%' allowFullScreen
                    /*src={`https://www.youtube.com/watch?v=1XD2wk52-Cs&list=PLEbnTDJUr_IcPtUXFy2b1sGRPsLFMghhS&index=16`}*/
                 src={`https://videospider.stream/personal?key=${VID_API_KEY}&video_id=${movieId}&tmdb=1`}>
            </iframe>
            </div>
            </div>

            
            <div className='TrailerContainer'>
                    
                {trailers && trailers.map((trailer,index)=>{
                    console.log(trailer)
                    if((trailer.type=="Trailer" || trailer.type=="Teaser") && trailer.site=="YouTube")
                        return (<Trailer key={trailer.key} videoId = {trailer.key} />)
                 
                })
                }
               
              
            </div>
        
            { movie &&
            <div style = {{display:"flex",justifyContent:"flex-end",margin:'10px'}}>
                <Favourite userFrom={localStorage.getItem('userId')} movieInfo={movie}/>

            </div>
            }


            <Descriptions title="Movie Info" bordered>
                <Descriptions.Item label="Title">{movie.title}</Descriptions.Item>
                <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
                <Descriptions.Item label="Budget" >{formatter.format(movie.budget)}</Descriptions.Item>
                <Descriptions.Item label="Revenue">{formatter.format(movie.revenue)}</Descriptions.Item>
                <Descriptions.Item label="Runtime">{movie.runtime} minutes</Descriptions.Item>
                <Descriptions.Item label="Average Votes" span={2}> {movie.vote_average}</Descriptions.Item>
                <Descriptions.Item label="Vote Count">{movie.vote_count}</Descriptions.Item>
                <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
                <Descriptions.Item label="Popularity">{movie.popularity}</Descriptions.Item>
            </Descriptions>
            <br/>

     
            <br/>

            <div style = {{justifyContent:"center", display:"flex"}}>
                <Button onClick = {handleClick}> {showCastText} </Button>
            </div>
            <br/>
            <div style={{width:'100%',textAlign:'center'}}>
            {ToggleActor &&
            
                <Row gutter={[16,16]} style={{margin:'auto'}}>
                {crew && crew.map((crew,index)=>(
                    <React.Fragment>
                    {crew.profile_path &&  
                        <GridCard
                        actor
                        name = {crew.name}
                        character = {crew.character}
                        movieId = {movieId}
                        image = {`${IMG_URL}w154${crew.profile_path}`}
                        />
                    }
                
                    </React.Fragment>
                ))
                }

                </Row>
            }
            </div>
            <br/>
            <br/>

            <div style={{margin:'auto',width:'80%',marginTop:'5px',marginBottom:'10px'}}>
                <Comments commentList={commentList} movieId={movieId} updateComments={updateComments}/>
            </div>
        


        </div>
        

       
    );
}

export default MovieDetailPage;