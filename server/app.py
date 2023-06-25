#!/usr/bin/env python3
import os
import json
from flask import Flask, request, jsonify,request, session, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from config import app, db, api
from models import User,Book, BookReview,Saved
CORS(app)
# app.static_url_path = ''
# app.static_folder = 'frontend/dist'
# app.template_folder = 'frontend/dist'
# app = Flask(__name__, static_url_path='',
#                   static_folder='frontend/dist',
#                   template_folder='frontend/dist')

headers = {
    'Content-Type': 'application/json'
}



@app.route("/")
def index():
    return render_template('index.html')


class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        email = request_json.get('email')
        password = request_json.get('password')
        image_url = request_json.get('image_url')
        bio = request_json.get('bio')


        email_count = User.query.filter_by(email=email).count()
        username_count = User.query.filter_by(username=username).count()
        print(email_count)
        if email_count > 0:
            return {'error': 'Email exists'}
        elif username_count > 0:
            return {'error': 'Username exists'}
        else:
            user = User(username=username,email=email,
                image_url=image_url,
                bio=bio
            )
            # the setter will encrypt this
            user.password_hash = password

            # try:
            print('here!')
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            # user.to_dict(), 201
            return {'success': 'Registered successfully'}, 201


class CheckSession(Resource):
    
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            
            if user:
                user_data = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'bio': user.bio,
                    'image_url': user.image_url,
                }
                books = user.books
                book_list = []
                for book in books:
                    book_list.append({
                        'id': book.id,
                        'title': book.title,
                        'content': book.content,
                        'book_image': book.book_image
                    })
                
                user_data['books'] = book_list
                print("PPPPO ", user_data)
                return jsonify(user_data)
            # response = []
            # user_data = {
            #     'id': user.id,
            #     'name': user.username,
            #     'bio': user.bio,
            #     'image_url': user.image_url,
            #     'books': [{
            #         'id': user.books.id,
            #         'title': user.books.title,
            #         'content': user.books.content,
            #         'book_image': user.books.book_image,
            #     }]
            # }
              
            # return user.to_dict()

        return {'error': '401 Unauthorized'}, 401

class Login(Resource):
    
    def post(self):
        request_json = request.get_json()

        email_username = request_json.get('email_username')
        password = request_json.get('password')

        user = User.query.filter((User.username==email_username) or (User.email==email_username)).first()
        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200
                # return {'user': '401 Unauthorized'}, 200

        return {'error': 'Wrong Email or Password'}, 401

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {"success":"Logged out successfully"}, 200
        
        return {'error': '401 Unauthorized'}, 401

api.add_resource(Signup, '/api/signup', endpoint='signup')
api.add_resource(CheckSession, '/api/current_user', endpoint='check_session')
api.add_resource(Login, '/api/login', endpoint='login')
api.add_resource(Logout, '/api/logout', endpoint='logout')


@app.route('/api/users/updatepassword', methods=['PATCH'])
def updatepassword():
    data = request.get_json()

    username =  data.get('username')
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(username=username, email=email).first()
    if not user:
        return jsonify({'error': 'Wrong username/email'})
    
    user.password_hash = password
    db.session.commit()
    return jsonify({'success': 'Password update success'})


@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    
    response = []
    for user in users:
        user_data = {
            'id': user.id,
            'name': user.username,
            'bio': user.bio,
            'image_url': user.image_url,
            'books': []
        }
        for book in user.books:
            book_data = {
                'id': book.id,
                'title': book.title,
                'content': book.content
            }
            user_data['books'].append(book_data)
        
        response.append(user_data)

    return jsonify(response)


# Custom endpoints
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    book_data = []
    for book in books:
        book_data.append({
            'id': book.id,
            'title': book.title,
            'content': book.content,
            'book_image': book.book_image,

            'user': {
               "id":book.user.id,
                'username': book.user.username,
                'email':book.user.email,
                'bio': book.user.bio,
                'image_url': book.user.image_url,

            },
        })
    return jsonify(book_data)


