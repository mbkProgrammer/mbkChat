import * as firebaseAdmin from 'firebase-admin';
import { getApp } from 'firebase-admin';

import serviceAccount from './configs/secret.json';

if (!firebaseAdmin.apps.length) {
  console.log('show in server');
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: 'https://mbkchat-5b996.firebaseio.com',
  });
}

export default firebaseAdmin;
