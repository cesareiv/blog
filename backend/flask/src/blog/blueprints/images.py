"""
Flask Blue print for Images APIs
"""

import os
import time
import re
import hashlib
from flask import Blueprint, json, jsonify, request, abort, send_from_directory
from flask import current_app as app
from flask.wrappers import Response

from blog.log import Log
from blog.db.redis import RedisDB

rdb = RedisDB().conn
log = Log()

images_bp = Blueprint('images_bp',
                     __name__,
                       template_folder='templates')

@images_bp.route('/images/<path:path>')
def get_image(path):
    """
    Serve static images
    """
    return send_from_directory(app.config['USER_UPLOAD_FOLDER'], path)

@images_bp.route('/api/v1/images', methods=["POST"])
def upload():
    log.debug("servicing upload images")
    # check if the post request has the file part
    if 'file' not in request.files:
        log.debug(str(request))
        abort(400)
        pass

    file = request.files['file']
    log.debug(str(file))
    log.debug(str(file.mimetype))
             
    m = re.match(r"image/(.+)",file.mimetype)
    ext = m.group(1)

    f = "image"

    # ensure unique file name
    h = hashlib.sha224(f.encode(encoding='UTF-8')).hexdigest()

    filename = "%s-%s.%s" % (str(h), str(int(time.time())), str(ext))

    file.save(os.path.join(app.config['USER_UPLOAD_FOLDER'], filename))

    url = "images/%s" % filename

    res = { "img_url" : url }

    return Response(
        response = json.dumps(res),
        status   = 201,
        mimetype = 'application/json'
    )
