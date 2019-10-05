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
This will extract the words from your source, and make available your word items to the entries editor, by date, or by sorting items yourself.

The program can handle following file formats in the input:

| Format     | Supported          | By dropping a file | Input format | 
|------------|--------------------|--------------------|--------------|
| Plain text | <ul><li>[x] </li></ul> |                 | Plain text   | 
| TXT        | <ul><li>[x] </li></ul>| <ul><li>[x] </li><ul> | File         |  
| PDFs       | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | File         |  
| DOCX       | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | File         | 
| HTML       |                 |                 | URL          | 



## Word lists and user permissions

After importing any normal text, the items are sorted automatically. The app enables you to:

| Section of the app | Imported data type | Content options | Exported data type | 
|---|---|---|---|
| Edit entries | Word list | Remove entries | edited word list | 
| Load by date | Word list | Remove entries | sorted word list | 
| Add new word | Word | Add entry | word list | 
| add new text | text | add entries | new text entry | 
| drop a file | text list | add entries | new text entry | 
| start a new game | audio files | play each entry | scores | 
| play all the words | audio files | play all entries | none | 

