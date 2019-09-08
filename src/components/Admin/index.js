import Admin from './src/Composer';

Admin.install = function(Vue) {
  Vue.component(Admin.name, Admin);
};

export default Admin;
