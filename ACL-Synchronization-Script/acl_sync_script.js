const AWS = require('aws-sdk');

// Replace these values with your DigitalOcean Spaces and AWS credentials
const DO_ACCESS_KEY = 'DO_ACCESS_KEY';
const DO_SECRET_KEY = 'DO_SECRET_KEY';
const AWS_ACCESS_KEY = 'AWS_ACCESS_KEY';
const AWS_SECRET_KEY = 'AWS_SECRET_KEY';
const DO_SPACES_ENDPOINT = 'DO_SPACES_ENDPOINT';
const DO_REGION = 'DO_REGION';
const AWS_REGION = 'AWS_REGION';
const DO_BUCKET_NAME = 'DO_BUCKET_NAME';
const AWS_BUCKET_NAME = 'AWS_BUCKET_NAME';
const DO_SPACES_DRIVE = 'DO_SPACES_DRIVE';

const doS3 = new AWS.S3({
    endpoint: new AWS.Endpoint(DO_SPACES_ENDPOINT),
    accessKeyId: DO_ACCESS_KEY,
    secretAccessKey: DO_SECRET_KEY,
    region: DO_REGION
});

const awsS3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION
});

async function checkAndUpdateACL() {
    try {
        const response = await doS3.listObjectsV2({ Bucket: DO_BUCKET_NAME, Prefix: DO_SPACES_DRIVE }).promise();
        const objects = response.Contents || [];

        console.log(`Object                                     ACL`);
        console.log(`--------------------------------------------------`);

        for (const obj of objects) {
            const objectKey = obj.Key;
            const acl = await checkObjectACL(DO_BUCKET_NAME, objectKey);
            console.log(`${objectKey.padEnd(42)} ${acl}`);

            // Update ACL in AWS S3 bucket
            await updateObjectACL(objectKey, acl);
        }
        console.log('ACL update completed.');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function checkObjectACL(bucketName, objectKey) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: objectKey
        };
        doS3.getObjectAcl(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const grants = data.Grants;
                let acl = 'private';
                for (const grant of grants) {
                    if (grant.Grantee.URI === 'http://acs.amazonaws.com/groups/global/AllUsers') {
                        acl = 'public-read';
                        break;
                    }
                }
                resolve(acl);
            }
        });
    });
}

async function updateObjectACL(objectKey, acl) {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: objectKey,
        ACL: acl
    };

    try {
        await awsS3.putObjectAcl(params).promise();
        console.log(`Updated ACL for object ${objectKey} to ${acl}`);
    } catch (error) {
        console.error(`Error updating ACL for object ${objectKey}:`, error);
    }
}

checkAndUpdateACL();
