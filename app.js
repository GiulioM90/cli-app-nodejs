const yargs = require('yargs');
const get = require('./cmd/get');
const add = require('./cmd/add');
const del = require('./cmd/del');
// const {getCliente , addCliente , delCliente } = require('./app-fn');

// console.log(get, add, del);
get(yargs); // search user 
add(yargs); // add user 
del(yargs); // delete user 

yargs.parse();

// console.log(chalk.red.inverse("ciao"))
// console.log(argv_parsed)

// node app.js del  --nome="Giulio"