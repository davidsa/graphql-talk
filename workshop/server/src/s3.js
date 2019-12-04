const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const Bucket = 'uruit-pet-photos';

const uploadFromSteam = (readableStream, id) =>
  s3.upload({Bucket, Key: id, Body: readableStream}).promise();

const deleteFile = id => s3.deleteObject({Bucket, Key: id}).promise();

module.exports = {deleteFile, uploadFromSteam};