# BOOOKS
# GET 1 BOOK
@app.route('/api/books/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get(id)

    if book is None:
        return jsonify({'error': 'Book not found'}), 404
    
    else:
        book_data = []
     
        book_data.append({
            'id': book.id,
            'title': book.title,
            'content': book.content,
            'book_image': book.book_image,

            'user': {
            "id":book.user.id,
                'username': book.user.username,
                'email':book.user.email,
                'bio': book.user.bio,
                'image_url': book.user.image_url,
            },
        })
        return jsonify(book_data[0])


@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    title =  data.get('title')
    content = data.get('content')
    image_url = data.get('image_url')


    new_book = Book(title=title, content=content,book_image=image_url, user_id=session['user_id'])
    db.session.add(new_book)
    db.session.commit()

    return jsonify({'success': 'Book created successfully'})

@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.get_json()

    title =  data.get('title')
    content = data.get('content')
    image_url = data.get('image_url')

    book = Book.query.get(book_id)
    if not book:
        return jsonify({'error': 'Story not found'})

    book.title =title
    book.content=content
    book.book_image=image_url
    db.session.commit()

    return jsonify({'success': 'Update success'})

@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({'error': 'Book not found'})

    db.session.delete(book)
    db.session.commit()

    return jsonify({'success': 'Book deleted successfully'})

# SAVINGS
@app.route('/api/savedbooks', methods=['GET'])
def get_savedbooks():
    saved_books = Saved.query.filter_by(user_id=session['user_id']).all()
    book_data = []
    for savedbook in saved_books:
        book_data.append({
            'id': savedbook.id,
            'books':{
                'id': savedbook.books.id,
                'title': savedbook.books.title,
                'content': savedbook.books.content,
                'book_image': savedbook.books.book_image,
            },
            'user': {
               "id":savedbook.user.id,
                'username': savedbook.user.username,
                'email':savedbook.user.email,
                'bio': savedbook.user.bio,
                'image_url': savedbook.user.image_url,

            },
        })
    return jsonify(book_data)


@app.route('/api/savebook', methods=['POST'])
def save_book():
    data = request.get_json()
    book_id = data.get('book_id')

    count_books = Saved.query.filter_by(user_id=session['user_id'], book_id=book_id).count()
    if count_books < 1:
        save = Saved(book_id=book_id, user_id=session['user_id'])
        db.session.add(save)
        db.session.commit()

        return jsonify({'success': 'Added to favourites'})
    else:
        book = Saved.query.filter_by(user_id=session['user_id'],book_id=book_id).first()
     
        print("ppp ",book)
        db.session.delete(book)
        db.session.commit()
        return jsonify({'success': 'Removed from saved'})

# REVIEWS
@app.route('/api/reviews/<int:book_id>', methods=['GET'])
def get_reviews(book_id):
    reviews = BookReview.query.filter_by(book_id=book_id).all()
    book_reviews = []
    for review in reviews:
        book_reviews.append({
            'id': review.id,
            'comment': review.comment,
            'rating': review.rating,
            'books':{
                'id': review.books.id,
                'title': review.books.title,
                'content': review.books.content,
                'book_image': review.books.book_image,
            },
            'user': {
               "id":review.user.id,
                'username': review.user.username,
                'email':review.user.email,
                'bio': review.user.bio,
                'image_url': review.user.image_url,

            },
        })
    return jsonify(book_reviews)

@app.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    book_id = data.get('book_id')
    comment = data.get('comment')
    rating = data.get('rating')

    save = BookReview(book_id=book_id,comment=comment, rating=rating, user_id=session['user_id'])
    db.session.add(save)
    db.session.commit()

    return jsonify({'success': 'Saved'})


if __name__ == '__main__':
    app.run(port=5555, debug=True)
# To run
# gunicorn app:app
