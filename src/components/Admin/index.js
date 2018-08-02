import Admin from './src/admin';

Admin.install = function(Vue) {
  Vue.component(Admin.name, Admin);
};

export default Admin;
