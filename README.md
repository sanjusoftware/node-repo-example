# Simple Contact

Simple contact management running in local memory.

A `contact` looks like this:

```
[
    {
    "firstName": "Bilbo",
    "lastName": "Baggins",
    "age": 111,
    "photo": "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
    "other": {}
    }
]
```

## Features

- View all contacts
- View a contact
- Create new contact
- Edit a contact
- Delete a contact
- Delete all contacts


## Quick start
To install you need to have node version 6.x.x in your system. 

Then just run:

`npm install`

`npm start`

it will run on port 3000 by default, or you can specify your port of choice 
by specifying `PORT` in your environment variables.

## API Documentation
These are following API available 

- GET /contact/list
- GET /contact/{firstname}
- POST /contact
- PUT /contact/{firstname}
- DELETE /contact/{firstname}
- DELETE /contact

You can check out the complete Swagger-API documentation at [http://localhost:3000/#/Contacts] (http://localhost:3000/#/Contacts).

## Test
`npm test` 

for running unit test

`npm run coverage` 

for generating code coverage, it will generate them in <root_directory>/coverage

## Author
[@hismamaz](https://twitter.com/hismamaz)

[@haruelrovix](https://twitter.com/hismamaz)

