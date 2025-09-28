# Admin Setup Guide

## How to Add Lucian as an Admin

To add Lucian (or any user) as an admin in the Significant application, follow these steps:

### Step 1: Update Admin Email List

1. Open the file `src/utils/userRoles.js`
2. Find the `ADMIN_EMAILS` array (around line 12)
3. Replace `'lucian@example.com'` with Lucian's actual email address
4. You can add multiple admin emails to this array

Example:
```javascript
const ADMIN_EMAILS = [
  'lucian@actualdomain.com',  // Lucian's real email
  'admin@significant.com',    // Additional admin
  // Add more admin emails as needed
];
```

### Step 2: How the Admin System Works

- **Automatic Role Assignment**: When a user signs up or logs in, the system automatically checks if their email is in the `ADMIN_EMAILS` list
- **Database Storage**: User roles are stored in Firebase Firestore in a `users` collection
- **Admin Dashboard**: Admin users get access to `/admin` route with special functionality
- **Visual Indicators**: Admin users see "(Admin)" next to their name and get a gold "Admin" link in navigation

### Step 3: Admin Features

Once Lucian is added as an admin, he will have access to:

1. **Admin Dashboard** (`/admin` route)
   - Special admin-only page
   - System information
   - Admin controls and actions

2. **Enhanced Navigation**
   - Gold-colored "Admin" link visible only to admin users
   - Admin status displayed in user welcome message

3. **Role-based Access Control**
   - Automatic redirection for non-admin users trying to access admin pages
   - Server-side role verification

### Step 4: Testing Admin Access

1. Have Lucian create an account using his email address (via `/signup`)
2. The system will automatically assign him admin role if his email is in the list
3. After login, he should see "(Admin)" next to his name when logged in
4. He should see the gold "Admin" link in the navigation
5. He can access the admin dashboard at `/admin`

### Security Notes

- Admin emails are configured in the frontend code but roles are verified against the Firestore database
- The system creates user documents in Firestore automatically during signup/login
- Only users with emails in the `ADMIN_EMAILS` list can become admins
- Admin status is checked on every page load for security

### Firestore Database Structure

The system creates documents in the `users` collection with this structure:
```javascript
{
  email: "user@example.com",
  role: "admin" | "user",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### Firebase Configuration Required

Make sure Firebase Firestore is enabled in your Firebase project:
1. Go to Firebase Console
2. Select your project (`significant-a7862`)
3. Navigate to Firestore Database
4. Create the database if not already created
5. Set up security rules as needed

### Troubleshooting

If admin access is not working:

1. Check that Lucian's email is exactly as written in `ADMIN_EMAILS` (case-insensitive)
2. Verify Firebase Firestore is properly configured and accessible
3. Check browser console for any authentication or database errors
4. Ensure Lucian is logging in with the exact email address listed as admin
5. Verify that the Firebase project has Firestore enabled