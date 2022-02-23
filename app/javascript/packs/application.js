// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../components/root';
import initStore from '../store/store'

Rails.start()
Turbolinks.start()
ActiveStorage.start()

document.addEventListener("DOMContentLoaded", ()=>{
    let preloadedState = {};
    if (window.currentUser) {
        preloadedState = {
          session: {
            currentUser: window.currentUser
          }
        };
      }
    const rootEl = document.getElementById('root');
    const store = initStore(preloadedState);
    ReactDOM.render(<Root store={store}/>, rootEl);
})