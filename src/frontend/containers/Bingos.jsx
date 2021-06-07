import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const App = ({ user, history, catalogo, socket })=> {
  if (!user.id) {
    history.push('/');
  }

  const [lanzados, setLanzados] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [restantes, setRestantes] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [recuento, setRecuento] = useState([]);
  const [message, setMessage] = useState({ active: false, title: '', text: '' });
  const [colorP, setColorP] = useState('black');
  const [colorS, setColorS] = useState('#ED2E7E');
  const [titulo, setTitulo] = useState('-');
  const [premio, setPremio] = useState('-');
  const [ultimaA, setUltimaA] = useState('-');
  const [ultimaB, setUltimaB] = useState('-');
  const [ultimaC, setUltimaC] = useState('-');
  const [ultimaA2, setUltimaA2] = useState('');
  const [ultimaB2, setUltimaB2] = useState('');
  const [ultimaC2, setUltimaC2] = useState('');
  const [reCount, setReCount] = useState(0);
  const bg = '#F7F7FC';

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const lanzar = async (lanzados) => {
    console.log('lanzar...');
    // console.log(lanzados);
    let change;
    const lanzadosFiltrado = lanzados.map((e, index)=>{
      return { value: e, index };
    }).filter((e)=>{
      return e.value === 0;
    });
    // console.log(lanzadosFiltrado, lanzadosFiltrado.length);
    for (let i = 0; i <= 35; i++) {
      let numeroAleatorio = Math.random() * (lanzadosFiltrado.length - 1);
      // console.log(+numeroAleatorio);
      numeroAleatorio = Math.round(numeroAleatorio);
      setRestantes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        .map((e, index)=>{
          return index === lanzadosFiltrado[numeroAleatorio].index ? 1 : e;
        }));
      await sleep((i * 5) + 10);
      if (i === 35) {
        change = lanzados.map((e, index) => {
          return index === lanzadosFiltrado[numeroAleatorio].index ? 1 : e;
        });
        await sleep(1000);
        setUltimaC(ultimaB);
        setUltimaC2(ultimaB2);
        setUltimaB(ultimaA);
        setUltimaB2(ultimaA2);
        let ult2;
        if ((lanzadosFiltrado[numeroAleatorio].index + 1) <= 15) {
          ult2 = 'B';
        } else if ((lanzadosFiltrado[numeroAleatorio].index + 1) <= 30) {
          ult2 = 'I';
        } else if ((lanzadosFiltrado[numeroAleatorio].index + 1) <= 45) {
          ult2 = 'N';
        } else if ((lanzadosFiltrado[numeroAleatorio].index + 1) <= 60) {
          ult2 = 'G';
        } else {
          ult2 = 'O';
        }
        setUltimaA2(ult2);
        setUltimaA(lanzadosFiltrado[numeroAleatorio].index + 1);
        setRecuento([...recuento, `${ult2}${(lanzadosFiltrado[numeroAleatorio].index + 1)}`]);
      }
    }
    // console.log(change);
    setRestantes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setLanzados(change);
    socket.emit('Lanzado', change);
  };

  useEffect(()=>{
    socket.removeAllListeners();
    // console.log('hi world');
    socket.emit('soyBingo');
    socket.on('init', (serie, numPremio)=>{
      const play = catalogo.filter((e)=>{return e.serie === serie;})[0];
      console.log(play, numPremio);
      setPremio(play.premios[numPremio - 1].nombre);
      setColorP(play.color);
      setColorS('wheat');
      setTitulo(play.titulo);
    });
    socket.on('lanzar', ()=>{
      lanzar(lanzados);
    });
    socket.on('end', ()=>{
      setColorP('black');
      setColorS('black');
      setMessage({ active: false, title: '', text: '' });
    });
    socket.on('sendState', (data)=>{
      setLanzados(data);
    });
    socket.on('reset', ()=>{
      setLanzados([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setRestantes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setColorP('black');
      setColorS('black');
      setTitulo('-');
      setPremio('-');
      setUltimaA('-');
      setUltimaB('-');
      setUltimaC('-');
      setUltimaA2('');
      setUltimaB2('');
      setUltimaC2('');
      setMessage({ active: false, title: '', text: '' });
    });

    socket.on('getState', ()=>{
      socket.emit('ReturnGetState', lanzados);
    });

    socket.on('bingo', (user)=>{
      setMessage({ active: true, title: `${user} dice Bingo!! ✨`, text: 'Estamos revisando el carton...' });
    });

    socket.on('re-count', ()=>{
      if (reCount < recuento.length) {
        setReCount(reCount + 1);
        setMessage({ active: true, title: recuento[reCount], text: '' });
        console.log(reCount);
      } else {
        setReCount(0);
        setMessage({ active: false, title: '', text: '' });
      }
    });

    socket.on('bingoReject', async ()=>{
      if (message.active) {
        setMessage({ active: true, title: 'oops! parece que no 🤷‍♂️', text: 'Suerte para la proxima!' });
        await sleep(3000);
        setMessage({ active: false, title: '', text: '' });
      }
    });

    socket.on('bingoGanador', async (user)=>{
      setMessage({ active: true, title: `Felicidades! ${user} es el ganador de esta ronda`, text: `Premio: ${premio}` });
    });

  }, [lanzados, message]);

  return (
    <>
      <div className='mx-5' id='cp' >
        <div className='item-center align-middle' style={{ position: 'relative', height: '470px', width: '1702px', marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: 'all 1s' }}>
          { message.active ?
            <>
              <h1>{message.title}</h1>
              <p>{message.text}</p>
            </> :
            <table className='table tb-border table-bordered align-middle' style={{ height: '100%', fontSize: '35px', border: colorP }}>
              <tbody style={{ textAlign: 'center' }}>
                <tr>
                  <td scope='col' className='color' style={{ backgroundColor: colorP, color: 'white', fontWeight: 'bold' }}>B</td>
                  <td scope='col' className='num' style={{ background: restantes[0] === 1 ? colorS : lanzados[0] === 1 ? colorP : bg, color: restantes[0] === 1 ? 'white' : lanzados[0] === 1 ? 'white' : 'black' }} >1</td>
                  <td scope='col' className='num' style={{ background: restantes[1] === 1 ? colorS : lanzados[1] === 1 ? colorP : bg, color: restantes[1] === 1 ? 'white' : lanzados[1] === 1 ? 'white' : 'black' }} >2</td>
                  <td scope='col' className='num' style={{ background: restantes[2] === 1 ? colorS : lanzados[2] === 1 ? colorP : bg, color: restantes[2] === 1 ? 'white' : lanzados[2] === 1 ? 'white' : 'black' }} >3</td>
                  <td scope='col' className='num' style={{ background: restantes[3] === 1 ? colorS : lanzados[3] === 1 ? colorP : bg, color: restantes[3] === 1 ? 'white' : lanzados[3] === 1 ? 'white' : 'black' }} >4</td>
                  <td scope='col' className='num' style={{ background: restantes[4] === 1 ? colorS : lanzados[4] === 1 ? colorP : bg, color: restantes[4] === 1 ? 'white' : lanzados[4] === 1 ? 'white' : 'black' }} >5</td>
                  <td scope='col' className='num' style={{ background: restantes[5] === 1 ? colorS : lanzados[5] === 1 ? colorP : bg, color: restantes[5] === 1 ? 'white' : lanzados[5] === 1 ? 'white' : 'black' }} >6</td>
                  <td scope='col' className='num' style={{ background: restantes[6] === 1 ? colorS : lanzados[6] === 1 ? colorP : bg, color: restantes[6] === 1 ? 'white' : lanzados[6] === 1 ? 'white' : 'black' }} >7</td>
                  <td scope='col' className='num' style={{ background: restantes[7] === 1 ? colorS : lanzados[7] === 1 ? colorP : bg, color: restantes[7] === 1 ? 'white' : lanzados[7] === 1 ? 'white' : 'black' }} >8</td>
                  <td scope='col' className='num' style={{ background: restantes[8] === 1 ? colorS : lanzados[8] === 1 ? colorP : bg, color: restantes[8] === 1 ? 'white' : lanzados[8] === 1 ? 'white' : 'black' }} >9</td>
                  <td scope='col' className='num' style={{ background: restantes[9] === 1 ? colorS : lanzados[9] === 1 ? colorP : bg, color: restantes[9] === 1 ? 'white' : lanzados[9] === 1 ? 'white' : 'black' }} >10</td>
                  <td scope='col' className='num' style={{ background: restantes[10] === 1 ? colorS : lanzados[10] === 1 ? colorP : bg, color: restantes[10] === 1 ? 'white' : lanzados[10] === 1 ? 'white' : 'black' }} >11</td>
                  <td scope='col' className='num' style={{ background: restantes[11] === 1 ? colorS : lanzados[11] === 1 ? colorP : bg, color: restantes[11] === 1 ? 'white' : lanzados[11] === 1 ? 'white' : 'black' }} >12</td>
                  <td scope='col' className='num' style={{ background: restantes[12] === 1 ? colorS : lanzados[12] === 1 ? colorP : bg, color: restantes[12] === 1 ? 'white' : lanzados[12] === 1 ? 'white' : 'black' }} >13</td>
                  <td scope='col' className='num' style={{ background: restantes[13] === 1 ? colorS : lanzados[13] === 1 ? colorP : bg, color: restantes[13] === 1 ? 'white' : lanzados[13] === 1 ? 'white' : 'black' }} >14</td>
                  <td scope='col' className='num' style={{ background: restantes[14] === 1 ? colorS : lanzados[14] === 1 ? colorP : bg, color: restantes[14] === 1 ? 'white' : lanzados[14] === 1 ? 'white' : 'black' }} >15</td>
                </tr>
                <tr>
                  <td scope='col' className='color' style={{ backgroundColor: colorP, color: 'white', fontWeight: 'bold' }}>I</td>
                  <td scope='col' className='num' style={{ background: restantes[15] === 1 ? colorS : lanzados[15] === 1 ? colorP : bg, color: restantes[15] === 1 ? 'white' : lanzados[15] === 1 ? 'white' : 'black' }}>16</td>
                  <td scope='col' className='num' style={{ background: restantes[16] === 1 ? colorS : lanzados[16] === 1 ? colorP : bg, color: restantes[16] === 1 ? 'white' : lanzados[16] === 1 ? 'white' : 'black' }}>17</td>
                  <td scope='col' className='num' style={{ background: restantes[17] === 1 ? colorS : lanzados[17] === 1 ? colorP : bg, color: restantes[17] === 1 ? 'white' : lanzados[17] === 1 ? 'white' : 'black' }}>18</td>
                  <td scope='col' className='num' style={{ background: restantes[18] === 1 ? colorS : lanzados[18] === 1 ? colorP : bg, color: restantes[18] === 1 ? 'white' : lanzados[18] === 1 ? 'white' : 'black' }}>19</td>
                  <td scope='col' className='num' style={{ background: restantes[19] === 1 ? colorS : lanzados[19] === 1 ? colorP : bg, color: restantes[19] === 1 ? 'white' : lanzados[19] === 1 ? 'white' : 'black' }}>20</td>
                  <td scope='col' className='num' style={{ background: restantes[20] === 1 ? colorS : lanzados[20] === 1 ? colorP : bg, color: restantes[20] === 1 ? 'white' : lanzados[20] === 1 ? 'white' : 'black' }}>21</td>
                  <td scope='col' className='num' style={{ background: restantes[21] === 1 ? colorS : lanzados[21] === 1 ? colorP : bg, color: restantes[21] === 1 ? 'white' : lanzados[21] === 1 ? 'white' : 'black' }}>22</td>
                  <td scope='col' className='num' style={{ background: restantes[22] === 1 ? colorS : lanzados[22] === 1 ? colorP : bg, color: restantes[22] === 1 ? 'white' : lanzados[22] === 1 ? 'white' : 'black' }}>23</td>
                  <td scope='col' className='num' style={{ background: restantes[23] === 1 ? colorS : lanzados[23] === 1 ? colorP : bg, color: restantes[23] === 1 ? 'white' : lanzados[23] === 1 ? 'white' : 'black' }}>24</td>
                  <td scope='col' className='num' style={{ background: restantes[24] === 1 ? colorS : lanzados[24] === 1 ? colorP : bg, color: restantes[24] === 1 ? 'white' : lanzados[24] === 1 ? 'white' : 'black' }}>25</td>
                  <td scope='col' className='num' style={{ background: restantes[25] === 1 ? colorS : lanzados[25] === 1 ? colorP : bg, color: restantes[25] === 1 ? 'white' : lanzados[25] === 1 ? 'white' : 'black' }}>26</td>
                  <td scope='col' className='num' style={{ background: restantes[26] === 1 ? colorS : lanzados[26] === 1 ? colorP : bg, color: restantes[26] === 1 ? 'white' : lanzados[26] === 1 ? 'white' : 'black' }}>27</td>
                  <td scope='col' className='num' style={{ background: restantes[27] === 1 ? colorS : lanzados[27] === 1 ? colorP : bg, color: restantes[27] === 1 ? 'white' : lanzados[27] === 1 ? 'white' : 'black' }}>28</td>
                  <td scope='col' className='num' style={{ background: restantes[28] === 1 ? colorS : lanzados[28] === 1 ? colorP : bg, color: restantes[28] === 1 ? 'white' : lanzados[28] === 1 ? 'white' : 'black' }}>29</td>
                  <td scope='col' className='num' style={{ background: restantes[29] === 1 ? colorS : lanzados[29] === 1 ? colorP : bg, color: restantes[29] === 1 ? 'white' : lanzados[29] === 1 ? 'white' : 'black' }}>30</td>
                </tr>
                <tr>
                  <td scope='col' className='color' style={{ backgroundColor: colorP, color: 'white', fontWeight: 'bold' }}>N</td>
                  <td scope='col' className='num' style={{ background: restantes[30] === 1 ? colorS : lanzados[30] === 1 ? colorP : bg, color: restantes[30] === 1 ? 'white' : lanzados[30] === 1 ? 'white' : 'black' }}>31</td>
                  <td scope='col' className='num' style={{ background: restantes[31] === 1 ? colorS : lanzados[31] === 1 ? colorP : bg, color: restantes[31] === 1 ? 'white' : lanzados[31] === 1 ? 'white' : 'black' }}>32</td>
                  <td scope='col' className='num' style={{ background: restantes[32] === 1 ? colorS : lanzados[32] === 1 ? colorP : bg, color: restantes[32] === 1 ? 'white' : lanzados[32] === 1 ? 'white' : 'black' }}>33</td>
                  <td scope='col' className='num' style={{ background: restantes[33] === 1 ? colorS : lanzados[33] === 1 ? colorP : bg, color: restantes[33] === 1 ? 'white' : lanzados[33] === 1 ? 'white' : 'black' }}>34</td>
                  <td scope='col' className='num' style={{ background: restantes[34] === 1 ? colorS : lanzados[34] === 1 ? colorP : bg, color: restantes[34] === 1 ? 'white' : lanzados[34] === 1 ? 'white' : 'black' }}>35</td>
                  <td scope='col' className='num' style={{ background: restantes[35] === 1 ? colorS : lanzados[35] === 1 ? colorP : bg, color: restantes[35] === 1 ? 'white' : lanzados[35] === 1 ? 'white' : 'black' }}>36</td>
                  <td scope='col' className='num' style={{ background: restantes[36] === 1 ? colorS : lanzados[36] === 1 ? colorP : bg, color: restantes[36] === 1 ? 'white' : lanzados[36] === 1 ? 'white' : 'black' }}>37</td>
                  <td scope='col' className='num' style={{ background: restantes[37] === 1 ? colorS : lanzados[37] === 1 ? colorP : bg, color: restantes[37] === 1 ? 'white' : lanzados[37] === 1 ? 'white' : 'black' }}>38</td>
                  <td scope='col' className='num' style={{ background: restantes[38] === 1 ? colorS : lanzados[38] === 1 ? colorP : bg, color: restantes[38] === 1 ? 'white' : lanzados[38] === 1 ? 'white' : 'black' }}>39</td>
                  <td scope='col' className='num' style={{ background: restantes[39] === 1 ? colorS : lanzados[39] === 1 ? colorP : bg, color: restantes[39] === 1 ? 'white' : lanzados[39] === 1 ? 'white' : 'black' }}>40</td>
                  <td scope='col' className='num' style={{ background: restantes[40] === 1 ? colorS : lanzados[40] === 1 ? colorP : bg, color: restantes[40] === 1 ? 'white' : lanzados[40] === 1 ? 'white' : 'black' }}>41</td>
                  <td scope='col' className='num' style={{ background: restantes[41] === 1 ? colorS : lanzados[41] === 1 ? colorP : bg, color: restantes[41] === 1 ? 'white' : lanzados[41] === 1 ? 'white' : 'black' }}>42</td>
                  <td scope='col' className='num' style={{ background: restantes[42] === 1 ? colorS : lanzados[42] === 1 ? colorP : bg, color: restantes[42] === 1 ? 'white' : lanzados[42] === 1 ? 'white' : 'black' }}>43</td>
                  <td scope='col' className='num' style={{ background: restantes[43] === 1 ? colorS : lanzados[43] === 1 ? colorP : bg, color: restantes[43] === 1 ? 'white' : lanzados[43] === 1 ? 'white' : 'black' }}>44</td>
                  <td scope='col' className='num' style={{ background: restantes[44] === 1 ? colorS : lanzados[44] === 1 ? colorP : bg, color: restantes[44] === 1 ? 'white' : lanzados[44] === 1 ? 'white' : 'black' }}>45</td>
                </tr>
                <tr>
                  <td scope='col' className='color' style={{ backgroundColor: colorP, color: 'white', fontWeight: 'bold' }}>G</td>
                  <td scope='col' className='num' style={{ background: restantes[45] === 1 ? colorS : lanzados[45] === 1 ? colorP : bg, color: restantes[45] === 1 ? 'white' : lanzados[45] === 1 ? 'white' : 'black' }}>46</td>
                  <td scope='col' className='num' style={{ background: restantes[46] === 1 ? colorS : lanzados[46] === 1 ? colorP : bg, color: restantes[46] === 1 ? 'white' : lanzados[46] === 1 ? 'white' : 'black' }}>47</td>
                  <td scope='col' className='num' style={{ background: restantes[47] === 1 ? colorS : lanzados[47] === 1 ? colorP : bg, color: restantes[47] === 1 ? 'white' : lanzados[47] === 1 ? 'white' : 'black' }}>48</td>
                  <td scope='col' className='num' style={{ background: restantes[48] === 1 ? colorS : lanzados[48] === 1 ? colorP : bg, color: restantes[48] === 1 ? 'white' : lanzados[48] === 1 ? 'white' : 'black' }}>49</td>
                  <td scope='col' className='num' style={{ background: restantes[49] === 1 ? colorS : lanzados[49] === 1 ? colorP : bg, color: restantes[49] === 1 ? 'white' : lanzados[49] === 1 ? 'white' : 'black' }}>50</td>
                  <td scope='col' className='num' style={{ background: restantes[50] === 1 ? colorS : lanzados[50] === 1 ? colorP : bg, color: restantes[50] === 1 ? 'white' : lanzados[50] === 1 ? 'white' : 'black' }}>51</td>
                  <td scope='col' className='num' style={{ background: restantes[51] === 1 ? colorS : lanzados[51] === 1 ? colorP : bg, color: restantes[51] === 1 ? 'white' : lanzados[51] === 1 ? 'white' : 'black' }}>52</td>
                  <td scope='col' className='num' style={{ background: restantes[52] === 1 ? colorS : lanzados[52] === 1 ? colorP : bg, color: restantes[52] === 1 ? 'white' : lanzados[52] === 1 ? 'white' : 'black' }}>53</td>
                  <td scope='col' className='num' style={{ background: restantes[53] === 1 ? colorS : lanzados[53] === 1 ? colorP : bg, color: restantes[53] === 1 ? 'white' : lanzados[53] === 1 ? 'white' : 'black' }}>54</td>
                  <td scope='col' className='num' style={{ background: restantes[54] === 1 ? colorS : lanzados[54] === 1 ? colorP : bg, color: restantes[54] === 1 ? 'white' : lanzados[54] === 1 ? 'white' : 'black' }}>55</td>
                  <td scope='col' className='num' style={{ background: restantes[55] === 1 ? colorS : lanzados[55] === 1 ? colorP : bg, color: restantes[55] === 1 ? 'white' : lanzados[55] === 1 ? 'white' : 'black' }}>56</td>
                  <td scope='col' className='num' style={{ background: restantes[56] === 1 ? colorS : lanzados[56] === 1 ? colorP : bg, color: restantes[56] === 1 ? 'white' : lanzados[56] === 1 ? 'white' : 'black' }}>57</td>
                  <td scope='col' className='num' style={{ background: restantes[57] === 1 ? colorS : lanzados[57] === 1 ? colorP : bg, color: restantes[57] === 1 ? 'white' : lanzados[57] === 1 ? 'white' : 'black' }}>58</td>
                  <td scope='col' className='num' style={{ background: restantes[58] === 1 ? colorS : lanzados[58] === 1 ? colorP : bg, color: restantes[58] === 1 ? 'white' : lanzados[58] === 1 ? 'white' : 'black' }}>59</td>
                  <td scope='col' className='num' style={{ background: restantes[59] === 1 ? colorS : lanzados[59] === 1 ? colorP : bg, color: restantes[59] === 1 ? 'white' : lanzados[59] === 1 ? 'white' : 'black' }}>60</td>
                </tr>
                <tr>
                  <td scope='col' className='color' style={{ backgroundColor: colorP, color: 'white', fontWeight: 'bold' }} >O</td>
                  <td scope='col' className='num' style={{ background: restantes[60] === 1 ? colorS : lanzados[60] === 1 ? colorP : bg, color: restantes[60] === 1 ? 'white' : lanzados[60] === 1 ? 'white' : 'black' }}>61</td>
                  <td scope='col' className='num' style={{ background: restantes[61] === 1 ? colorS : lanzados[61] === 1 ? colorP : bg, color: restantes[61] === 1 ? 'white' : lanzados[61] === 1 ? 'white' : 'black' }}>62</td>
                  <td scope='col' className='num' style={{ background: restantes[62] === 1 ? colorS : lanzados[62] === 1 ? colorP : bg, color: restantes[62] === 1 ? 'white' : lanzados[62] === 1 ? 'white' : 'black' }}>63</td>
                  <td scope='col' className='num' style={{ background: restantes[63] === 1 ? colorS : lanzados[63] === 1 ? colorP : bg, color: restantes[63] === 1 ? 'white' : lanzados[63] === 1 ? 'white' : 'black' }}>64</td>
                  <td scope='col' className='num' style={{ background: restantes[64] === 1 ? colorS : lanzados[64] === 1 ? colorP : bg, color: restantes[64] === 1 ? 'white' : lanzados[64] === 1 ? 'white' : 'black' }}>65</td>
                  <td scope='col' className='num' style={{ background: restantes[65] === 1 ? colorS : lanzados[65] === 1 ? colorP : bg, color: restantes[65] === 1 ? 'white' : lanzados[65] === 1 ? 'white' : 'black' }}>66</td>
                  <td scope='col' className='num' style={{ background: restantes[66] === 1 ? colorS : lanzados[66] === 1 ? colorP : bg, color: restantes[66] === 1 ? 'white' : lanzados[66] === 1 ? 'white' : 'black' }}>67</td>
                  <td scope='col' className='num' style={{ background: restantes[67] === 1 ? colorS : lanzados[67] === 1 ? colorP : bg, color: restantes[67] === 1 ? 'white' : lanzados[67] === 1 ? 'white' : 'black' }}>68</td>
                  <td scope='col' className='num' style={{ background: restantes[68] === 1 ? colorS : lanzados[68] === 1 ? colorP : bg, color: restantes[68] === 1 ? 'white' : lanzados[68] === 1 ? 'white' : 'black' }}>69</td>
                  <td scope='col' className='num' style={{ background: restantes[69] === 1 ? colorS : lanzados[69] === 1 ? colorP : bg, color: restantes[69] === 1 ? 'white' : lanzados[69] === 1 ? 'white' : 'black' }}>70</td>
                  <td scope='col' className='num' style={{ background: restantes[70] === 1 ? colorS : lanzados[70] === 1 ? colorP : bg, color: restantes[70] === 1 ? 'white' : lanzados[70] === 1 ? 'white' : 'black' }}>71</td>
                  <td scope='col' className='num' style={{ background: restantes[71] === 1 ? colorS : lanzados[71] === 1 ? colorP : bg, color: restantes[71] === 1 ? 'white' : lanzados[71] === 1 ? 'white' : 'black' }}>72</td>
                  <td scope='col' className='num' style={{ background: restantes[72] === 1 ? colorS : lanzados[72] === 1 ? colorP : bg, color: restantes[72] === 1 ? 'white' : lanzados[72] === 1 ? 'white' : 'black' }}>73</td>
                  <td scope='col' className='num' style={{ background: restantes[73] === 1 ? colorS : lanzados[73] === 1 ? colorP : bg, color: restantes[73] === 1 ? 'white' : lanzados[73] === 1 ? 'white' : 'black' }}>74</td>
                  <td scope='col' className='num' style={{ background: restantes[74] === 1 ? colorS : lanzados[74] === 1 ? colorP : bg, color: restantes[74] === 1 ? 'white' : lanzados[74] === 1 ? 'white' : 'black' }}>75</td>
                </tr>
              </tbody>
            </table>
          }
        </div>

        <div className='item-center align-middle' style={{ position: 'relative', height: '100px', width: '100px', marginTop: '25px' }}> </div>

        <div className='item-center align-middle' style={{ position: 'relative', height: '100px', width: '100px', marginTop: '25px' }}> </div>

        <div className='item-center align-middle' style={{ position: 'relative', height: '163px', width: '529px', marginTop: '25px', display: 'inline-block' }}>
          <table className='table tb-border table-bordered' style={{ border: colorP, height: '100%', width: '100%', fontSize: '20px' }}>
            <tbody>
              <tr className='color text-center' style={{ backgroundColor: colorP, color: 'white', fontWeight: 'bold', height: '10px' }}>
                <td>
                Premio
                </td>
              </tr>
              <tr className='text-center' style={{ fontSize: '25px' }}>
                <td id='pre' style={{ background: bg }}>
                  {premio}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='item-center align-middle' style={{ position: 'relative', height: '84px', width: '594px', marginTop: '25px', display: 'inline-block' }}>
          <table className='table tb-border table-bordered inv' style={{ border: colorP, height: '100%', width: '100%', fontSize: '20px' }}>
            <tbody>
              <tr className='color text-center' style={{ backgroundColor: colorP, color: 'white', fontWeight: 'bold', height: '10px' }}>
                <td style={{ background: bg }}>
                  <h1 id='titulo' className='m-2'>{titulo}</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='item-center align-middle ms-5' style={{ position: 'absolute', height: '350px', width: '100px', marginTop: '25px', top: '38%', left: '14%' }}>
          <table className='align-middle text-center table tb-border table-bordered' style={{ border: colorP, height: '100%', width: '100%', fontSize: '70px' }}>
            <tbody>
              <tr style={{ top: '30%', position: 'absolute', height: '155px', width: '720px' }}>
                <td className='color td-ult' style={{ backgroundColor: colorP, padding: 0, color: 'white', fontWeight: 'bold', width: '120px!important', fontSize: '30px!important' }}>
                  <div style={{ transform: 'rotate(-90deg)' }}>
                    Ultimas
                  </div>
                </td>
                <td className='td-ult fw-light' style={{ left: '80px', width: '200px', background: bg }}>
                  <div className='my-3'>
                    <span id='numeroLanzadoA'>{ultimaA2}</span>
                    <span id='numeroLanzadoB'>{ultimaA}</span>
                  </div>
                </td>
                <td className='td-ult fw-light' style={{ left: '268px', width: '200px', background: bg }}>
                  <div className='my-3'>
                    <span id='numeroLanzado2A'>{ultimaB2}</span>
                    <span id='numeroLanzado2B'>{ultimaB}</span>
                  </div>
                </td>
                <td className='td-ult fw-light' style={{ left: '456px', width: '200px', background: bg }}>
                  <div className='my-3'>
                    <span id='numeroLanzado3A' >{ultimaC2}</span>
                    <span id='numeroLanzado3B' >{ultimaC}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
    catalogo: state.catalogos,
  };
};

const mapDispatchToProps = {
  // updateState,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
