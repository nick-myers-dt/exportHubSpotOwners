/**
 * Install node.js
 * run 'npm install'
 * create a .env file with a single key value pair in it - key: API_KEY=<HUBSPOT_API_KEY>
 * run 'node index.js'np
 */

const dotenv = require('dotenv')
dotenv.config()
const apikey = process.env.API_KEY
const owners = `http://api.hubapi.com/owners/v2/owners?hapikey=${apikey}`
const axios = require('axios')
const { parse } = require('json2csv')
const write = require('write')

async function query(url) {
  axios.default
    .get(url)
    .then(function(response) {
      const json = response.data
      const fields = ['type', 'ownerId', 'firstName', 'lastName', 'email']
      const opts = { fields }
      try {
        const csv = parse(json, opts)
        write.sync('hubspot-owners.csv', csv, { newline: true })
        console.log(`The following was written to file: hubspot-owners.csv`)
        console.log(csv)
      } catch (err) {
        console.error(err)
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error)
    })
    .finally(function() {
      // always executed
    })
}

async function run() {
  await query(owners)
}

run()
