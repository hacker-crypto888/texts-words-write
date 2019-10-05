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


## Use `database.json` 

The [database.json](database.json) file contains the information about the text files for all imported words.<br>
For example, the output of the text lists resembles something like:

```json
    [
      {
        "textId": 78887
      },
      {
        "dates": [
          "9/15/2019"
        ]
      },
      {
        "lastModified": null
      },
      {
        "lastModifiedDate": null
      },
      {
        "name": null
      },
      {
        "size": null
      },
      {
        "type": null
      },
      {
        "webkitRelativePath": null
      },
      {
        "mycontent": [
          "word1",
          "word2",
          "word3",
          "word100"
        ]
      },
      {
        "word": "word1"
      }
    ],
```
While the corresponding segment for a text extracted from a dropped file will look like:
```json
    [
    [
      {
        "lastModified": 1568926015992
      },
      {
        "lastModifiedDate": "2019-09-19T20:46:55.992Z"
      },
      {
        "name": "secondname.txt"
      },
      {
        "webkitRelativePath": ""
      },
      {
        "size": 9
      },
      {
        "type": "text/plain"
      },
      {
        "mycontent": [
          "a",
          "b",
          "c",
          "d"
        ]
      },
      {
        "textId": "2bc2e1ff"
      },
      {
        "word": "a"
      }
    ],
    ],
```

## Text lists and editing permissions

After importing any normal text, you must create a check out the items that were sorted automatically to sort them manually:

| section of the app | data type | content options | 
|---|---|---|
| edit entries | word list, info about the text | remove entries | 
| load by date | word list, info about date only | remove entries | 
| export my items | word list, info about the text | read only | 
| add new word | word | add entry | 
| add new text | text | add entries |
| drop a file | text | add entries |


