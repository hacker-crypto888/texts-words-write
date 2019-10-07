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



## Differences between the guest user and the connected user

There are the differences between the scope of actions that the guest user and the connected user can take.

Check out in the table in the first column the scope of actions the user can take, in the second column whether the guest user can take this action, in the third column whether the connected user can take this action, and in the fourth column what the result will be when we will be using our app.

| Actions | Guest user | Connected user | In action |
|---|---|---|---|
| Import previous sessions and edit entries | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can load all of his or her texts |
| Import previous sessions and login | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can load all of his or her texts |
| Load by date and edit current entries | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can load by date his or her texts and edit his or her entries for the current session | 
| Add new words and play the words | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users can add new words and play them | 
| Add new texts and edit entries | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users can add a new text and edit all of its entries  | 
 
As opposed to guest users, connected users can import previous sessions, and keep this continuity by adding new texts.

## Functioning of the app in the advanced parameters

The text lists constitute the app's advanced parameters, because it contains all the information about the text. It is hard to define what each piece of information corresponds to, so here is a more detailed presentation of what they each represent.

| Information about the text | Text upload by the connected user | 
|---|---|
| textId | Each text has its own key | 
| dates | Each time the user loads a text, the date is saved | 
| users | Each time the user connected user loads a text, his or her name is saved in the text information | 
| lastModified | Each time a file is loaded, its modification date is saved (a number that represents the number of milliseconds since the Unix epoch (January 1, 1970 at midnight)) | 
| name | Each time a file is loaded, its filename is saved with the extension | 
| webkitRelativePath | Each time the user choice a file in an input element, a USVString which specifies the file's path relative to the directory selected by the user is saved | 
| size | Each time a file is loaded, its size in bytes is saved | 
| type | Each time a file is loaded, its type is saved | 
| mycontent | Each time a file is dropped or selected by the user, the program parses its text content, and splits it into a word list before saving it | | 

##conflicts that can emerge from two events


|  | login / logged in | logout / logged out | new texts | texts from previous sessions |
|---|---|---|---|
| text display / remove / add / sort | The connected user can edit entries of current sessions, but keep all items of new texts and previous sessions | The guest user can only import texts and remove word entries from them | Only the connected user can remove text entries, sort previous sessions by date, and add new items |

|  | connected user | guest user |
|---|---|---|
| previous sessions upload / uploaded | Each connected user can upload his own texts from previous sessions | Only the connected user can upload files from previous sessions |
| text upload / uploaded texts | Each connected user can upload his files with text for his current session | Each guest user can upload files for his current session | 

