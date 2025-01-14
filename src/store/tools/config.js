import { doc, updateDoc } from "firebase/firestore";
import { user, db } from "../firebase.js";

/**
 * Update the current config of user's account
 * @param {Object} config Object with all changes
 */
export async function changeConfigOfUser(config) {
    updateDoc(doc(db, `users/${user.uid}/`), config);
}