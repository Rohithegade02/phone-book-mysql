import express from 'express';
import Table from './models/index.js'
import UserRoute from './router.js'
import cors from 'cors'
import path from 'path';

import { fileURLToPath } from 'url';
const app = express()

app.use(cors())
app.use(express.json())

// Convert __dirname to work in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user',UserRoute)
app.get('/', (req, res) => {
    res.send('Hello Server')
})
app.listen(4000, () => {
    console.log(' server running')

    Table.createTable().then(() => {
        console.log('Table created')
    }).catch(err => {
        console.log(err)
    })
})

// create a phone book system to store contacts, this system needs to be built with React for the frontend Node/Express for the backend and Mysql for the db.

// server
//  Create CRUD operations to store a contact in a database.
//  Each contact will have the following properties:
// First name
// Last name
// Nickname
// List of phone numbers(a contact may have multiple phone numbers)
// Address
// Photo
//  Store all data in Mysql, the database will run on a docker.
// You may add additional content in order to complete the ass
// You may add additional content in order to complete the assignment as you see fit.
// Front
//  The application will show a list of the first 5 contacts, each row will show the nickname of the user if it’s available, if not it will show a concatenation of the first and last name and the photo of the contact.
//  The list will be sorted by name in a descending order and will support infinite scrolling, always showing 5 contacts at a time.
//  The main gui should also have a functional search field to search
// The main gui should also have a way to add a new contact
//  It will have a form to add all of the contact details.
//  It will have a way to upload an image to be saved as the contact photo, only jpeg and png image formats will be supported.
//  It will have an option to apply a filter to the user photo and the filter amount, the filters that can be applied are:
// Gray scale
// Blur
// Saturation
//  The contacts in the list should be clickable, once a user been clicked a popup should appear with all of the contac
// Gopi Agarwal
// 4:07 PM
// with all of the contacts details, within this popup there should be the option to edit the contact(should have the same functionality as the add contact) and a way to delete the contact