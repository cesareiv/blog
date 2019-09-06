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
    posts = []
    if request.args:
        allowed_args = ['tags', 'status']
        if 'tags' in request.args:
            tags = request.args.getlist('tags')
            posts = pc.get_by_tags(tags)
        elif 'status' in request.args:
            status = request.args.getlist('status')
            posts = pc.get_by_status(status)
        pass
    else:
        posts = pc.get_all()
    res = []
    for post in posts:
        res.append(post.as_dict())
        pass
    
    return jsonify(res), 200
    
@posts_bp.route("/posts/<int:post_id>", methods=['DELETE'])
def delete_post(post_id):
    res = pc.delete_post(post_id)
    if res == True:
        return jsonify({"message":"post deleted"}), 200
    else:
        abort(404)
        
