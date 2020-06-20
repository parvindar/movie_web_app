import React,{useEffect,useState} from 'react';
import {Button} from 'antd';
import axios from 'axios';

function Favourite(props) {

    const [favouriteNumber,setFavouriteNumber] = useState(0);
    const [favourited,setFavourited] = useState(false);

    const variable={
        userFrom: props.userFrom,
        movieId:  props.movieInfo.id,
        movieTitle: props.movieInfo.title,
        movieImage: props.movieInfo.backdrop_path,
        movieRuntime: props.movieInfo.runtime
    };       

    // console.log('favourites : movie props : ',props)

    useEffect(()=>{

        console.log('favourites : movie variables : ',variable)
        axios.post('/api/favourite/favouriteNumber',variable)
        .then(response=>{
            if(response.data.success)
            {
                console.log('favouriteNumber: ',response.data.favouriteNumber);
                setFavouriteNumber(response.data.favouriteNumber);
            }
            else{
                alert('failed to get FavouriteNumber');
            }
        });

        axios.post('/api/favourite/favourited',variable)
        .then(response=>{
            if(response.data.success)
            {
                console.log('favourited: ',response.data.favourited)
                setFavourited(response.data.favourited);
            }
            else{
                alert('failed to get favourited');
            }
        });


    },[variable.movieId]);

    const onClickFavourite = () => {
        if (favourited) {
            //when we are already subscribed 
            axios.post('/api/favourite/removeFromFavourites', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavouriteNumber(favouriteNumber - 1)
                        setFavourited(false)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            // when we are not subscribed yet

            axios.post('/api/favourite/addToFavourites', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavouriteNumber(favouriteNumber + 1)
                        setFavourited(true)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }

    return (
        <div>
            <Button style={{width:'200px'}} onClick = {onClickFavourite}> {favourited ? 'Remove from Favourites' : 'Add to Favourites'} {favouriteNumber} </Button>
        </div>
    );
}

export default Favourite;