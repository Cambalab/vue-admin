/**
 * Command Helpers
 */

 export default {
   createElementQueryBy: ({
     type = '',
     prop,
     value
   }) => `${type}[${prop}=${value}]`
 }
