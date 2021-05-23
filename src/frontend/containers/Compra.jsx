import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Pageination from '../components/forms/Pageination';
import { statusNextCarrito, setStatusCarrito, setRedirect, createOrden, createCanvasOrden } from '../actions';
import Button from '../components/forms/Button';
import Icon from '../components/display/Icon';
import Footer from '../components/Footer';

// import config from '../../../config';
// import MainContent from '../components/MainContent';
// import Title from '../components/Title';
import Auth from './SignIn';
// import Tarjeta from '../components/Tarjetas';
// import Carrito from '../components/Carrito';
// import Carrito from '../components/Carrito';
// import { Link } from 'react-router-dom';
import '../assets/styles/containers/Compra.scss';

const App = ({ infoPago, misOrdenes, history, createCanvasOrden, createOrden, user, carrito, setStatusCarrito, statusNextCarrito, setRedirect })=> {
  const [first, setFirst] = useState(true);
  useEffect(()=>{
    if (first) {
      setFirst(false);
      document.querySelector('#react').scrollTo(0, 0);
    }
  }, []);
  const inputImg = useRef('');
  const canvasImg = useRef('');
  const Img = useRef('');
  const form = useRef('');
  const [errImg, setErrImg] = useState(false);
  const [ImgSrc, setImgSrc] = useState('');
  // const [data, setData] = useState('');
  const nextHandler = (num)=>{
    if (num || num === 0) {
      setStatusCarrito(num + 1);
    } else {
      statusNextCarrito();
    }
  };

  // console.log(misOrdenes);

  const startPay = ()=>{
    if (!misOrdenes.user) {
      console.log('[startPay]');
      let totalPago = 0;
      const carro = carrito.data.map((e)=>{
        totalPago += (e.precio * e.cantidad);
        return { serie: e.serie, cantidad: e.cantidad };
      });
      createOrden(carro, totalPago);
    }
  };

  const endHandler = ()=>{
    const form = document.forms.namedItem('updateImg');
    form.submit();
    // const formData = new FormData(document.forms.namedItem('updateImg'));
    // console.log('[ssdsdfsd]', formData.getAll('imagen'));
    // // console.log(inputImg.current.files[0]);
    // // const formData = new FormData();
    // // formData.append('Image', inputImg.current.files[0]);
    // // console.log(formData);
    // createCanvasOrden(formData.getAll('imagen'), ()=>{
    //   // console.log('redirect!');
    //   // history.push('/ordenes');
    // }, (err)=>{
    //   console.log(err);
    // });
  };

  const handleOnLoad = ()=>{
    setRedirect('');
  };

  const handleImg = ()=>{

    // const imageLoaded = ()=>{

    //   // let CanvasHeight;
    //   // let CanvasWidth;

    //   // if (window.outerWidth <= 425) {
    //   //   CanvasHeight = 500;
    //   //   CanvasWidth = 300;
    //   // } else {
    //   //   CanvasHeight = 300;
    //   //   CanvasWidth = 500;
    //   // }
    //   const resto = 20;
    //   canvasImg.current.width = ((img.width * resto) / 100);
    //   canvasImg.current.height = ((img.height * resto) / 100);

    //   const ctx = canvasImg.current.getContext('2d');
    //   ctx.drawImage(img, 0, 0, ((img.width * resto) / 100), (((img.height * resto) / 100)));
    //   const urlA = canvasImg.current.toDataURL('image/jpeg', 1);
    //   console.log('length::', urlA.length);
    //   if (urlA.length > 250000) {
    //     setErrImg(true);
    //   } else {
    //     setErrImg(false);
    //     setData(urlA);
    //     Img.current.src = urlA;
    //     setImgSrc(urlA);
    //   }
    // };

    const createImage = ()=>{
      console.log('create');
      img = new Image();
      img.onload = ()=>{
        Img.current.src = fr.result;
        setImgSrc(fr.result);
      };
      img.src = fr.result;
    };

    console.log(inputImg);
    console.log(inputImg.current.files);
    const file = inputImg.current.files[0];
    console.log(file);
    const fr = new FileReader();
    let img;
    fr.onload = createImage;
    fr.readAsDataURL(file);

    // console.log(fr);

  };

  let contentHeader;
  // console.log(carrito);
  switch (carrito.state) {
    case 0:
      if (!carrito.data[0]) {
        history.push('/catalogo');
      }
      contentHeader = (<>
        <h1>Pago con Transferencia.</h1>
        <p>Para realizar el pago deberá realizar una transferencia electrónica (Datos de la transacción se presentarán a continuación) y posteriormente mandarnos un comprobante de esta transacción. Sus cartones sólo serán liberados una vez que nos envíe este comprobante.</p>
        <Button onClick={statusNextCarrito}>Iniciar Pago</Button>
      </>);
      break;
    case 1:
      contentHeader = (<>
        <h1>Datos<br/>bancarios.</h1>
        { startPay() }
        <table className='bank__table'>
          <thead>
            {/* <tr>
              <th className='th__start'>Correo </th>
              <th className='th__end'>example@example.com</th>
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <td className='td__start'>Numero de cuenta:</td>
              <td className='td__end'>{infoPago.numeroCuenta}</td>
            </tr>
            <tr>
              <td className='td__start'>Rut:</td>
              <td className='td__end'>{infoPago.rut}</td>
            </tr>
            <tr>
              <td className='td__start'>Titular:</td>
              <td className='td__end'>{infoPago.titular}</td>
            </tr>
            <tr>
              <td className='td__start'>Banco:</td>
              <td className='td__end'>{infoPago.banco}</td>
            </tr>
            {/* <tr>
              <td className='td__start'>Comentario en la transferencia (Poner en el espacio de comentario)</td>
              <td className='td__end'>Pago de cartones Bingoloteando, [Nombre] pago $[monto]</td>
            </tr> */}
          </tbody>
          <tfoot>
            <tr>
              <td className='td__start'>Monto a Pagar: </td>
              <td className='td__end'>$10000</td>
            </tr>
          </tfoot>
        </table>
        <Pageination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={0} nextHandler={nextHandler} />
      </>);
      break;
    case 2:
      contentHeader = (<>
        <h1>Subir<br/>Comprobante.</h1>
        <form ref={form} name='updateImg' method='post' encType='multipart/form-data' action='http://localhost:3000/api/images/upload' >
          <div className='subirArchivo'>
            <input
              type='file'
              id='file'
              style={{ opacity: 0 }}
              ref={inputImg}
              name='image'
              accept='image/png, image/jpeg'
              onChange={handleImg}
            />
            <label htmlFor='file'>
              {errImg ? <h1>Tu archivo pesa demasiado! :C <br/> intenta recortar o redimensionar la imagen</h1> : <></>}
              {/* { console.log('[input]', inputImg, inputImg.current !== null) } */}
              { ImgSrc ?
                <>
                  <img ref={Img} src={ImgSrc}/>
                  {/* <p>Nos atrapaste! Tuvimos que reducir la calidad de la imagen... Revisa que se vea bien y presiona Finalizar</p> */}
                </> :
                <>
                  <img ref={Img} src={ImgSrc} />
                  <div>
                    <Icon type='upLoad' height='40' width='40' />
                    Subir Archivo
                  </div>
                </>
              }
            </label>
          </div>
          <button type='submit'>enviar</button>
        </form>
        <Pageination disabled={(!ImgSrc)} content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={1} nextHandler={nextHandler} end={endHandler} />
      </>);
      break;
    default:
      contentHeader = (<>
        <h1>Error.</h1>
        <p> </p>
      </>);
      break;
  };

  return (
    <>
      {
        carrito.state >= 1 & !user.id ?
          <Auth history={history} notRedirect /> :
          <div className='compras' onLoad={handleOnLoad}>
            <Header title='Pagar' to='catalogo' >
              <canvas id='canvas' ref={canvasImg} style={{ display: 'none' }}> </canvas>
              {contentHeader}
            </Header>
            <Footer/>
          </div>
      }
    </>
  );

};

const mapStateToProps = (state)=>{
  return {
    carrito: state.carrito,
    user: state.user,
    misOrdenes: state.ordenes.enProgreso,
    // state: state,
    infoPago: state.infoPago,
  };
};

const mapDispatchToProps = {
  createOrden,
  statusNextCarrito,
  setStatusCarrito,
  setRedirect,
  createCanvasOrden,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
