import React from 'react';
import { Col } from 'antd';

function GridCard(props) {


    if(props.actor)
    {
        return (
            <Col  xl={4} lg={6} md={8} sm={12} xs={12}>
                <div style={{position:'relative'}}>
                <div className='GridCard'>
        
                    <img style={{width:'100%', borderTopLeftRadius:'23px',borderTopRightRadius:'23px'}} alt='No Image' src={props.image}/>
                    
                    <div style={{textAlign:'center'}}>
                      <div style={{fontSize:'12px'}}> <b>{props.name}</b> </div>
                       <div style={{fontSize:'11px'}}>{props.character}</div>
                    </div>

                </div>
                </div>
            </Col>
        );
    }
    else
    {
        return (
            <Col xl={4} lg={6} md={8} sm={8} xs={12}>
              
                <div  style={{position:'relative'}}>
                    <div className='GridCard'>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{ width:'100%', borderTopLeftRadius:'23px',borderTopRightRadius:'23px'}} alt='No Image' src={props.image}/>
                    <div style={{color:'black',fontSize:'11px',margin:'auto',textAlign:'center'}}>
                        <b>{props.title}</b>
                    </div>

                </a>
                </div>
                </div>

            </Col>
        );
    }

}

export default GridCard;