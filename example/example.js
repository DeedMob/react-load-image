import React from 'react';
import { render } from 'react-dom';
import ImageLoader from '../lib';

const Preloader = () => <div>SPINNNNER</div>

render(
  <ImageLoader src="./volunteer.png">
    <img />
    <div>Error!</div>
    <Preloader />
  </ImageLoader>,
  document.getElementById('app')
);
