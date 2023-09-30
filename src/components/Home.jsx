import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../store/slices/username.slice';
import ballup from '../assets/img/pb_up.png';
import balldown from '../assets/img/pb_down.png';
import screen from '../assets/img/screenpd.png';
import pokedex from '../assets/img/pokedex.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.userName);
  const [inputName, setInputName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const getPokedex = () => {
    if (inputName.trim() === '') {
      setErrorMessage('Por favor, ingresa un nombre para continuar.');
    } else {
      setErrorMessage('');
      dispatch(getUsername(inputName));
      navigate('/pokedex');
    }
  };

  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };

  return (
    <div className={`home ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <img className='title_home' src={pokedex} alt='pokedex' />
      <div className='input__container'>
        <img src={ballup} alt='' />
        <div className='screen'>
          <img src={screen} alt='' />
          <div className='input'>
            <input
              placeholder='name'
              type='text'
              value={inputName}
              onChange={handleInputChange}
            />
            <button onClick={getPokedex}>
              <i className='bx bxl-go-lang bx-tada bx-lg'></i>
            </button>
          </div>
        </div>
        <img src={balldown} alt='' />
      </div>
      <button className='mode-toggle' onClick={toggleDarkMode}>
        <i className={`bx bx-cog ${darkMode ? 'dark-mode-icon' : 'light-mode-icon'}`}></i>
      </button>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export default Home;
