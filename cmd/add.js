const  fs = require('fs');

function add(yargs){
    
yargs.command({
    command : 'add',
    describe: 'add user by name',
    builder: {
        nome : {
            describe:'User name to add ',
            demandOption: true,
            type: 'string'
        },
        email : {
            describe:'email to add ',
            demandOption: true,
            type: 'string'
        },
        telefono : {
            describe:'phone to add ',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        addCliente(argv);
            }
});
}

function addCliente({nome, email, phone}){
    const clientiJSON = fs.readFileSync('clienti.json' ,'utf-8'),
    clienti = JSON.parse(clientiJSON);

    clienti.push({nome, email, phone});
    fs.writeFileSync('clienti.json', JSON.stringify(clienti));
    console.log(clienti)
}


module.exports = add;