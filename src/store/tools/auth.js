import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { user } from "../firebase.js";
import { doc, setDoc } from "@firebase/firestore";

/**
 * Create account of the user
 * @param {String} email user's email
 * @param {String} password user's password
 */
export async function registerAccount(email, password) {
    let error;
    await createUserWithEmailAndPassword(auth, email, password)
    .catch(e => error = e.code);
    !error && await setupAccount(user.uid);
    
    return error;
}

/**
 * Login on the account
 * @param {String} email user's email
 * @param {String} password user's password
 */
export async function signInAccount(email, password) {
    let error;
    await signInWithEmailAndPassword(auth, email, password)
    .catch(e => error = e.code);

    return error;
}

/**
 * Set the user basic info of the user
 * @param {String} userId User unique id
 */
async function setupAccount(userId) {
    await setDoc(doc(db, `users/${userId}`), {darkMode: true});
}