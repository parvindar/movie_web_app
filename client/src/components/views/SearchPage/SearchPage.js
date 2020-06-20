import React, { useState, useEffect } from 'react';
import {Row,Col} from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import {API_KEY, API_URL, IMG_URL } from '../../Config';

function SearchPage(props) {
    
    const target = props.match.params.query;
    const [movies,setMovies] = useState([]);
    const [page,setPage] = useState(1);
    let endpoint=''
    useEffect(()=>{
        endpoint=`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${target}`;
        fetchMovies();
    },[])

    const fetchMovies=()=>{
        fetch(endpoint).then(response=>response.json())
        .then(response=>{
            console.log(response);
            setMovies(response.results);
        })
    }

    const renderMovies = (
        <Row gutter={[16,16]} style={{width:'100%'}} >
            {movies.map((movie,index)=>{
                if(movie.poster_path) return (
                <GridCard
                    key = {movie.id}
                    movieId = {movie.id}
                    title = {movie.title}
                    image = {`${IMG_URL}w185${movie.poster_path}`}
                />
                
            )})}
        </Row>
    )

    return (
        <div>
            <div style={{ paddingLeft:'10px',paddingTop:'10px'}}>
            <h2>{target} Movies</h2>
            </div>
            <hr/>
            <br/>
            <div>
            {movies && renderMovies}
            </div>

        </div>
    );
}

export default SearchPage;