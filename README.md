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


## Use `database.json` in Your Application

The [database.json](database.json) file contains the information about to the text files for all imported words.<br>
For example, the output of the text lists resembles something like:

```json
    [
      [
        "textId",
        78887
      ],
      [
        "dates",
        [
          "9/15/2019"
        ]
      ],
      [
        "lastModified",
        null
      ],
      [
        "lastModifiedDate",
        null
      ],
      [
        "name",
        null
      ],
      [
        "size",
        null
      ],
      [
        "type",
        null
      ],
      [
        "webkitRelativePath",
        null
      ],
      [
        "mycontent",
        [
          "word1",
          "word2",
          "word3",
          "word100"
        ]
      ],
      [
        "word",
        "word1"
      ]
    ],
```
where the latest entry *word* is added only when exporting the items.<br>

Extra features:
- [ ] to display each audio in a carousel and remove slide of carousel once word is written correctly
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
