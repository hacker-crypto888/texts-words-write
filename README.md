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



## Word lists and user permissions

After importing any normal text, the items are sorted automatically. This is the scope of content options for configuring your app:

| Section of the app | Imported data type | Content options | 
|---|---|---|
| Edit entries | Word list | Remove entries | 
| Load by date | Word list | Remove entries | 
| Add new word | Word | Add entry | 

## Word lists and user permissions

The program saves some pieces of information about each text:

| Information about the text | information about this parameter | 
|---|---|
| textId | each text has its own key | 
| dates | each time the user loads a text, the date is saved | 
| user | the users who loaded this text | 
| last modification date | Word | 
| last modification date | Word | 
| last modification date | Word | 
| last modification date | Word | 
| last modification date | Word | 



| Section of the app | Imported data type | Content options | Number of times | 
|---|---|---|---|
| start a new game | audio files | play each entry |  | 
| play all the words | audio files | play all entries |  | 

