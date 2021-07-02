import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// import Header from '../components/Header-A';
// import Carrusel from '../components/Carrusel';
import ButtonIcon from '../components/forms/ButtonIcon';
import Button from '../components/forms/Button';
// import RegisterPanel from '../components/RegisterPanel';
import { updateState } from '../actions';
import { Link } from 'react-router-dom';
import Icon from '../components/display/Icon';
import Card from '../components/display/Card';

// import Img1 from '../assets/images/B.png';

import '../assets/styles/containers/menu.scss';
import '../assets/styles/containers/Home.scss';
const App = ({ user, updateState })=> {
  const [first, setFirst] = useState(true);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);
  const [menu, setMenu] = useState(false);
  const [focusHeader, setFocusHeader] = useState(true);
  let observer;
  useEffect(()=>{
    observer = new IntersectionObserver((entry, observer)=>{
      if (entry[0].isIntersecting) {
        setFocusHeader(true);
      } else {
        setFocusHeader(false);
      }
    });
    observer.observe(document.querySelector('.headerHome'));
  }, [observer]);

  const menuHandler = ()=>{
    if (menu) {
      setMenu(false);
      setFocusHeader(true);
    } else {
      setMenu(true);
      setFocusHeader(true);
    }
  };

  const logoutHandler = ()=>{
    console.log('oli');
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    updateState();
    setMenu(false);
    setFocusHeader(true);
  };

  return (
    <>
      {
        menu ?
          <div className='menu'>
            <div>
              <h1>Bingoloteando</h1>
              <div onClick={menuHandler}>
                <Icon width='30' height='30' />
              </div>
            </div>
            <ul>
              {
                user.id ?
                  <>
                    {/* <li>
                      Cuenta
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/cuenta'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li> */}
                    <li>
                      Jugar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/play'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Salir de mi cuenta
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <ButtonIcon size='small' typebutton='subtle' onClick={logoutHandler} />
                      </div>
                    </li>
                  </> :
                  <>
                    <li>
                      Ingresar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/sign-in'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                  </>
              }
            </ul>
          </div> :
          <>
            {
              focusHeader ?
                <>
                  <div className='contentLibre-off'> </div>
                </> :
                <>
                  <div className='contentLibreHome'>
                    <h1>Bingoloteando</h1>
                    <div className='lastIcon' onClick={menuHandler}>
                      <Icon type='list' width='24' height='24'/>
                    </div>
                  </div>
                </>
            }
            <header className='headerHome'>
              <div className='contentHeaderHome'>
                <div className='banner'> </div>
                <div className='content'>
                  <h1>Bingoloteando</h1>
                  <div className='lastIcon' onClick={menuHandler}>
                    <Icon type='list' width='24' height='24'/>
                  </div>
                </div>
                <div className='info'>
                  {/* <h1>Titulo Evento</h1> */}
                  <p>Area de administración</p>
                  <Card>
                    {/* <div className='circule' >
                      <div>
                        <div>
                          <img src={Img1}/>
                        </div>
                      </div>
                    </div> */}
                    {
                      user.id ?
                        <>
                          <div className='contentItem'>
                            <Link to='pedidos'>
                              <div className='itemHome'>
                                <p>Pedidos</p>
                              </div>
                            </Link>
                            <Link to='play'>
                              <div className='itemHome'>
                                <p>Juego</p>
                              </div>
                            </Link>
                            <Link to='db'>
                              <div className='itemHome'>
                                <p>db crudo</p>
                              </div>
                            </Link>
                            <Link to='config'>
                              <div className='itemHome'>
                                <p>config</p>
                              </div>
                            </Link>
                          </div>
                        </> :
                        <>
                          <p>Para comprar tus cartones y poder jugar debes crear primero una cuenta.</p>
                          <div>
                            {/* <Link to='/sign-up'>
                              <Button>Register</Button>
                            </Link> */}
                            <Link to='/sign-in'>
                              <Button typebutton='secondary'>Ingresar</Button>
                            </Link>
                          </div>
                        </>
                    }
                  </Card>
                </div>
              </div>
            </header>
          </>
      }
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  updateState,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
