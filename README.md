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


# Mon IU (Interface Utilisateur) / My UI (User Interface)

L'utilisateur peut :

- [x] entrer un texte

- [x] charger les mots par date 

- [x] charger un texte dans une zone de texte 

- [ ] charger un texte dans une zone "Charger un fichier texte" 

Sur la page des bases de données, il doit être écrit : "Voici le texte que vous avez entré"/"Voici la date que vous avez sélectionnée", puis, en dessous : "Voici la base de mots qui y est associée". ( à l'intérieur du programme, on doit pouvoir trouver les dates dans le tableau contenant les mots).

La base de données contient 3 colonnes : id (string type), mot (string type), date (array type).

Le programme récupère la base de mots sous la forme d'un fichier JSON.


L'utilisateur peut : 

- [x] jouer les mots un par un, les écrire et avoir une validation instantanée

- [ ] jouer tous les mots / play all the words


L'utilisateur peut :

- [x] créer un fichier JSON qui a comme colonnes : date, nom de fichier
- [x] créer un formulaire pour créer ce fichier JSON
- [x] écrire le programme qui utilise le fichier JSON pour charger une liste de mots

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

- Open file with text -> split into list of words

Save the words in DB
    
- Open big database with "id", "word", and "date" columns

- update = Append new words to the base

Start the app

- Write a simple JSON file with columns "id" and "word" and start the app 


        Selection of words in the database using date of data entry

- Open big database 

- Save words matching the specified date of data entry in a JSON file with "id" and "word" columns, then start the app
