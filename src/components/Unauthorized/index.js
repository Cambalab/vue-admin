
import Unauthorized from "./unauthorized";

Unauthorized.install = function(Vue) {
  Vue.component(Unauthorized.name, Unauthorized);
};

export default Unauthorized;
