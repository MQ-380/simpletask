# PAYPAY CODE CHALLENGE

## Tech Introduction
Frontend: 
* React
* React Hook : All made by Functional Component 
* Antd: The component CSS is done by Antd style.
* Webpack, Babel: the default setting of create-react-app

Backend:
* Node.js
* Koa: Using the Koa framework 

Database:
* Mysql

## How to Run
### Config
1. made the database done
    remember the database name, the username and the password
2. Search "Config database here" in the project
    let the value be the correct one.
3. Search "config here". There will be two parts to be filled or corrected.
   backend_prefix:   the API address prefix, the default port of this backend server is 7000.
   frontend_address: the address which is the frontend, the defaulut port is 3000.
### Frontend
1. cd ${Project_address}
2. yarn 
3. yarn start
4. open the browser.

### Backend
1. cd app
2. npm install
3. npm run dev  / npm start

## How to Use 
1. There is a default user "root", use this name and put any words in password filed to login the system as admin user.
2. The login function is the mock one, the username must be added to the database, but the password is not checked, please use any words you like~.
3. The system has two kind of user, which are 'Admin' and 'Employee'. The functional diffirence is as same as the introduction.
4. As admin users, you can add user which is admin or employee, and request the review to the employee or the other admin.
5. In the review management, the review info only can be edited when it have not been done.
6. As employee users, you can only fill the request and give the feedback.


## Frontend Structrue:
App -> Login -> Home  - (Admin user) -> UserInfo     -> CommonTable  ->  Add/Delete/Edit/Find
                      - (Admin user) -> ReviewInfo   -> CommonTable  ->  Add/Edit/Find
                      - (Employee user) -> TodoList  -> ButtonClick  ->  Modal to do the review
    -> No Login -> Login 

## Backend Structrue:
app -> routes -> controller -> module -> database operate -> callback

## Page Introduction
1. Login Page
2. User Management Page
3. Review Management Page
4. Fill Review Page

In the table, you can click the row and get in to the detail Modal or edit the information.

the 3 and 4 are using the one Component called "CommonTable", which is setting by the props.

## API Introduction (10 APIs)
1. Login

/login: (username) => {code, statue, data: {the login user}}
2. User 

/user/users: () => {code, msg, data (all Users)}

/user/addUser: (username, usertype, userage) => {code, msg, data(all Users after add)}

/user/editUser: (username, usertype, userage) => {code, msg}

/user/delUser: (user_id) => {code, msg}
3. Review

/review/reviews: () => {code, msg, data(all Reviews)}

/review/addReview: (from, to, nowUser) => {code, msg}

/review/editReview: (from,to) => {code, msg}

/review/getReviewList: (nowUser) => {code, msg, data(all reviews to be done by now user)}

/review/completeReview: (content) => {code, msg}

## Database SQL:
```sql
-- users definition
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_age` int NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
);

-- reviews definition
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `review_from` varchar(255) NOT NULL,
  `review_to` int NOT NULL,
  `has_done` tinyint(1) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `create_by` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`review_id`)
);
```

## Can be improved
1. Login function can be improved to the true login.
2. The apis should have the authentication to provide the attacking.
3. The user table can provide more data of the review situation.
4. The logger and security operation should be improved in the backend server.
   


** Thanks for your time to review my work. Have a nice day~ **





