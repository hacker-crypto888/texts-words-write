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
| Import previous sessions | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can import previous sessions of texts | 
| Add new texts using the text input field and remove words | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users can add new texts using the text input field and remove words | 
| Remove texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can remove texts from previous sessions or texts uploaded during this session | 
| Upload files and remove words | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can drop files and remove words from texts the program extracted from them | 
| Cancel the edits made to the texts using the editor and save all texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can cancel its edits and save all texts including that from other users | cancelTheEdits(entriesList) saveAllTexts()
| Add new words using the text input field and remove them using the editor | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users can add new words using the text input field and remove them using the editor | 
| Edit entries and save all texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can edit entries and save all of his texts with that from other users | editEntriesAndSave()
| Edit entries and save texts from current session | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can edit entries and save texts from current session. They will be automatically saved with that from previous sessions and from other users | 
| Load texts by date | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can load by date the texts from his or her previous sessions | 
| Edit entries using the editor from the app and cancel the edits | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | -------Each connected user --------can remove the words from the imported texts and cancel the modifications | edit entries

- Editing entries includes: removing words, removing texts, sorting texts by date, adding new words, adding new texts, and importing new texts and words from files. It is possible to use the editor to remove words or texts, or to use the text input field to add new words or texts.
- Sorting all texts by user happens at login, whereas if any user is logged in, all texts are saved with the currently logged in user.
- Saving all texts is exporting all texts. To edit entries and play the words, close the window of the editor.
- There are two ways users can import texts: the guest user can only load texts and words using the text input field, whereas the connected user can upload files.

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
| login | <ul><li>[x] the username is displayed at the top of the page</li></ul> |
| logout | <ul><li>[x] all texts are kept in a single list so that an other user can log in</li></ul> |
| the user imported previous sessions | <ul><li>[x] import texts from all users</li><li>[x] separate texts from other users from texts from user that is currently logged in</li></ul> | 
| the user dropped a file | <ul><li>[x] file is converted into a blob (object represents a file-like object of immutable, raw data that can be read as text or binary data)</li><li>[x] filename and icon is displayed under the dropzone</li><li>[x] text in English or French is extracted from the blob</li><li>[x] text from the file and information about the file are put together with other texts</li><li>[x] divs are added in the modal body of the editor to remove the texts and the words</li><li>[x] the words and the buttons to remove them are displayed</li></ul> | 
| the user started a new game | <ul><li>[x] the audio players are displayed</li></ul> | 
