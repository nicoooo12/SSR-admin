import Home from '../containers/Home';
import Cartones from '../containers/Cartones';
import Ordenes from '../containers/Ordenes';
import Play from '../containers/Play';
import SignIn from '../containers/SignIn';
import Bingos from '../containers/Bingos';
import SignUp from '../containers/SignUp';
import Pedidos from '../containers/Pedidos';
// import Styles from '../containers/Styles';
// import Notfound from '../containers/Notfound';

const routers = (isLogged)=>{
  return [
    {
      exact: true,
      path: '/',
      component: Home,
    },
    {
      exact: true,
      path: '/pedidos',
      component: Pedidos,
    },
    {
      exact: true,
      path: '/cartones',
      component: Cartones,
    },
    {
      exact: true,
      path: '/ordenes',
      component: Ordenes,
    },
    {
      exact: true,
      path: '/bingos',
      component: Bingos,
    },
    {
      exact: true,
      path: '/play',
      component: Play,
    },
    {
      exact: true,
      path: '/sign-up',
      component: SignUp,
    },
    {
      exact: true,
      path: '/sign-in',
      component: SignIn,
    },
  // {
  //   exact: false,
  //   component: Notfound,
  // },
  ];
};

export default routers;
