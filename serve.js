import express from 'express';
import graphQLHttp from 'express-graphql';
const app = express();
const schema = require('./graphql/schema/productSchema');

app.use('/graphql', graphQLHttp({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Listening...');
});
