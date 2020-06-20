import React,{useState,useEffect} from 'react';
import './favourite.css';
import axios from 'axios';
import {Popover} from 'antd';
import { IMG_URL } from '../../Config';
import RowElement from './Sections/RowElement';

function FavouritePage(props) {

    const variables = {
        userFrom : localStorage.getItem('userId')
    }

    const [favourites,setFavourites] = useState([])

    const fetchFavourites = ()=>{
        axios.post('/api/favourite/getFavouriteMovies',variables)
        .then(response=> {
            if(response.data.success){
                console.log(response.data.doc)
                setFavourites(response.data.doc)
            }
            else{
                alert('failed to get favourite movies');
            }
        })

    }

    useEffect(()=>{
        fetchFavourites()
    },[])

    const onClickRemoveFromFavourite = (movieId)=>{
        const moviedata = {
            userFrom : localStorage.getItem('userId'),
            movieId : movieId
        }
        axios.post('/api/favourite/removeFromFavourites',moviedata)
        .then(response=>{
            if(response.data.success)
            {
                fetchFavourites()
            }
            else{
                alert('failed to remove from favourites')
            }
        })
    }

    const renderMovieTable = favourites.map((movie,index)=>{
        const content = (
            <div>
                {movie.movieImage ? 
                <img src = {`${IMG_URL}w300${movie.movieImage}`} alt = 'moviePost'/>
                :
                'no image'
                }
           
            </div>
        )
        return (
            <tr key = {movie.movieId}>
                
                <Popover content = {content} title = {movie.movieTitle}>
                    <td> <a style={{color:'black',fontWeight:'bold'}} href = {`/movie/${movie.movieId}`}>{movie.movieTitle}</a></td>
                </Popover>
                
                <td>{movie.movieRuntime}</td>
                <td><button onClick={()=>onClickRemoveFromFavourite(movie.movieId)}>remove</button></td>
            </tr>
        )
    })

    return (
        <div style = {{width:'90%',margin:'2rem auto'}}>
            <h3>My Favourite Movies</h3>
            <hr/>

            
            <div style={{width:'80%',margin:'auto'}}>
            {favourites.map((movie,index)=>{
                return (
                    <>
                    <RowElement key = {movie.movieId} onClickRemoveFromFavourite={onClickRemoveFromFavourite} movieImage = {`${IMG_URL}w154${movie.movieImage}`} movieTitle = {movie.movieTitle} movieRuntime={movie.movieRuntime} movieId={movie.movieId} />
                    </>
                )
            })}
            </div>
           

            {/* <table>
                <thead>
                    <tr>
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <th>Remove from Favourites</th>
                    </tr>
                    
                        
                        {renderMovieTable}
                        
                    
                </thead>
            </table> */}

        </div>
    );
}

export default FavouritePage;