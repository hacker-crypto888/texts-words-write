## Please Use These Two Available Scripts

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

# My UI (User Interface)

The user must be able to: 

- [x] to modify the text without any bug, on the click of the button which has for function to load the next text, if the download link with such id already exists and text changed, do this, replace the items.json download link by a new link and update also the link for the database.json file
- [ ] load a text file
- [x] drop a database json to sort the items by date
- [x] not to load any text when textarea is empty
- [ ] display each audio in a carousel and remove slide of carousel once word is written correctly
- [x] not to load any text when dropzone is empty
- [ ] manage his or her user session 
- [ ] work with text in english, french 
- [ ] use the mp3 words from an online database for which all the links are stored in the json file (using fetch github.com/...../file.json)
- [ ] play the words continuously on the click of a button


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
