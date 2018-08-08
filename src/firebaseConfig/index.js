import * as app from 'firebase/app'
import * as auth from 'firebase/auth'
import * as db from 'firebase/database'
import config from './config'

let firebaseApp = app.initializeApp(config)
let firebaseAuth = auth
let firebaseDb = db

export {
  firebaseApp,
  firebaseAuth,
  firebaseDb
}
