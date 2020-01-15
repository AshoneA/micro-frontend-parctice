window.SystemJS = window.System

import { registerApplication, start } from 'single-spa';

function pathPrefix(prefix) {
  return function(location) {
      return location.pathname.startsWith(prefix);
  }
}

registerApplication(
  'navBar', 
  () => SystemJS.import('navbar').then(module => module.navBar),
  () => true
);

registerApplication(
  // Name of our single-spa application
  'home',
  // loadingFunction
  () => SystemJS.import('home'),
  // activityFunction
  location => location.pathname === '' || location.pathname === '/' || location.pathname.startsWith('/home')
);

registerApplication(
  'angularJS', 
  () => import ('./src/angularJS/angularJS.app.js'), 
  pathPrefix('/angularJS'),
);

start();
