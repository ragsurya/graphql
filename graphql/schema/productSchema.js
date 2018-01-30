import fetch from 'node-fetch';
import util from 'util';
import { loadavg } from 'os';
import { log } from 'util';
//import CarItem from './carSchema';

const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

console.log('db', db.get('products').find({accountId: 123}).value());

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


// const CoordinateType = new GraphQLObjectType({
//     name: "CoordType",
//     description: "type for co ordinates",
//     fields: () => ({
//         lat: ({
//             type : GraphQLFloat
//         }),
//         lon: ({
//             type : GraphQLFloat
//         })
//     })
// })



// const ProductType = new GraphQLObjectType({
//     name: 'Product',
//     description : '....',
//     fields: () => ({
//         productId: {
//             type: GraphQLID
//         },
//         accountId: {
//             type: GraphQLID
//         },
//         carItem: {
//             type: CarItem
//         }
//     })
// })


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


  module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Products',
        description: '...',
        fields: () => ({
            carsss : {
              type: new GraphQLList(CarItem),
              args: {
                  accountId: { type: GraphQLInt },
                  type: { type: GraphQLString }
              },
              resolve(_, args) {
                return [db.get('products').find({type: args.type, accountId: args.accountId}).value()]
              }
            }
          })
    })
})

