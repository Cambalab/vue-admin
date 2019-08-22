import Admin from './src/Admin';

Admin.install = function(Vue) {
  Vue.component(Admin.name, Admin);
};

export default Admin;
