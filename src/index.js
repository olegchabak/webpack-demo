import component from "./component";
import './index.scss';
import 'purecss';
import 'react';
import 'react-dom';
import {shake} from './shake'

document.body.appendChild( component() );
//
shake();

// note
// if (process.env.NODE_ENV === "production") {
// 	module.exports = require("./store.prod");
// } else {
// 	module.exports = require("./store.dev");
// }