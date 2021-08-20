const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const app = express();
const port = 5000
const knex = require('./database/db')
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Turing ECommerce API',
            version: '1.2.13',
            description: "Official documentation about Turing Ecommerce API."
        }
    },
    apis: ['app.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.json())
/** 
* @swagger

* /user/{id} :
*   get:

*     description: Get all users
*     parameters:
*     - name: id
*       description: ID
*       in: path
*       required: true
*       type: string


*     responses:
*       200:
*         description: Success
*
*/

app.get('/user/:id', (req, res) => {
    knex
        .select("*")
        .from("users")
        .where('id', req.params.id)
        .then((data) => {
            console.log('User created successfully')
            console.log(data);
            res.json({ message: data })
        }).catch((err) => {
            console.log(err);
        })
})
/////////////////////////////////////////
/**
* @swagger
* /user:
*   post:
*     description: Create a User
*     parameters:
*     - name: name
*       description: Name
*       in: query
*       required: true
*       type: string

*     - name: email
*       description: Email
*       in: query
*       required: true
*       type: string

*     - name: password
*       description: Password
*       in: query
*       required: true
*       type: string

*     responses:
*       201:
*         description: User Created
*
*/

app.post('/user', (req, res) => {
    // console.log(booksreq.query);
    knex('users')
        .insert({
            name: req.query.name,
            email: req.query.email,
            password: req.query.password
        })
        .then((data) => {
            console.log('User created successfully')
            res.json({ message: data })
        }).catch((err) => {
            console.log(err);
        })
})


/**
* @swagger
* /update/{id}:
*   put:
*     description: Update a User
*     parameters:
*     - name: id
*       description: ID
*       in: path
*       required: true
*       type: string

*     - name: name
*       description: Name
*       in: query
*       required: true
*       type: string

*     - name: email
*       description: Email
*       in: query
*       required: true
*       type: string

*     - name: password
*       description: Password
*       in: query
*       required: true
*       type: string

*     responses:
*       201:
*         description: User updated !
*
*/

app.put('/update/:id', (req, res) => {
    // console.log(req.query);
    knex('users')
        .where('id', req.params.id)
        .update({
            id: req.params.id,
            name: req.query.name,
            email: req.query.email,
            password: req.query.password
        })
        .then((data) => {
            console.log('User Updated successfully')
            res.json({ message: data })
        }).catch((err) => {
            console.log(err);
        })
})


/**
* @swagger
* /delete/{id}:
*   delete:
*     description: Update a User
*     parameters:
*     - name: id
*       description: ID
*       in: path
*       required: true
*       type: string

*     responses:
*       201:
*         description: Deleted Sucessfully
*
*/

app.delete('/delete/:id', (req, res) => {
    // console.log(req.query);
    knex('users')
        .where('id', req.params.id)
        .del()
        .then((data) => {
            console.log('User Deleted successfully')
            res.json({ message: data })
        }).catch((err) => {
            console.log(err);
        })
})







app.listen(port, () => console.log(`port ${port}`))