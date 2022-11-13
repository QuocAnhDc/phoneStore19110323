import HomeScreen from '../srceens/HomeScreen';
import Error404Screen from '../srceens/Error404Screen';
import ProductScreen from '../srceens/ProductScreen';
import CartScreen from '../srceens/CartScreen';
import SigninScreen from '../srceens/SigninScreen';
import Header from '../components/Header';
import { parseRequestUrl } from '../utils';


const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart': CartScreen,
  '/cart/:id' : CartScreen,
  '/signin': SigninScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;


  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  const main = document.getElementById('main-container');
  // main.innerHTML = await HomeScreen.render();
  main.innerHTML = await screen.render();
  await screen.after_render();
};

export default router