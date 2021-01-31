'use strict';

var args = process.argv.slice(2);

const fs = require('fs');

args.forEach(file => {
    let rawdata = fs.readFileSync(file);
    let hospitals = JSON.parse(rawdata);
    console.log('There are', hospitals.length, 'hospitals in', file);
});