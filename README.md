# Putting it All Together: IAM Lab

## Learning Goals

- Authenticate a user with a username and password.
- Authorize logged in users for specific actions.

***

## Key Vocab

- **Identity and Access Management (IAM)**: a subfield of software engineering that
  focuses on users, their attributes, their login information, and the resources
  that they are allowed to access.
- **Authentication**: proving one's identity to an application in order to
  access protected information; logging in.
- **Authorization**: allowing or disallowing access to resources based on a
  user's attributes.
- **Session**: the time between a user logging in and logging out of a web
  application.
- **Cookie**: data from a web application that is stored by the browser. The
  application can retrieve this data during subsequent sessions.

***

## Introduction

This is the biggest lab yet for this phase, so make sure to set aside some time
for this one. It's set up with a few different checkpoints so that you can build
out the features incrementally. By the end of this lab, you'll have built out
full authentication and authorization flow using sessions and cookies in Flask,
so getting this lab under your belt will give you some good code to reference
when you're building your next project with _auth_. Let's get started!

***

## Setup

As with other labs in this section, there is some starter code in place for a
Flask API backend and a React frontend. To get set up, run:

```console
$ pipenv install && pipenv shell
$ npm install --prefix client
$ cd server
$ flask db upgrade
$ seed.py
```

You can work on this lab by running the tests with `pytest`. It will also be
helpful to see what's happening during the request/response cycle by running the
app in the browser. You can run the Flask server with:

```console
$ python app.py
```

And you can run React in another terminal from the project root directory with:

```console
$ npm start --prefix client
```

### Models

Create a `User` model with the following attributes:

- `username` that is a `String` type.
- `_password_hash` that is a `String` type.
- `image_url` that is a `String` type.
- `bio` that is a `String` type.

Your `User` model should also:

- incorporate `bcrypt` to create a secure password. Attempts to access the
  `password_hash` should be met with an `AttributeError`.
- validate the user's username to ensure that it is **present** and **unique**
  (no two users can have the same username).
- **have many** recipes.

Next, create a `Recipe` model with the following attributes:

- a recipe **belongs to** a user.
- `title` that is a `String` type.
- `instructions` that is a `String` type.
- `minutes_to_complete` that is an `Integer` type.

Add validations for the `Recipe` model:

- `title` must be present.
- `instructions` must be present and at least 50 characters long.

Run the migrations after creating your models.

Ensure that the tests for the models are passing before moving forward. To run
the tests for _only_ the model files, run:

```console
$ pytest testing/models_testing/
```

### Sign Up Feature

After creating the models, the next step is building out a sign up feature.

Handle sign up by implementing a `POST /signup` route. It should:

- Be handled in a `Signup` resource with a `post()` method.
- In the `post()` method, if the user is valid:
  - Save a new user to the database with their username, encrypted password,
    image URL, and bio.
  - Save the user's ID in the session object as `user_id`.
  - Return a JSON response with the user's ID, username, image URL, and bio; and
    an HTTP status code of 201 (Created).
- If the user is not valid:
  - Return a JSON response with the error message, and an HTTP status code of
    422 (Unprocessable Entity).

ase if it is valid. The recipe should **belong
    to** the logged in user, and should have title, instructions, and minutes to
    complete data provided from the request JSON.
  - Return a JSON response with the title, instructions, and minutes to complete
    data along with a nested user object; and an HTTP status code of 201
    (Created).
- If the user is **not** logged in when they make the request:
  - Return a JSON response with an error message, and a status of 401
    (Unauthorized).
- If the recipe is **not valid**:
  - Return a JSON response with the error messages, and an HTTP status code of
    422 (Unprocessable Entity).

After finishing the `RecipeIndex` resource, you're done! Make sure to check
your work. You should be able to run the full test suite now with `pytest`.

You should also be able to test this in the React application by creating a new
recipe with the recipe form, and viewing a list of recipes.

***

## Resources

- [API - Flask: `class flask.session`](https://flask.palletsprojects.com/en/2.2.x/api/#flask.session)
- [User's Guide - Flask RESTful](https://flask-restful.readthedocs.io/en/latest/)
- [Flask-Bcrypt][bcrypt]

[bcrypt]: https://flask-bcrypt.readthedocs.io/en/1.0.1/
flask  flask-sqlalchemy sqlalchemy-serializer flask-migrate flask-restful importlib-metadata importlib-resources pytest sqlalchemy flask-bcrypt faker