/* const admin = require('firebase-admin')

var serviceAccount = require('./ExcelBD-f52f61863d74.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export default admin.firestore() */
import config from './configFire'
const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()
