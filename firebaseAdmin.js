import * as firebaseAdmin from 'firebase-admin';

import { getApp } from 'firebase-admin';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// import serviceAccount from './configs/secret.json';
const serviceAccount = require('./configs/secret.json');

if (!admin.apps.length) {
  console.log('show in server');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mbkchat-5b996.firebaseio.com',
  });
}

export default admin;
