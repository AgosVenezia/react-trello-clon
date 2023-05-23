const axios = require('axios');
const { config, data } = require('../mongodb.js')

const handler = async function () {
    const newData = {
        ...JSON.parse(data),
            "collection": "lists"
    }

    const newConfig = {
        ...config, 
            url: `${config.url}/action/find`,
            data: newData
    }

    try {
        const res = await axios(newConfig)
        return {
            statusCode: 200,
            body: JSON.stringify(res.data.documents)
        }
    } catch(err) {
        return {
            statusCode: 404,
            body: JSON.stringify(err)
        }
    }
}

module.exports = { handler }
