// How to add custom claims => https://www.youtube.com/watch?v=4wa3CMK4E2Y&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=18

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // Get user and add custom claim (admin).
    return admin.auth().getUserByEmail(data.email).then( user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an Admin!`
        }
    }).catch(err => {
        return err;
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });