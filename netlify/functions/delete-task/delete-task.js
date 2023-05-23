const axios = require('axios');
const { config, data } = require('../mongodb.js')

const handler = async function (event, context) {
    const { id } = event.queryStringParameters;

    const newData = {
        ...JSON.parse(data),
            "filter": {
                "_id": {
                    "$oid": id
                }
            }
    }

    newData.collection = "tasks";
    
    const newConfig = {
        ...config,
            url: `${config.url}/action/deleteOne`,
            data: newData
    }

    try {
        const res = await axios(newConfig)
        return {
            statusCode: 200,
            body: JSON.stringify(res.data)
        }
    } catch(err) {
        return {
            statusCode: 404,
            body: JSON.stringify(err)
        }
    }
}

module.exports = { handler }
