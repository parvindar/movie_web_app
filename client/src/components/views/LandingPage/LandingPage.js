import React, { useEffect,useState } from 'react'
import { API_URL,API_KEY, IMG_URL } from "../../Config";

import { Typography,Row,Button } from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';
import './LandingPage.css'

const {Title} = Typography

function LandingPage() {

    const [Movies,setMovies] = useState([]);
    const [topMovies,setTopMovies] = useState([]);
    const [CurrentPage,setCurrentPage] = useState(1);
    const [featured,setFeatured] = useState(0);
    const [trailer,setTrailer] = useState([]);
 

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
        fetch(endpoint)
        .then(response=> response.json())
        .then(response=> {
            console.log('first fetch : ',response);
            setMovies(Movies.concat(response.results))
            setTopMovies(response.results);
            setCurrentPage(response.page);
        })
    },[]);

    useEffect(()=>{
        console.log('TOP MOVIES',topMovies);
        if(topMovies.length !=0)
        {
            console.log('topMovies : ',topMovies);
            fetch(`${API_URL}movie/${topMovies[0].id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response=>response.json())
            .then(response=>{
                console.log('MovieTrailers 1 : ',response);
                setTrailer(trailer.concat(response.results[0]));
            }).then(()=>{
                fetch(`${API_URL}movie/${topMovies[1].id}/videos?api_key=${API_KEY}&language=en-US`)
                .then(response=>response.json())
                .then(response=>{
                    console.log('MovieTrailers 2: ',response);
                    setTrailer(prevvalue => prevvalue.concat(response.results[0]));
                })
            })

            
        }


    },[topMovies])

    const fetchMovies=(path)=>{
        fetch(path)
        .then(response=> response.json())
        .then(response=> {
            console.log(response);
            setMovies(Movies.concat(response.results));
            setCurrentPage(response.page);
        })    
    }

    const handleClick = ()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}&include_adult=false`;
        fetchMovies(endpoint);
    }


    const updateFeatured = ()=>{
        let i = featured;
        i++;
        if(i>1)
            i=0;
        setFeatured(i);
    
        clearInterval(interval)
        
    }
    const interval = setInterval(updateFeatured,60000);






    

    return (

        <div >
            {console.log('featured trailers : ',trailer) }
           
            {trailer[1] && <MainImage video videoId={trailer[featured].key} image={`${IMG_URL}w1280${topMovies[featured].backdrop_path}`} title={topMovies[featured].title} text={topMovies[featured].overview}/>}
           


        <div style = {{width:'85%',margin:'1rem auto'}}>
            <Title level={2}>Popular Movies</Title>
        </div>
        <hr/>
       
        <div style = {{width:'100%',display:'inline-block' ,textAlign:'center'}}>
        <Row gutter={[16,16]}  style={{width:'100%',margin:'0',display:'inline-block'}}>
        
            {Movies && Movies.map((movie,index)=>{
                
                if(movie.poster_path && !movie.poster_path.includes('undefined')) {
                  
                    return (
                <React.Fragment key={index}>
                     
                    <GridCard 
                    image = {movie.poster_path && `${IMG_URL}w185${movie.poster_path}`}
                    movieId={movie.id}
                    title = {movie.title}
                    />
                </React.Fragment>)}
                else{
                return <></>
                }
               
            })}
        </Row>
        </div>
       

        
        <br/>

        {/* Load More Button */}
        <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
            <Button onClick={handleClick}>Load More</Button>
        </div>

        </div>
    )
}

export default LandingPage
