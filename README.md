## My App To Spell And Write Words 

- Fill in a simple form and start using the app
- Registration Forms with Upload File Fields
- Load your own text
- Browse your own user writing and spelling sessions

## Please Use These Two Available Scripts

In the project directory, you can run:

### `yarn install --save`

Installs all the dependencies in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The program can handle following file formats in the input:

- [x] plain text
- [x] TXT
- [x] PDFs 
- [x] DOCX
- [ ] HTML

# My UI (User Interface)

The user is able: 

- [x] to work with texts in English
- [x] to load a file in a dropzone to play the words
- [x] to play the mp3 audio files from an online file database
- [x] to play the words continuously on the click of a button
- [x] to display a spinner during the loading of the audio files 
- [x] to handle empty date input in the date input field
- [x] to sort the items by date from a json file
- [x] not to load any text when textarea is empty
- [x] not to load any text when dropzone is empty
- [x] to load a text in a text area
- [x] to play the words one by one
- [x] check the writing of the words one by one
- [x] not to reinitialize the lists after edits
- [x] to play the loaded words after editing the word entries
- [x] to add a single new word
- [ ] to manage user sessions 
- [ ] to work with texts in French

Extra features:
- [ ] to display each audio in a carousel and remove slide of carousel once word is written correctly
- [ ] when dropping an items.json file, two options can be proposed: start over with the same file or drop a new file
- [ ] the program modifies the word according to its termination, therefore it can find the word in the database of sounds (in the mp3 file list in all the keys of key value pairs, all the keys are all the words of the database)

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
