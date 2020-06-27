import React from 'react';
import { render } from 'react-dom';
import Main from './routes/main.route';
import 'minireset.css';
import './global.style.css';

render(<Main />, document.querySelector('#app'));
