## My App To Spell And Write Words 

- Fill in a simple form and start using the app
- Registration Forms with Upload File Fields
- Load your own text
- Browse your own user writing and spelling sessions
# Simple example of App To Spell Words.

## Running

```
yarn install --save

yarn start
```

Browser will be opening at [http://localhost:3000](http://localhost:3000).<br>

# My UI (User Interface)

The program can handle following file formats in the input:




| Format | Supported          | By dropping a file | Input format | Extracted data |
| ------- | ------------------ | ---- | ---- |  |
| plain text   | :white_check_mark: | :x: |  plain text  |  |
| TXT   | :white_check_mark: | :white_check_mark: | file |  |
| PDFs   | :white_check_mark: | :white_check_mark: | file |  |
| DOCX   | :white_check_mark: | :white_check_mark: | file |  |
| HTML   | :x: | :x: | URL |  |




Extra features:
- [ ] to display each audio in a carousel and remove slide of carousel once word is written correctly
- [ ] when dropping an items.json file, two options can be proposed: start over with the same file or drop a new file
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
