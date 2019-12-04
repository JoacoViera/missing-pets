# missing-pets

This web page was made in order that any person whose pet went missing can publish a public post, so if someone finds this pet and visits this website, he will be able to contact the original owner.

![alt text](https://sevenoakspet.com/wp-content/uploads/2016/06/pets-300x300.jpg)

## **Functionalities:**

### Login

### Sign up

### Main page

    Photos of the missing pets.

    You might visualize this page even if you are not registered.

    You will be able to see every post of pets missing around your area. In order to do this, the website will ask for permission to your location. If you deny it, then you'll have to at least enter your city's name or department.

### Create a form for a new missing pet

### Create a form for a found pet:

    First of all, you'll have to go through a series of filters to check if the pet you found has already been published as 'lost'.
    If you find it, then you'll go to that post and create a new form that will be sent as an answer to the user that created the post, also you will have to send a photo of the pet. The person who created the post for that missing pet will be notified.

    If the pet you found is not in the database, then you will be able to post it as a new 'found' pet.

### Notification system:

    Mail
    System notifications

## **Extras:**

    Add an extra map zone (taken from Google Maps) to the "Found pet" form, so the owner has that as an extra reference to the zone where his pet might be.

## **This web page will not:**

    Allow transactions within the site (these might be arranged between the owner and the person who found the pet).
    Accept publications of pets for adoption (ie. puppies, kittens, etc.)

<!-- | method | path | auth | description |
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |---
| GET | /pets | jwt | Get a list of all pets posts |
| POST | /pets | jwt | Create a new post for a missing pet |
| GET | /pets/{id} | none | Get the pet post with ID **petId** |
| DELETE | /pets/{id} | jwt | Mark the post with ID **petId** as not active |
| PUT | /pets/{id} | jwt | Update the post with ID **petId** - (half-way implemented) |
| POST | /sessions | none | Given a valid pair of email and password, this creates an authorization token. |
| POST | /users | none | Create a new user |
| GET | /users | none | Get a list of all users |
| PUT | /users/{id} | jwt | Update the user with ID **userId** |
| GET | /users/{id} | none | Get the user with ID **userId** |
| DELETE | /users/{id} | jwt | Delete the user with ID **userId** (marks this user as not active) | -->

## **Routes**

GET /pets jwt Get a list of all pets posts

POST /pets jwt Create a new post for a missing pet

GET /pets/{id} none Get the pet post with ID **petId**

DELETE /pets/{id} jwt Mark the post with ID **petId** as not active

PUT /pets/{id} jwt Update the post with ID **petId** - (half-way implemented)

POST /sessions none Given a valid pair of email and password, this creates an authorization token.

POST /users none Create a new user

GET /users none Get a list of all users

PUT /users/{id} jwt Update the user with ID **userId**

GET /users/{id} none Get the user with ID **userId**

DELETE /users/{id} jwt Delete the user with ID **userId** (marks this user as not active)
