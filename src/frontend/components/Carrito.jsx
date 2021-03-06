import React from 'react';
import { connect } from 'react-redux';
// import { desactiveCarrito } from '../';
// import { Link } from 'react-router-dom';
import Icon from './display/Icon';
import IncrementStepper from './forms/IncrementStepper';
import Button from './forms/Button';
import { addItemToCarrito, removeItemToCarrito, desactiveCarrito, setRedirect } from '../actions';

import '../assets/styles/components/Carrito.scss';
const App = ({ carrito, addItemToCarrito, removeItemToCarrito, desactiveCarrito, history, user, setRedirect })=> {

  let totalCarrito = 0;
  let totalPrecio = 0;
  carrito.data.forEach((element) => {
    totalCarrito += (element.cantidad);
    totalPrecio += (element.precio * element.cantidad);
  });

  const initPayHandler = ()=>{
    if (!user.email) {
      setRedirect('/compra');
    }
    history.push('/compra');
  };

  const addCarritoHandle = (id, cantidad)=>{
    addItemToCarrito({ serie: id.serie, title: id.title, precio: id.precio });
  };

  const subtractCarritoHandle = (id, cantidad)=>{
    removeItemToCarrito({ serie: id.serie, title: id.title, precio: id.precio });
    if (cantidad <= 0) {
      desactiveCarrito();
    }
  };

  return (
    <div className='carrito'>
      <div className='carrito__head'>
        <h1>Carrito de compras</h1>
        <div className='icon' onClick={desactiveCarrito} >
          <Icon width='30' height='30' />
        </div>
      </div>
      <div className='carrito__body'>
        {
          carrito.data[0] ?
            <table className='carrito__table'>
              <thead>
                <tr>
                  <th className='th__title'>Articulo</th>
                  <th className='th__button'>Cantidad</th>
                  <th className='th__precio'>Precio</th>
                </tr>
              </thead>
              <tbody>
                {carrito.data.map((e, index)=>{
                  return (
                    <tr key={index}>
                      <td className='td__title'>{e.title}</td>
                      <td className='td__button'>
                        {
                          !carrito.state >= 1 ?
                            <IncrementStepper text={false} setStartCount={e.cantidad} key={index} idHandler={{ serie: e.serie, title: e.title, precio: e.precio }} handlerAdd={addCarritoHandle} handlerSubtract={subtractCarritoHandle}/> :
                            <p>{e.cantidad}</p>
                        }
                      </td>
                      <td className='td__precio'>${e.precio}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className='td__title'>Total</td>
                  <td className='td__button'>{totalCarrito} unidades</td>
                  <td className='td__precio'>${totalPrecio}</td>
                </tr>
              </tfoot>
            </table> :
            <>
              <h1>Compra en progreso!</h1>
            </>
        }
      </div>
      <div className='carrito__footer'>
        {
          carrito.state >= 1 ?
            <Button onClick={initPayHandler} >Continuar pagando {carrito.data[0] ? `$${totalPrecio}` : ''}</Button> :
            <Button onClick={initPayHandler} >Pagar ${totalPrecio}</Button>
        }
      </div>
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
    carrito: state.carrito,
    user: state.user,
  };
};

const mapDispatchToProps = {
  addItemToCarrito,
  removeItemToCarrito,
  desactiveCarrito,
  setRedirect,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
