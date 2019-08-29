#!/usr/bin/env python

# flask and redis libraries
from flask import Flask, json, request, jsonify

# import some of our custom libraries
from blog.log import Log

# globals
log = Log()

# instantiate the Flask service
flask_service = Flask(__name__)

# load in our flask blueprints
from blog.blueprints.posts import posts_bp
flask_service.register_blueprint(posts_bp)

from blog.blueprints.images import images_bp
flask_service.register_blueprint(images_bp)


# Other constants
flask_service.config['API_URL_PREFIX'] = 'http://localhost/api/v1'
flask_service.config['USER_UPLOAD_FOLDER'] = '/app/blog/user_content'

#JSONIFY pretty print
flask_service.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
