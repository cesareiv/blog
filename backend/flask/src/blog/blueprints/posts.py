#

"""
Flask Blue print for Posts 
"""

import os
import datetime
import time
from flask import Blueprint, json, request, abort, jsonify
from flask import current_app as app
from flask.wrappers import Response

#from manpr.log import Log
from blog.db.redis import RedisDB

from blog.log import Log
from blog.controllers import post_controller
import blog.models



log = Log()
rdb = RedisDB()
datetime = datetime.datetime
api_url = "http://localhost/api/v1"

posts_bp = Blueprint('posts_bp',
                     __name__,
                     template_folder='templates',
                     url_prefix='/api/v1')

@posts_bp.route("/hello", methods=['GET'])
def hello():
    log.debug("Servicing HELLO WORLD")
    return "HELLO WORLD"


#############
#/posts #
#############
"""
GET
"""
@posts_bp.route("/posts", methods=["GET"])
def get_posts():
    log.debug("Servicing get posts API")

    return
