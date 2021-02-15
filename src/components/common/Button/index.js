import React from 'react';

const Button = (props) => {
  return (
    <div>
      <button className='button' type={props.type || 'button'}>
        {props.name || 'Button'}
      </button>
    </div>
  );
};

export default Button;
