# Protractor Practice Tests

Running several tests with Protractor to practice end-to-end automation.

---


1. **User Login with Valid Credentials**
2. **User Login with Invalid Credentials**
3. **Login Attempt with Empty Fields**
4. **Profile Page Validation After Login**
5. **Logout Functionality**
6. **Unauthorized Profile Access Without Login**

---

1. **Create a `config.js` file** in the project root with the following content:

   ```javascript
   module.exports = {
     username: 'YourUsername',
     password: 'YourPassword'
   };

1. Commmand for running tests - npx protractor protractor.conf.js
