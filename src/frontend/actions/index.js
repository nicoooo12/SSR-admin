import axios from 'axios';
// import { io } from 'socket.io-client';

// const socket = io();

export const addItemToCarrito = (payload) =>({
  type: 'ADD_ITEM_TO_CARRITO',
  payload,
});

export const removeItemToCarrito = (payload) => ({
  type: 'REMOVE_ITEM_TO_CARRITO',
  payload,
});

export const activeCarrito = (payload) => ({
  type: 'ACTIVE_CARRITO',
  payload,
});

export const desactiveCarrito = (payload) => ({
  type: 'DESACTIVE_CARRITO',
  payload,
});

export const statusNextCarrito = (payload) => ({
  type: 'STATUS_NEXT_CARRITO',
  payload,
});

export const setStatusCarrito = (payload) => ({
  type: 'SET_STATUS_CARRITO',
  payload,
});

export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const registerRequest = (payload) => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const setRedirect = (payload) => ({
  type: 'SET_REDIRECT',
  payload,
});

export const changeColorPlay = (payload) => ({
  type: 'SET_REDIRECT',
  payload,
});

export const updateStateReducer = (payload) => ({
  type: 'UPDATE_STATE',
  payload,
});

export const updatePlay = (payload) => ({
  type: 'UPDATE_PLAY',
  payload,
});

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const singUp = (payload, fnCallBack, fnErrorCallback) => {
  return (dispatch) => {
    console.log('[sigUp]', typeof fnCallBack, typeof fnErrorCallback);
    axios.post('/auth/sign-up', payload)// {email, name, password}
      .then(({ data }) => {
        dispatch(singIn({ email: payload.email, password: payload.password },
          ()=>{
            fnCallBack();
          },
          (err)=>{
            fnErrorCallback(err);
          }));
      })
      .catch((error) => {
        fnErrorCallback(error);
        dispatch(setError(error));
      });
  };
};

export const singIn = ({ email, password }, fnCallback, fnErrorCallback) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })// {email, password}
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(registerRequest(data.user));
        dispatch(updateState());
        fnCallback(data.user);
      })
      .catch((error) => {
        fnErrorCallback(error);
        // console.log(error.request.status);
        dispatch(setError(error));
      });
  };
};

export const createOrden = (compra, totalPago) => {
  return (dispatch) => {
    console.log(compra, totalPago);
    axios({
      url: '/api/createOrden',
      method: 'post',
      data: {
        'compra': compra,
        // [{
        //   'serie': 1,
        //   'cantidad': 1,
        // }],
        'totalPago': totalPago,
        'tipoDePago': 'transferencia',
      },
    })// {email, password}
      .then(({ data }) => {
        console.log('[create orden]', data.data);
        dispatch(updateStateReducer(data.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setError(error));
      });
  };
};

export const createCanvasOrden = (data, fnCallBack, fnErrorCallback) => {
  return (dispatch) => {
    console.log('[data actions]', data);
    axios({
      url: '/api/createCanvas',
      method: 'post',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      data: { data },
    })
      .then(({ data }) => {
        console.log('[CreateCanvas]', data.data);
        // console.log(data);
        dispatch(updateState());
        fnCallBack();
      })
      .catch((error) => {
        fnErrorCallback(error);
        dispatch(setError(error));
      });
  };
};

export const updateState = () => {
  return (dispatch) => {
    axios({
      url: '/api/getState',
      method: 'post',
    })// {email, password}
      .then(({ data }) => {
        console.log('[updateState]', data.data);
        // dispatch(registerRequest(data.user));
        dispatch(updateStateReducer(data.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setError(error));
      });
  };
};

export const getUser = (correo, fnCallBack) => {
  return (dispatch) => {
    axios({
      url: `/api/cartones/${correo}`,
      method: 'get',
    })// {email, password}
      .then(({ data }) => {
        console.log('[updateState]', data.data);
        fnCallBack(data);
        // dispatch(registerRequest(data.user));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setError(error));
      });
  };
};
