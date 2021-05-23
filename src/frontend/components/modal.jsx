import React, { useEffect, useRef } from 'react';
import Button from './forms/Button';
import '../assets/styles/components/modal.scss';

const App = ({ children, btn })=> {

  const modal = useRef('');
  console.log(modal);
  const clickHandler = () => {
    modal.current.style.display = 'flex';
  };

  // When the user clicks on <span> (x), close the modal.current
  const closeHandle = () => {
    modal.current.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal.current, close it
  useEffect(()=>{
    window.onclick = (event) => {
      if (event.target === modal.current) {
        modal.current.style.display = 'none';
      }
    };
  }, []);

  return (
    <>
      <Button onClick={clickHandler} autoLogin={false} >{btn}</Button>
      <div id='myModal' className='modal' ref={modal} >
        <div className='modal-content'>
          <span className='close' onClick={closeHandle}>&times;</span>
          {children}
        </div>
      </div>
    </>
  );

};

export default App;
