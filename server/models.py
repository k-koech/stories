from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(255))

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)
    books = db.relationship('Book', backref='books', lazy=True)
    saved_books = db.relationship('Saved', backref='savedbooks', lazy=True)
    reviews = db.relationship('BookReview', backref='reviews', lazy=True)
   
    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'username': self.username,
    #         'email': self.email,
    #         'books': [book.to_dict() for book in self.books]  # Include associated books
    #     }
    # recipes = db.relationship('Recipe', backref='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'


class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    content = db.Column(db.Text(255))
    book_image= db.Column(db.String(255))
    user = db.relationship('User', backref=db.backref('users', lazy=True))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    saved = db.relationship('Saved', backref='savedbook', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'user': {
               "id":self.id,
                'username': self.user.username,
                'email':self.user.email,
                'bio': self.user.bio,
                'image_url': self.user.image_url,

            },
            'book_image': self.book_image
        }


class Saved(db.Model):
    __tablename__ = 'saved_books'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref='user') 
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    books = db.relationship('Book', backref='savbooks', lazy=True)


class BookReview(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref='reviewing_user') 
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    books = db.relationship('Book', backref='reiewed_user', lazy=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)





# class Recipe(db.Model, SerializerMixin):
#     __tablename__ = 'recipes'
#     __table_args__ = (
#         db.CheckConstraint('length(instructions) >= 50'),
#     )

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String, nullable=False)
#     instructions = db.Column(db.String, nullable=False)
#     minutes_to_complete = db.Column(db.Integer)

#     user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))

#     def __repr__(self):
#         return f'<Recipe {self.id}: {self.title}>'