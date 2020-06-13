import { firestore } from '../base'

export const getUserProfile = (userId) => firestore.collection('users').doc(userId)
