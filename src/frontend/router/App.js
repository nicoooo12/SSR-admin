import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '@containers/Home';
import Cartones from '@containers/Cartones';
import Ordenes from '@containers/Ordenes';
import Play from '@containers/Play';
import SignIn from '@containers/SignIn';
import SignUp from '@containers/SignUp';
// import Notfound from '@containers/Notfound';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { updateState } from '../actions';

import '../assets/styles/App.scss';

const App = ({ isLogged, updateState }) => {
  const socket = io();
  socket.on('change', ()=>{
    console.log('[changes in the State of socket]');
    updateState();
    socket.emit('ok');
  });
  socket.on(isLogged ? isLogged : 'change-noSignIn', ()=>{
    console.log('[changes in the State of socket]');
    updateState();
    socket.emit('ok');
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route exact path='/pruebas' component={Pruebas} /> */}
        {/* <Route exact path='/catalogo' component={Catalogo} />  */}
        {/* <Route exact path='/compra' component={Compra} /> */}
        <Route exact path='/ordenes' component={Ordenes} />
        <Route exact path='/cartones' component={Cartones} />
        <Route exact path='/play' render={(props) => <Play socket={socket} {...props} />} />
        <Route exact path='/sign-in' render={(props) => <SignIn socket={socket} {...props} />}/>
        <Route exact path='/sign-up' component={SignUp} />
        {/* <Route component={Notfound} /> */}
      </Switch>
    </BrowserRouter>);
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  updateState,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
