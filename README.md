This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install --save`

Install all the dependencies in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

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


# My UI (User Interface)

The user can:

- [x] enter a text
- [x] load the words by date
- [x] load a text in a text area
- [ ] load a text file

On the page of databases, there must be written: "Here is the text you entered"/"Here is the date you selected", then, below: "Here is the associated word list". ( in the program, one must be able to find the dates in the chart containing the words).

The database contains 3 columns: id (string type), word (string type), date (array type).

The program compiles the word list under the form of a JSON file.


The user can: 

- [x] play the words one by one, write them, and have an instant validation

- [ ] play all the words


The user can also:

- [x] create a JSON file which has for columns: date, file name
- [x] create a form to create this JSON file
- [x] write the pogram which uses this JSON file to load a word list

Form Submission Fields / Les champs de formulaires

- [x] Name
- [x] Email
- [x] Text of the day
- [x] Date
- [ ] parse text in French
- [ ] parse text in English

Output Files

- [x] Mega database containing words from text of previous days and the texts entered today
- [x] File containing the words selected with the submission form 

## Database files

        Words from text of the day 

- Text -> file

- Open file with text -> split into word list

Save the words in DB
    
- Open big database with "id", "word", and "date" columns

- update = Append new words to the database

Start the app

- Write a simple JSON file with columns "id" and "word" and start the app 


        Selection of words in the database using date of data entry

- Open big database 

- Save words matching the specified date of data entry in a JSON file with "id" and "word" columns, then start the app
