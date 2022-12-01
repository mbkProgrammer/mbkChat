import * as firebaseAdmin from 'firebase-admin';
import { getApp } from 'firebase-admin';

// import serviceAccount from './configs/secret.json';
const serviceAccount = require('./configs/secret.json');

if (!firebaseAdmin.apps.length) {
  console.log('show in server');
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://mbkchat-5b996.firebaseio.com',
  });
}

export default firebaseAdmin;
