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

Check out in the table below the scope of actions the user can take in the first column, in the second column whether the guest user can take this action, in the third column whether the connected user can take this action, and in the fourth column what the result will be when we will be using our app.


| Actions  | Guest user | Connected user | In action | Functions
|---|---|---|---|---|
| Import previous sessions | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can import previous sessions | 
| Add new words and play the words | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users can add new words and play them | 
| Edit entries and cancel the edits | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can add edit the entries of the texts he or she imported and cancel the modifications | 
| Import texts and remove texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can remove texts | 
| Import texts and remove words | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users can remove words from texts they imported | 
| Cancel the edits and save all texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can cancel its edits and save all texts including that from other users | cancelTheEdits(entriesList) saveAllTexts()
| Edit entries and save all texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can edit entries and save all of his texts with that from other users | 
| Edit entries and save texts from current session | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can edit entries and save texts from current session. They will be automatically saved with that from previous sessions and from other users | 
| Load texts by date | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can load by date the texts from his or her previous sessions | 

- Editing entries includes: removing words, removing texts, and sorting texts by date.
- Sorting all texts by user happens at login, whereas if any user is logged in, all texts are saved with the currently logged in user.
- Editing lists includes: adding new words, adding new texts, and importing new texts and words from files.

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

## Background tasks

| User actions | Task done by the program | 
|---|---|
| the user imported previous sessions | <ul><li>[x] import texts from all users</li><li>[x] separate texts from other users from texts from user that is currently logged in</li></ul> | 
| the user dropped a file | <ul><li>[x] text is extracted</li><li>[x] information about this file is saved</li><li>[x] text is put together with other texts</li></ul> | 
