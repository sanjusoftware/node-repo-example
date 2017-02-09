# Simple Contact

Simple contact management running in local memory.

A `contact` looks like this:

```
[
    {
    "id": "1",
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
To install you need to have node version 6.x.x in your system. Then just run:
`npm install`
`node index.js`

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

You can check out the complete API documentation at [Swagger](http://localhost:3000/#/Contacts).

## Test
`npm test`

## Author
[@hismamaz](https://twitter.com/hismamaz)

[@haruelrovix](https://twitter.com/hismamaz)

