import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import HeaderB from '../components/Header-B';
// import Header from '../components/Header';
// // import Carton from '../components/Carton';
// import Titulo from '../components/Title';
// import Button from '../components/forms/Button';
// import { Link } from 'react-router-dom';

import '../assets/styles/containers/Ordenes.scss';

const App = ({ user, history, catalogo, ordenes })=> {
  const [first, setFirst] = useState(true);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);
  if (!user.id) {
    history.push('/');
  }

  const [activeOrden, setActiveOrden] = useState(false);
  const [idOrden, setIdOrden] = useState('');
  //console.log(enProgreso, terminadas);

  return (
    <>
      <HeaderB to='/' />
      <div className='card p-3 w-100'>
        <h1>Pedidos</h1>
        {
          activeOrden ?
            <>
              <div className='card w-50'>
                <ul className='list-group'>
                  <li className='list-group-item'>
                    User: {idOrden}
                  </li>
                  <li className='list-group-item'>
                    Estado: {idOrden}
                  </li>
                  <li className='list-group-item'>
                    Compra: {idOrden}
                  </li>
                  <li className='list-group-item'>
                    Imagen: {idOrden}
                  </li>
                  <li className='list-group-item'>
                    Total pago: {idOrden}
                  </li>
                  <li className='list-group-item'>
                    Comentario: {idOrden}
                  </li>
                </ul>
              </div>
              <div className='card w-100'>
                uwu
                <button className='btn btn-secondary' onClick={()=>{setActiveOrden(false);}}>volver</button>
              </div>
            </> :
            <>
              <div className=''>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>User</th>
                      <th scope='col'>Code</th>
                      <th scope='col'>Estado</th>
                      <th scope='col'>Compra</th>
                      <th scope='col'>Imagen</th>
                      <th scope='col'>Total pago</th>
                      <th scope='col'>Comentario</th>
                      <th scope='col'> </th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      ordenes.map((e, index)=>{

                        return (
                          <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{e.username}</td>
                            <td>{e.code}</td>
                            <td>{e.estado === 2 ? 'iniciada' : 'En revisión'}</td>
                            <td>
                              <ul>
                                {
                                  e.compra.map((i, index2)=>{
                                    // console.log(i);
                                    return (
                                      <li key={index2}>
                                        {catalogo.filter((o)=>{return o.serie === i.serie;})[0].titulo}: {i.cantidad}
                                      </li>
                                    );
                                  })
                                }
                              </ul>
                            </td>
                            <td>
                              {e.canvasUrl ?
                                <>
                                  <a href={e.imgUrl} target='_blank' rel='noopener noreferrer'>Open</a>
                                </> :
                                <>false</>
                              }
                            </td>
                            <td>${e.totalPago}</td>
                            <td className='w-25'>{e.message ? e.message : 'No mensaje' }</td>
                            <td>
                              <button className='btn btn-primary d-flex m-1' onClick={()=>{setActiveOrden(true); setIdOrden(e._id);}}>Editar Orden</button>
                              {/* <button className='btn btn-warning d-flex m-1' >Agregar Comentario</button> */}
                              {/* <button className='btn btn-success d-flex m-1' >Finalizar Orden</button> */}
                            </td>
                          </tr>
                        );

                      })
                    }

                  </tbody>
                </table>
              </div>
            </>
        }
      </div>
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
    ordenes: state.ordenes,
    catalogo: state.catalogos,
  };
};

const mapDispatchToProps = {
  // updateState,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
