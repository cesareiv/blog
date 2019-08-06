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

from blog.db.redis import RedisDB

from blog.log import Log
from blog.controllers import post_controller as pc

from blog.util import is_empty

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
@posts_bp.route("/posts", methods=['POST'])
def create_post():
    log.debug("Servicing post posts API")
    request_body = request.get_json(force=True)
    pc.save_post(request_body)
    return jsonify({"message":"post saved"}), 201
    
@posts_bp.route("/posts/<int:post_id>", methods=['GET'])
def get_post(post_id):
    log.debug("Servicing get posts API")
    post = pc.get_post(post_id)
    if post is None:
        abort(404)
        pass
    return jsonify(post.as_dict()), 200

@posts_bp.route("/posts/<int:post_id>", methods=['PUT'])
def update_post(post_id):
    log.debug("Servicing put posts API")
    request_body = request.get_json(force=True)
    request_body.update({'id':post_id})
    pc.save_post(request_body)
    return jsonify({"message":"post updated"}), 200


@posts_bp.route("/posts", methods=['GET'])
def get_post_collection():
    log.debug("Servicing get post collection API")
    args = request.args
    posts = pc.get_all()
    res = []
    for post in posts:
        res.append(post.as_dict())
        pass
    
    return jsonify(res), 200
    
    return
