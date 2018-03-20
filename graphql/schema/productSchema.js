import fetch from 'node-fetch';
import util from 'util';
import { loadavg } from 'os';
import { log } from 'util';
import axios from 'axios';
//import CarItem from './carSchema';

const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

require('util.promisify').shim();

const {
    GraphQLID, 
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLInt, 
    GraphQLString,
    GraphQLFloat,
    GraphQLList
} = require('graphql');

const CarDetails = new GraphQLObjectType({
    name: 'CarDetails',
    description: 'product activity API schema for Car',
    fields : () => ({
        reg: {
            type: GraphQLString
        },
        make: {
            type: GraphQLString
        },
        model: {
            type: GraphQLString
        }
    })
})

const CarItem = new GraphQLObjectType({
    name: 'Car',
    description: 'product activity API schema for Car',
    fields : () => ({

        accountId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        details : {
            type: CarDetails
        }
       
    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: () =>  ({
        car: {
            type: new GraphQLList(CarItem),
            args: {
                accountId: { type: GraphQLInt },
                productId: { type: GraphQLInt },
                type: { type: GraphQLString }
            },
            resolve(_, args) {
                // return axios.get(`http://localhost:3000/products/${args.accountId}/${args.type}`)
                // .then(response => response.data)
                //console.log(db.get('products').find({type: args.type, accountId: args.accountId}).value())
                return db.get('products').filter({type: args.type, productId: args.productId}).value()
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

// module.exports = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'Products',
//         description: '...',
//         fields: () => ({
//             carsss : {
//               type: new GraphQLList(CarItem),
//               args: {
//                   accountId: { type: GraphQLInt },
//                   type: { type: GraphQLString }
//               },
//               resolve(_, args) {
//                 return [db.get('products').find({type: args.type, accountId: args.accountId}).value()]
//               }
//             }
//           })
//     })
// })

