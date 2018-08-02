import Ui from './src/ui';

Ui.install = function(Vue) {
  Vue.component(Ui.name, Ui);
};

export default Ui;
