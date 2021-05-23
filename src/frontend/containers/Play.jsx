import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import HeaderB from '../components/Header-B';
// import Footer from '../components/Footer';
// import MainContent from '../components/MainContent';
// import Section from '../components/Section';
// import Title from '../components/Title';
// import Jugar from '../components/Jugar';
// import Carton from '../components/Carton';
// import '../assets/styles/App.scss';
// import { changeColorPlay } from '../actions';

import '../assets/styles/containers/Play.scss';
import '../assets/styles/components/Carton.scss';

const App = ({ user, history, play, misCartones, catalogos, socket }) => {

  if (!user.id) {
    history.push('/');
  };

  useEffect(()=>{

  }, []);

  return (
    <div className='play' >
      <HeaderB to='/' />

    </div>
  );

};

const mapStateToProps = (state)=>{
  return {
    misCartones: state.cartonesUser,
    catalogos: state.catalogos,
    play: state.play,
    user: state.user,
  };
};

const mapDispatchToProps = {
  // changeColorPlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
