import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  const [target,setTarget] = useState('');

  const onClickSubmit=(event)=>{
    event.preventDefault();
    console.log()
    window.location.href = `/search/${target}`;
  }

  const handleOnInputChange =(event)=>{
    setTarget(event.target.value);
    // console.log(event.target.value);

  }

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Trailix</a>
      </div>
      <div className="menu__container" >
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div >
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        </div>
        
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer 
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
      <form onSubmit={onClickSubmit} className='search-form' style={{float:'right',height:'100%',color:'black'}}>
          <button className='form-submit-button' style={{float:'right'}} type='submit' >Search</button>
          <input className='search-input' style={{float:'right'}} type='text' name='target' onChange={handleOnInputChange}/>
      </form>
    </nav>
  )
}

export default NavBar