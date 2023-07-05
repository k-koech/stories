from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# app = Flask(__name__)
app = Flask(__name__, static_url_path='',
                  static_folder='client/build',
                  template_folder='frontend/dist')
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://kelvin:2j5VHLx66g1erbR0pPwnTDOGlPLKfy80@dpg-cic3bkp5rnuk9qatjeag-a.oregon-postgres.render.com/wattpad'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://kelvin:2j5VHLx66g1erbR0pPwnTDOGlPLKfy80@dpg-cic3bkp5rnuk9qatjeag-a/wattpad'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)
