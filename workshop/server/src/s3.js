const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const Bucket = 'uruit-pet-photos';

const uploadFile = (stream, id) => s3.upload({Bucket, Key: id, Body: stream});
