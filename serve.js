const express = require('express');
const graphQLHttp = require('express-graphql');
const app = express();
const schema = require('./schema');



app.use('/graphql', graphQLHttp({
    schema,
    graphiql: true
}))
app.listen(4000);
console.log('Listening...')