import React, { useState } from 'react';
import '../../assets/styles/components/forms/Button.scss';

const App = ({ children, size, type = 'button', typebutton, state = '', onClick, disabled = false, autoLogin = true })=> {

  const [loading, setLoading] = useState(state);

  const ok = ()=>{
    setLoading(state);
  };

  const onClickHandle = ()=>{
    if (autoLogin) {
      setLoading('loading');
    }
    onClick(ok);
  };

  return (
    <button
      onClick={onClickHandle}
      className='button'
      type={type}
      disabled={disabled}
      typebutton={typebutton ? typebutton : 'primary'}
      sizebutton={size ? size : 'large'}
    >
      {
        loading === 'loading' ? <div className='loading-spinner' /> : children
      }
    </button>
  );

};

export default App;
