const dynamoose = require('dynamoose');
const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
    },
    "region": process.env.AWS_REGION
})

const db = dynamoose.aws.ddb.set(ddb);
 
module.exports = db