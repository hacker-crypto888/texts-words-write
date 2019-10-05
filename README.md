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
| Plain text | :white_check_mark: | :x:                | Plain text   | 
| TXT        | :white_check_mark: | :white_check_mark: | File         |  
| PDFs       | :white_check_mark: | :white_check_mark: | File         |  
| DOCX       | :white_check_mark: | :white_check_mark: | File         | 
| HTML       | :x:                | :x:                | URL          | 



## Word lists and user permissions

After importing any normal text, the items are sorted automatically. The app enables you to:

| section of the app | data type | content options | 
|---|---|---|
| edit entries | word list | remove entries | 
| load by date | word list | remove entries | 
| add new word | word | add entry | 
| add new text | text | add entries |
| drop a file | text list | add entries |
| start a new game | audio files | play each entry |
| play all the words | audio files | play all entries |

