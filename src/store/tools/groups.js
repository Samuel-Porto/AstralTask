import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, user } from '../firebase.js';

/**
 * Adds a group to the user's account
 * @param {String} groupName Group's name
 */
export async function addGroup(groupName) {
    addDoc(collection(db, `users/${user.uid}/groups`), {name: groupName, createdAt: serverTimestamp()});
}

/**
 * Delete the group by its id
 * @param {String} groupId Group's id
 */
export async function deleteGroup(groupId) {
    let allTasks = await getDocs(collection(db, `users/${user.uid}/groups/${groupId}/tasks`));
    let deleteTasks = [];

    allTasks.docs.forEach(doc => deleteTasks.push(deleteDoc(doc.ref)));

    await Promise.all(deleteTasks);

    await deleteDoc(doc(db, `users/${user.uid}/groups/${groupId}`));
}