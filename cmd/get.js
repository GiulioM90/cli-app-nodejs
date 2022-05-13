//node app.js get --nome='Giulio'

const fs = require('fs');
const chalk = require('chalk');




function get(yargs){

    //node app.js get --nome='Giulio'

yargs.command({
    command : 'get',
    describe: 'get user by name',
    builder: {
        nome : {
            describe:'User name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        const ris = getCliente(argv.nome);
        if(ris.status){
            console.log(chalk.green('cliente trovato: \n' + ris.cliente));
        } else {
            console.log(chalk.red('cliente non trovato: Forse cercavi\n ' + ris.suggerimenti ));
        }
    }
});
}

function getCliente(name){
    const clientiJSON = fs.readFileSync('clienti.json', 'utf-8'),
     clienti = JSON.parse(clientiJSON),
     cliente = clienti.find(clienteItem => clienteItem.nome === name),
     ris = { status : false, suggerimenti : ' ' , cliente : null}

     if(!cliente){
         clienti.map( clienteItem => {
             if(clienteItem.nome[0] === name[0]){
                 ris.suggerimenti += ` ${clienteItem.nome}`
             }
         })
        return ris;
     }
     ris.status = true;
     ris.cliente = cliente; 
    return ris;
}
module.exports = get;