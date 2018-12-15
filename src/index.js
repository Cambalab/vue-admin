import Admin from './components/Admin';
import Resource from './components/Resource'

const components = [ Admin, Resource ];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const VueAdmin = {
  version: '0.0.1',
  Admin,
  Resource
};

export default VueAdmin;
