# Simple example of an English Words Pronunciation and Writing App.


## Introduction

This is a simple React script to listen to the MP3 pronunciation audio for more than 110000 unique English words/terms. 

The MP3 sources were obtained from the following project: 

[https://github.com/nathanielove/English-words-pronunciation-mp3-audio-download/](https://github.com/nathanielove/English-words-pronunciation-mp3-audio-download/).<br>

## Running

```
yarn install --save

yarn start
```

Browser will be opening at [http://localhost:3000](http://localhost:3000).<br>

## Drop any file

Use the dropzone of the upload form.
This will extract the words from your source, and make available your word items to the entries editors of the app.

The program can handle following file formats in the input:

| Format     | Supported          | By dropping a file | Input format | 
|:------------|:--------------------:|:--------------------:|--------------:|
| Plain text | <ul><li>[x] </li></ul> | <ul><li>[ ] </li> | Text field | 
| TXT       | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | File         | 
| PDFs       | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | File         |  
| DOCX       | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | File         | 


### Outline of the variables of the program

__PREVIOUS SESSIONS__  
(JSON) ALL USERS' TEXT ITEMS  

(JSON) CONNECTED USER TEXT ITEMS  
__CURRENT SESSION__  
(INPUT TEXT FIELD/DROP ZONE) CONNECTED USER TEXT ITEMS  

### Outline of the functions of the program

This program comprises five main functions: the date picker, the dropzone, the login and logout, the editor, and the audio player.

#### Date picker
The date picker sorts items by date by removing the texts that do not correspond to the selected date.

#### Dropzone
The dropzone accepts PDF, TXT, or DOCX to extract text from them, in addition to a database.json file that contains all the previous sessions of texts from all users.

#### Login /logout 
The login/logout is not secure. The password should be encrypted. An additional login page should be used in addition to a post method, or even a login API.

#### Editor
The editor displays the  number of texts from the previous and current session. It is possible to remove the word items one by one. The items are can be displayed according to a date selected in the date picker. In that case, only the user's items will be displayed sorted by date. You can also export all of the items together with that from other users.

#### Audio player
Each word item that is listed in the text items is displayed in the editor, and has an audio player. The user should play the word, write it in the word input field just above it, and make its spelling be checked by the program in order to make the audio player disappear.
