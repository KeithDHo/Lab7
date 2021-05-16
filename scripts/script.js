// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let entryNum = 1;
      entries.forEach(entry => {
        
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        
        newPost.id = entryNum;
        entryNum++;

        newPost.addEventListener("click", () => {
          setState({stateName: "entryState", id: newPost.id}, false);
        });

        document.querySelector('main').appendChild(newPost);
      });
    });
});

var homeElement = document.querySelector('header h1');
homeElement.addEventListener("click", () => {
  setState({stateName: "homeState"}, false)
});

var settingsElement = document.querySelector('header img');
settingsElement.addEventListener("click", () => {
  setState({stateName: "settingsState"}, false);
});

window.addEventListener('popstate', (event) => {
  setState(event.state, true);
});