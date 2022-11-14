import HomeScreen from '../srceens/HomeScreen';
import Error404Screen from '../srceens/Error404Screen';
import ProductScreen from '../srceens/ProductScreen';
import CartScreen from '../srceens/CartScreen';
import SigninScreen from '../srceens/SigninScreen';
import RegisterScreen from '../srceens/RegisterScreen';
import ProfileScreen from '../srceens/ProfileScreen';
import Header from '../components/Header';
import { parseRequestUrl, showLoading, hideLoading } from '../utils';


const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart': CartScreen,
  '/cart/:id' : CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
};

const router = async () => {
  showLoading();
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
  if (screen.after_render) await screen.after_render();
  hideLoading();
};

export default router