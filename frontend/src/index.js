import HomeScreen from './srceens/HomeScreen';
import ProductScreen from './srceens/ProductScreen';
import Error404Screen from './srceens/Error404Screen';
import { parseRequestUrl } from './utils';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById('main-container');
  // main.innerHTML = await HomeScreen.render();
  main.innerHTML = await screen.render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
