import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../pages/firebaseConfig';

// Define user roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

// Admin users list - Add Lucian's email here
// TODO: Replace 'lucian@example.com' with Lucian's actual email address
const ADMIN_EMAILS = [
  'lucian@example.com',  // Replace with Lucian's actual email
  'admin@significant.com', // Example additional admin email
  // Add more admin emails as needed
];

/**
 * Get user role from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<string>} - User role
 */
export const getUserRole = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data().role || USER_ROLES.USER;
    }
    return USER_ROLES.USER;
  } catch (error) {
    console.error('Error getting user role:', error);
    return USER_ROLES.USER;
  }
};

/**
 * Set user role in Firestore
 * @param {string} uid - User ID
 * @param {string} email - User email
 * @param {string} role - User role
 */
export const setUserRole = async (uid, email, role = USER_ROLES.USER) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    
    // Check if user should be admin based on email
    const shouldBeAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
    const finalRole = shouldBeAdmin ? USER_ROLES.ADMIN : role;
    
    await setDoc(userDocRef, {
      email: email,
      role: finalRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    console.log(`User ${email} assigned role: ${finalRole}`);
    return finalRole;
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
};

/**
 * Check if user is admin
 * @param {string} uid - User ID
 * @returns {Promise<boolean>} - Whether user is admin
 */
export const isUserAdmin = async (uid) => {
  const role = await getUserRole(uid);
  return role === USER_ROLES.ADMIN;
};

/**
 * Check if email is in admin list
 * @param {string} email - Email to check
 * @returns {boolean} - Whether email is admin
 */
export const isAdminEmail = (email) => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * Get list of admin emails (for reference)
 * @returns {Array<string>} - List of admin emails
 */
export const getAdminEmails = () => {
  return [...ADMIN_EMAILS];
};