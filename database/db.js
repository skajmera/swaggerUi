const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'Subhash@1234',
      database : 'swagger'
    }
  });

  knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('password');
  }).then(()=>{
      console.log("table created");
  }).catch(()=>{
      console.log("already exists");
  })

module.exports=knex;