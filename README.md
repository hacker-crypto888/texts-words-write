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

This is the differences between the scope of actions of the guest user and the connected user can take.

Check out in the table in the first column the scope of actions the user can take, in the second column whether the guest user can take this action, in the third column whether the connected user can take this action, and in the fourth column what the result will be when we will be using our app.

| Actions | Guest user | Connected user | In action |
|---|---|---|---|
| Save and load text history | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can load all of his or her texts |
| Load by date | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can load by date his or her texts | 
| Add new word | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users without distinction can add a new word | 

## Functioning of the app in the advanced parameters for all users

The text list constitutes the advanced parameters for the app, because it contains all the information about the text. It is hard to define what each piece of information corresponds to, so here is a more detailed presentation of what they each represent.

| Information about the text | information about this parameter | 
|---|---|
| textId | Each text has its own key | 
| dates | Each time the user loads a text, the date is saved | 
| users | Each time the user loads a text, his or her name is saved in the text information | 

