## Summary

This application uses machine learning to detect faces in user provided images. The application features a RESTful API backend built with Node.js, and a PostgreSQL database used to securely store user information. User passwords are stored security using bcrypt hashing.  

## Instructions:

Login/Registration: Upon opening the application, the user is brought to the login page. If the user is new, then the user must click on the ‘Register’ link on the upper-right-hand corner of the screen. The user must register using their name, email, and a password. When the user clicks the submit button, the user information is transferred via a POST request to a REST api I built using Node.js and Express. The server receives the POST request, uses the bcrypt library to create a hash of the password, then stores the name, email and password-hash in a PostgreSQL database I have running on Heroku. The password-hash keeps the user information secure in the event of a server breach.

 

Main-Page: After registering, the user is brought to the main screen where the instructions for the application are listed. Users may paste an image url, such as https://media.coindesk.com/uploads/2017/01/rock-climbing-e1483475838567.jpg , into the input box located in the middle of the screen. After pressing the “Detect” button, the image is displayed below the input box, and a blue box is automatically drawn around the first human face in the picture. This is achieved through a fetch request to the Clarifai API, which uses a machine learning algorithm to detect human faces. The Clarifai API returns the coordinates of any detected faces, which the application uses to draw the face-detection-box around the face. Each time a user hits the “detect” button, the count of humans identified by the user is incremented by one.

 

When the user is done testing the application with different images, the user may then sign-out.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
