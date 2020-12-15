import React, { useState } from 'react';
import './ModalForm.scss';

function ModalForm({ setShowModal }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('name:', name);
    setShowModal(false);
    setName('');
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <div className='ModalForm'>
      <form className='modal-form' onSubmit={handleSubmit}>
        <h2>Create a room</h2>
        <input
          className='modal-input'
          type='input'
          placeholder='Enter your name to create a room'
          onChange={handleChange}
          value={name}
        />
        <input className='modal-submit-btn' type='submit' />
      </form>
    </div>
  );
}

export default ModalForm;
