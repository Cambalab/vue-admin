import feathers from "@feathersjs/client";

const host = 'http://localhost:8080';

export default feathers()
    .configure(feathers.rest(host).fetch(window.fetch.bind(window)))
