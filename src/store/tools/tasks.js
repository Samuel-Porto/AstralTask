import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, user } from "../firebase.js";

/**
 * Add a task on the especified group
 * @param {String} groupId Group's id
 * @param {String} taskName Task's name
 */
export async function addTask(groupId, taskName) {
    await addDoc(collection(db, `users/${user.uid}/groups/${groupId}/tasks`), {name: taskName, createdAt: serverTimestamp(), fulfilled: false, special: false, groupId});
}

/**
 * Delete the especified task
 * @param {String} groupId Group's id
 * @param {String} taskId Task's id
 */
export async function deleteTask(groupId, taskId) {
    await deleteDoc(doc(db, `users/${user.uid}/groups/${groupId}/tasks/${taskId}`));
}

/**
 * Edit the task property
 * @param {String} groupId Group's id
 * @param {String} taskId Task's id
 * @param {Object} changes changes inside an object
 */
export async function editTask(groupId, taskId, changes) {
    await updateDoc(doc(db, `users/${user.uid}/groups/${groupId}/tasks/${taskId}`), changes);
}
