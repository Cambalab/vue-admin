import Auth from './src/Auth';

Auth.install = function(Vue) {
  Vue.component(Auth.name, Auth);
};

export default Auth;
