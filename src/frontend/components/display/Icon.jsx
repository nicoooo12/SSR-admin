import React from 'react';
const App = ({ type, width = 24, height = 24 })=> {

  switch (type) {
    case 'close':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-x' viewBox='0 0 16 16'>
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>
          </svg>
        </>
      );
    case 'list':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-list' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'/>
          </svg>
        </>
      );
    case 'trolley':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-cart2' viewBox='0 0 16 16'>
            <path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z'/>
          </svg>
        </>
      );
    case 'upLoad':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-upload' viewBox='0 0 16 16'>
            <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z'/>
            <path d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z'/>
          </svg>
        </>
      );
    case 'forward':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-chevron-left' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/>
          </svg>
        </>
      );
    case 'row':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z'/>
          </svg>
        </>
      );
    case 'plass':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-plus-lg' viewBox='0 0 16 16'>
            <path d='M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z'/>
          </svg>
        </>
      );
    case 'help':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-question' viewBox='0 0 16 16'>
            <path d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z'/>
          </svg>
        </>
      );
    case 'eye':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-eye' viewBox='0 0 16 16'>
            <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z'/>
            <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z'/>
          </svg>
        </>
      );
    case 'play':
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-play-fill' viewBox='0 0 16 16'>
            <path d='m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/>
          </svg>
        </>
      );
    default:
      return (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill='currentColor' className='bi bi-x' viewBox='0 0 16 16'>
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>
          </svg>
        </>
      );
  }

};

export default App;
