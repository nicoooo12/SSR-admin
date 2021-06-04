import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import HeaderB from '../components/Header-B';
// import MainContent from '../components/MainContent';
// import Section from '../components/Section';
// import Title from '../components/Title';
// import Button from '../components/forms/Button';
// import ButtonIcon from '../components/forms/ButtonIcon';
import Carton from '../components/Carton';
import Modal from '../components/modal';
import { updatePlay, getUser } from '../actions';

import '../assets/styles/containers/Play.scss';
import '../assets/styles/components/Carton.scss';

const App = ({ user, history, play, updatePlay, catalogos, socket, getUser }) => {

  const [estado, setEstado] = useState(0);
  const [serie, setSerie] = useState(1);
  const [mode, setMode] = useState(1);

  const [lanzados, setLanzados] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [bingo, setBingo] = useState([]);
  const [userBingo, setUserBingo] = useState({});

  const selectCarton = useRef('');
  const lanzar = useRef('');
  const selectMode = useRef('');

  const emailUser = useRef('');

  if (!user.id) {
    history.push('/');
  };

  const changeStateHandler = (e) =>{
    setEstado(e);
    updatePlay({ estado: e });
    // console.log('changeStateHandler', e);
    socket.emit('play', e, serie);
  };
  const changeSerieHandler = () =>{
    // console.log(estado);
    const val = selectCarton.current.selectedOptions[0].attributes[0].value;
    const val2 = selectMode.current.selectedOptions[0].attributes[0].value;
    setSerie(+val);
    setMode(+val2);
    socket.emit('play', estado, +val);
  };
  useEffect(()=>{
    socket.removeAllListeners();
    socket.on('connectPlay', (id)=>{
      socket.emit('connecting', id, estado, serie);
    });
    socket.on('returnGetState', (data)=>{
      setLanzados(data);
    });
    socket.on('lanzado', (data)=>{
      console.log('owo');
      lanzar.current.disabled = false;
      // console.log(data);
      setLanzados(data);
    });
    socket.on('play', (username, data, number, id)=>{
      // console.log(bingo);
      // console.log([...bingo, { username, data, number, id }]);
      setBingo([...bingo, { username, data, number, id }]);
    });
  }, [lanzados, bingo, serie, estado]);

  const getUserHandler = () => {
    // console.log(emailUser);
    getUser(emailUser.current.value, (e)=>{
      console.log(e.data.data);
      setUserBingo(e.data);
    });
  };

  return (
    <div className='play' >
      <HeaderB to='/' />
      <div className='card w-75 m-10'>
        <h1>Config</h1>
        <div className='d-flex flex-row'>
          <div className='w-50' >

            <select className='form-select m-1' aria-label='Default select example' ref={selectCarton}>
              { catalogos.map((e, index)=>{
                return (<option key={index} serie={e.serie}>{e.titulo}</option>);
              }) }
            </select>

            <select className='form-select m-1' aria-label='Default select example' ref={selectMode}>
              <option serie='1'>Linea</option>
              <option serie='2'>Carton completo</option>
            </select>
            <button className='btn btn-primary m-1' onClick={()=>{changeSerieHandler(1);}}>Change</button>

          </div>
          <div className='w-50 d-flex justify-content-end flex-row flex-wrap'>
            <div className={`${estado === 0 ? 'bg-danger' : estado === 1 ? 'bg-warning' : 'bg-success'} w-75 badge`} style={{ height: '20px' }} >{estado}</div>
            <div className={`${estado === 0 ? 'bg-danger' : estado === 1 ? 'bg-warning' : 'bg-success'} w-75 badge`} style={{ height: '20px' }} >
              <span className='m-1' >Carton</span>
              <span className='m-1' >Mode</span>
            </div>
            <div className={`${estado === 0 ? 'bg-danger' : estado === 1 ? 'bg-warning' : 'bg-success'} w-75 badge`} style={{ height: '20px' }} >
              <span className='m-1' >{serie}</span>
              <span className='m-1' >{mode}</span>
            </div>
            <div className='btn-group me-2' role='group' aria-label='First group'>
              <button type='button' className='btn btn-danger' onClick={()=>{changeStateHandler(0);}} >Off</button>
              <button type='button' className='btn btn-warning' onClick={()=>{changeStateHandler(1);}} >Waiting</button>
              <button type='button' className='btn btn-success' onClick={()=>{changeStateHandler(2);}} >Play!</button>
            </div>
          </div>
        </div>
      </div>
      <div className='card w-75 m-10'>
        <h1>Control</h1>
        <div className='d-flex flex-row'>
          <div className='w-50' >
            <button className='btn btn-primary m-1' onClick={()=>{socket.emit('Init', serie, mode);}}>Start</button>
            <button className='btn btn-primary m-1' onClick={()=>{socket.emit('Lanzar', lanzados);lanzar.current.disabled = true;}} disabled={bingo.length !== 0} ref={lanzar}>Throw</button>
            <button className='btn btn-success m-1' onClick={()=>{socket.emit('GetState');}}>Get State</button>
            <button className='btn btn-success m-1' onClick={()=>{socket.emit('SendState', lanzados);}}>Send State</button>
            <button className='btn btn-success m-1' onClick={()=>{socket.emit('Re-count');}}>Re-count</button>
            <button className='btn btn-success m-1' onClick={()=>{socket.emit('BingoS', 'Alguien');}} >Bingo!</button>
            <button className='btn btn-success m-1' onClick={()=>{socket.emit('BingoReject');}} >Reject Bingo</button>
            <button className='btn btn-secondary m-1' onClick={()=>{socket.emit('End');}}>Finish</button>
            <button className='btn btn-secondary m-1' onClick={()=>{socket.emit('Reset');}} disabled={estado === 2}>Reset</button>

            <div className='card' >
              <h1>
                bingos request ({bingo.length})
                <button
                  className='btn btn-primary'
                  onClick={
                    ()=>{
                      setBingo([]);
                    }
                  }
                >Reject all Request</button>
              </h1>
              <ul className='list-group'>
                {bingo.map((e, index)=>{
                  return (
                    <li key={index} className='list-group-item'>
                      {e.username}
                      <div className='d-inline m-1'>
                        <Modal btn='Watch' >
                          <Carton
                            lanzados={lanzados}
                            data={e.data}
                            serie={e.serie}
                          />
                        </Modal>
                      </div>
                      <div className='btn-group ms-4' role='group' aria-label='Second group'>
                        <button type='button' className='btn btn-warning ' onClick={()=>{socket.emit('BingoS', e.username);}} >Show</button>
                        {/* <button type='button' className='btn btn-primary '>Watch</button> */}
                        <button
                          type='button'
                          className='btn btn-danger'
                          onClick={() => {
                            socket.emit('BingoReject', e.id, e.number);
                            setBingo(bingo.filter((o, i)=>i !== index));
                            // console.log(bingo.filter((o, i)=>i !== index));
                          }}
                        >Reject</button>
                        <button type='button' className='btn btn-success' onClick={socket.emit('BingoGanador', e.username)}>Bingo</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
          <div className='w-50' >

            <div className='card'>
              <h1>Search User</h1>
              <input type='email' className='form-control m-1' id='exampleFormControlInput1' placeholder='email' ref={emailUser} />
              {/* <input type='text' className='form-control m-1' id='exampleFormControlInput3' placeholder='username' /> */}
              <button className='btn btn-primary m-1' onClick={getUserHandler}>Search</button>
            </div>
            {
              userBingo.name ?
                <>
                  <h1>{userBingo.name}</h1>
                  <button className='btn btn-primary m-2' onClick={()=>{socket.emit('BingoGanador', userBingo.name);}}>win</button>
                  <button className='btn btn-primary m-2' onClick={()=>{socket.emit('Reject', '29293821'); setUserBingo({});}}>Reject</button>
                </> : <></>
            }
            {
              userBingo.name ?
                userBingo.carton.map((e, index)=>{
                  return (
                    <Carton
                      key={index}
                      lanzados={lanzados}
                      data={e.data}
                      serie={e.serie}
                    />);
                }) : <></>
            }
          </div>
        </div>
      </div>
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
  updatePlay,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
