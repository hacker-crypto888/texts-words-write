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

Here are tackled all the things about labels, buttons, etc. There are the differences between the scope of actions that the guest user and the connected user can take. 

Check out in the table below the scope of actions the user can take in the first column, in the second column whether the guest user can take this action, in the third column whether the connected user can take this action, and in the fourth column what the result will be when we will be using our app.


| Actions  | Guest user | Connected user | In action | Functions
|---|---|---|---|---|
| Import previous sessions or upload texts and remove texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can upload texts from previous sessions or upload texts for this session by uploading files or by using the text input field and remove the texts | <ul><li>[x] Handle texts in the same modal as the words'</li><li>[x] Remove all the words from one text on the click of a button</li><li>[x] Texts from current session</li><li>[x] Texts from previous sessions</li><li>[ ] The removal of the last item of a text must also remove the text.</li></ul>
| Add new texts using the text input field and remove words | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users can add new texts using the text input field and remove words | 
| Upload files and remove words | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can drop files and remove words from the texts the program extracted from them | <ul><li>[ ] For all type of texts, including that from uploaded files and that entered in text input field</li></ul> 
| Cancel the edits made to the texts of current session using the editor and save all texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can cancel his or her edits made to the texts of current session using the editor and save all texts including that from other users |  <ul><li>[ ] </li><li>[ ] I added radio buttons to change the display of items according to whether they are texts from previous sessions or uploaded during this session</li><li>[ ] </li><li>[ ] </li><li>[ ] </li><li>[ ] </li><li>[ ] </li><li>[ ] the name of the value containing the modified item list is: importText</li><li>[ ] On click of the "close without saving changes" button, the value of the constant variable takes the initial value of the list when the items are loaded; the "current session" checkbox is checked, the "previous sessions" checkbox is unchecked;</li><li>The initial value of importedTexts.dataset... texts when the texts are loaded is the lists of texts loaded during this sessions.</li><li>The initial value of importedTexts.dataset... prev is the list of the previous sessions of texts of the logged in user.</li><li>The initial value of importedTexts.dataset... allusers is the list of all other users' texts</li><li>[ ] according to whether the radio button of previous sessions is checked, the program redisplayes the previous sessions of texts or only the current one</li><li>[ ] the currently logged in user's items are displayed</li></ul>  
| Add new words using the text input field and remove them using the editor | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | All users can add new words using the text input field and remove them using the editor | 
| Edit texts extracted from files or the text input fields during this session and save all texts | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can save his or her new items. They will be automatically saved with other texts loaded from files or text imported using the text input field, or texts from previous sessions or from other users when using the "export my items" button | editEntriesAndSave()
| Load texts from previous sessions by date | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Each connected user can load by date the texts from his or her previous sessions | 

- Editing entries includes: removing words, removing texts, sorting texts by date, adding new words, adding new texts, and importing new texts and words from files. It is possible to use the editor to remove words or texts, or to use the text input field to add new words and texts.
- Sorting all texts by user happens at login, whereas if any user is logged in, all texts are saved with the currently logged in user.
- Saving all texts is exporting all texts. To edit entries and play the words, close the window of the editor. It must always be possible to save all items.
- There are two ways users can import texts: the guest user can only load texts and words using the text input field, whereas the connected user can upload files.
- The texts can be that of previous sessions or that of current session.
- The program should add the date of today to a text when clicking of "start a new game" and or when exporting the text with other texts
- The way to sort "texts from previous sessions" and "texts from current session" can be: the date of the text, the way to import the text (file / text inputfield vs database)
- the texts from previous sessions can be considered as such until they are modified in the editor 

## Functioning of the app in the advanced parameters

The text lists constitute the app's advanced parameters, because it contains all the information about the text. It is hard to define what each piece of information corresponds to, so here is a more detailed presentation of what they each represent.

| Information about the text | - | Text enetered in the text input field |
|---|---|---|
| textId | Each text has its own key | <ul><li>[x] </li> |
| dates | Each time the user loads a text, the date is saved | <ul><li>[x] </li> |

| users | Each time the user connected user loads a text, his or her name is saved in the text information | <ul><li>[x] </li> |
| lastModified | Each time a file is loaded, its modification date is saved (a number that represents the number of milliseconds since the Unix epoch (January 1, 1970 at midnight)) | <ul><li>[x] </li> |
| name | Each time a file is loaded, its filename is saved with the extension | 
| webkitRelativePath | Each time the user choice a file in an input element, a USVString which specifies the file's path relative to the directory selected by the user is saved | |
| size | Each time a file is loaded, its size in bytes is saved | |
| type | Each time a file is loaded, its type is saved | |
| mycontent | Each time a file is dropped or selected by the user, the program parses its text content, and splits it into a word list before saving it | | 

## Background tasks

All the actions taken by the user graphically happen also in the arrays of the program. For example, the item that is removed in the editor is also removed from the array. Here is the table to display what happens each time the user takes action more precisely. 
The table gives information about what event calls what function, what function calls what function. Which function uses a callback or a promise and which function. 

| Graphical events (user actions) | Program response | 
|---|---|
| login | <ul><li>[x] the username is displayed at the top of the page</li></ul> | 
| logout | <ul><li>[x] all texts are kept in a single list so that an other user can log in</li></ul> |
| the user imported previous sessions | <ul><li>the function to handle dropped files is called, and calls the function to handle JSON</li><li>[x] the function to handle JSON calls the function to parse a list containing information about a text</li><li>the function that parses a list calls a lto of function that add as much as information about this list so that it is handled by the program in the best way (information about the buttons that will be created, number of buttons, everything is in the list)</li></ul> | 
| the user dropped a file | <ul><li>[x] file is converted into a blob (object represents a file-like object of immutable, raw data that can be read as text or binary data)</li><li>[x] filename and icon is displayed under the dropzone</li><li>[x] text in English or French is extracted from the blob</li><li>[x] text from the file and information about the file are put together with other texts</li><li>[x] divs are added in the modal body of the editor to remove the texts and the words</li><li>[x] the words and the buttons to remove them are displayed</li></ul> | 
| the user started a new game | <ul><li>[x] the audio players are displayed</li></ul> | 
| the user clicks on the "Edit entries" and the editor modal opens | |

## What works and what doesn't

I did not implement any flag system with my text lists. Perhaps I should do so, because that would be faster to display the right words from the right texts from current and previous sessions of texts in the editor.

I extract text from PDF, DOC, and TXT the same way, although I use different callbacks or promises for each.

From the moment the text was extract text from the file (or text from the text input field), I add the text to the text lists.
I use several functions.

| column 1 | type and number of objects I create ("const") | type of the item I add to the list ("push") (a[1] = "") | 
|---|---|---|
| new text | <ul><li>1 List</li><li>JSON Array that I parse</li></ul> |  | 
| new information about that text | <ul><li>1 key value pair</li></ul> | <ul><li>1 key value pair</li><li>string or array</li></ul> | 

When I added texts to the next lists, I display the texts in the editor. I use several functions.

| column 1 | type and number of objects I create ("const") | type of the item I add to the list ("push") (a[1] = "") | 
|---|---|---|
| new text | <ul><li></li><li></li></ul> |  | 
|  | <ul><li></li></ul> | <ul><li></li><li></li></ul> | 

- If I establish a new way of adding new texts, and that all the needed information is added to the list containing all the information about the text at its import, the program is almost completely repaired.
