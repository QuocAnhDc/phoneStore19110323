import HomeScreen from '../srceens/HomeScreen';
import Error404Screen from '../srceens/Error404Screen';
import ProductScreen from '../srceens/ProductScreen';
import CartScreen from '../srceens/CartScreen';
import SigninScreen from '../srceens/SigninScreen';
import RegisterScreen from '../srceens/RegisterScreen';
import ProfileScreen from '../srceens/ProfileScreen';
import ShippingScreen from '../srceens/ShippingScreen';
import PaymentScreen from '../srceens/PaymentScreen';
import PlaceOrderScreen from '../srceens/PlaceOrderScreen';
import OrderScreen from '../srceens/OrderScreen';
import DashboardScreen from '../srceens/DashboardScreen';
import ProductListScreen from '../srceens/ProductListScreen';
import ProductEditScreen from '../srceens/ProductEditScreen';
import OrderListScreen from '../srceens/OrderListScreen';

import Header from '../components/Header';
import { parseRequestUrl, showLoading, hideLoading } from '../utils';


const routes = {
  '/': HomeScreen,
  '/product/:id/edit': ProductEditScreen,
  '/product/:id': ProductScreen,
  '/order/:id': OrderScreen,
  '/cart': CartScreen,
  '/cart/:id' : CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/productlist': ProductListScreen,
  '/error': Error404Screen,
  '/orderlist': OrderListScreen,
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