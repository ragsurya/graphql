
const fetch = require('node-fetch');
const util = require('util');
require('util.promisify').shim();
const xmlToJs = util.promisify(require('xml2js').parseString);
const {
    GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString
} = require('graphql');
/*
const x = fetch(
    'https://www.goodreads.com/author/show.xml?id=4432&key=MUKHVaouHDKJm0gkVxzJQ'
)
.then(response => response.text())
.then(xmlToJs)
*/
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description : '....',
    fields: () => ({
        name: {
            type: GraphQLString
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                    id: { type: GraphQLInt }
                }
            }
        })
    })
})
