## My App To Spell And Write Words 

- Fill in a simple form and start using the app
- Registration Forms with Upload File Fields
- Load your own text and browse your own user history of spelling and writing sessions
- Edit your text, re-load, and re-download new output JSON files as many time as needed

## Please Use These Two Available Scripts

In the project directory, you can run:

### `npm install --save`

Installs all the dependencies in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Tests to be made on the audio files launcher:

The user could:

- [ ] load a JSON file, then launch the audio files thanks to start game button
- [ ] load a JSON file, then edit the items, then launch the audio files
- [ ] load JSON and-or other files, and launch the audio files

It is very important that:

- [ ] the lists were reinitiased after edits
- [ ] the user could play the loaded words after edits
- [ ] the user could add a single new word

# My UI (User Interface)

The user must be able to: 

- [ ] wait for the display of the audio files thanks to a spinner 
- [x] load a text file
- [x] handle empty date input
- [x] drop a database json to sort the items by date
- [x] not to load any text when textarea is empty
- [ ] display each audio in a carousel and remove slide of carousel once word is written correctly
- [ ] the program modifies the word according to its termination, therefore it can find the word in the database of sounds (in the mp3 file list in all the keys of key value pairs, all the keys are all the words of the database)
- [x] not to load any text when dropzone is empty
- [ ] manage his or her user session 
- [ ] work with text in english, french 
- [ ] load a file in a dropzone to play
- [x] use the mp3 words from an online database for which all the links are stored in the json file (using fetch github.com/...../file.json)
- [ ] play the words continuously on the click of a button
- [ ] when dropping an items.json file, two options should be proposed: start over with the same file or drop a new file

The program can handle following file formats in the input:

- [x] plain text
- [x] TXT
- [x] PDFs 
- [x] DOCX
- [ ] HTML

The user can: 

- [x] enter a text
- [ ] load the words by date
- [x] load a text in a text area
- [x] load a text file



Recently, the program was modified to be able to handle texts and the words they contain by an ID that refers to the text(s) the word belongs to.

The program can handle the big arrays and retrieve the relevant data from them by simple commands, and it could be practical to be able to the same directly from the graphical interface.

On the page of databases, there must be written: "Here is the text you entered"/"Here is the date you selected", then, below: "Here is the associated word list". ( in the program, one must be able to find the dates in the chart containing the words).

The database contains 3 columns: id (string type), word (string type), date (array type).

The program compiles the word list under the form of a JSON file.

To be able to load a JSON should be as practical as to be able to import any file containing text. The parts of the program that handle text should really have a sort of output that enable easy transfer to JSON format. The use of data transfers, and datasets to retrieve the results in other parts of the program is the key.

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

- [x] Mega database containing words from text of previous days and the texts entered today
- [x] File containing the words selected with the submission form 

Those were optional features, and were put in the "removed" section

- [ ] in the part of my program where there is a JSON.stringify a blob and all of this generates a new link, all of this can also generate the audio files on the page at the right place
- [ ] to modify the text without any bug, on the click of the button which has for function to load the next text, if the download link with such id already exists and text changed, do this, replace the items.json download link by a new link and update also the link for the database.json file
Output Files



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
