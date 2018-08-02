import Core from './src/core';

Core.install = function(Vue) {
  Vue.component(Core.name, Core);
};

export default Core;
