
import fetch from 'node-fetch';
import util from 'util';
import { loadavg } from 'os';
import { log } from 'util';
const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// console.log('db', db.get('products').find({accountId: 123}).value());

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
        
        details : {
            type: new GraphQLList(CarDetails)
        }
       
    })
})

const carSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'a test of car',
        fields: () => ({
            carItem: {
                type: CarItem,
                args: {
                    productId: { type: GraphQLInt },
                    accountId: { type: GraphQLID}
                },
                resolve(){
                    return [db.get('products').find({productId: args.productId, accountId: args.accountId}).value()];
                }
            }
        })
    })
})

export default { carSchema, CarItem }