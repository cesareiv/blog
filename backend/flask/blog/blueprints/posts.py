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


#############
#/posts #
#############
"""
GET: get all posts
"""
@posts_bp.route("/posts", methods=["GET"])
def get_posts():
    log.debug("Servicing get crop API")

    expand = request.args.get('expand')
    
    if not crop_id:
        message = json.dumps({"Message": "Bad Request"})
        abort(Response(message,400))
        pass

    crop = MesoCrop.get_by_id(crop_id, expand)

    if crop is None:
        message = json.dumps({"Message": "Crop not Found"})
        abort(Response(message, 404))
        pass
    else:
        return jsonify(crop), 200
