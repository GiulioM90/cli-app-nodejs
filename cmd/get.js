//node app.js get --nome='Giulio'

const fs = require('fs');
const chalk = require('chalk');
const { type } = require('os');

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
            // let nome = ris.cliente.nome;
            // console.log(typeof nome)
            console.log(chalk.green(ris.cliente));
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
     ris = { status : false, suggerimenti : ' ' , cliente : ''}

     if(!cliente){
         clienti.map( clienteItem => {
             if(clienteItem.nome[0] === name[0]){
                 ris.suggerimenti += ` ${clienteItem.nome}`
             }
         })
        return ris;
     } if(cliente){
         let totClienti = clienti.filter(clienteItem => clienteItem.nome === name);
         console.log(totClienti.length);

         if(totClienti.length > 1 ) {
            //  console.log(totClienti)
             stringTotClienti = 'Hai trovato più clienti, ecco la lista: \n';
              totClienti.map( (clienteItem, i) => {
                  let stringName = totClienti[i].nome;
                  let stringEmail = totClienti[i].email;
                  let stringTelefono = totClienti[i].telefono;
                  let stringItem = `cliente ${i}: Nome: ${stringName}, Email: ${stringEmail}, Telefono: ${stringTelefono} \n`;
                  stringTotClienti += stringItem;
              })
              ris.cliente = stringTotClienti;
            } if(totClienti.length === 1){
                let stringName = cliente.nome;
                let stringEmail = cliente.email;
                let stringTelefono = cliente.telefono;
                let stringCliente = `Cliente trovato: \n Nome: ${stringName}, Email: ${stringEmail}, Telefono: ${stringTelefono}.`;
                console.log(stringName, stringEmail, stringTelefono);
                ris.cliente = stringCliente; 
            }

         }
        
    ris.status = true;
    return ris;
}

module.exports = get;