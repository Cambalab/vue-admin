import Admin from './components/Admin';
import Ui from './components/Ui';
import Core from './components/Core';

const components = [ Admin, Core, Ui ];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '0.0.1',
  Admin,
  Ui,
  Core
};

module.exports.default = module.exports;
