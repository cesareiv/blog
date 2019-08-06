import datetime
import time
import redis
from redis import exceptions

from blog.models import Post, Tag
from blog.db.redis import RedisDB

db = RedisDB().conn
WatchError = exceptions.WatchError

def delete_post(post_id):
    """delete a post - returns 1 if post was found and deleted"""
    post = get_post(post_id)
    pipe = db.pipeline()
    pipe.delete("%s%s" % ("post:id:", post_id))
    pipe.delete("post:id:%s:tags" % post_id)
    pipe.srem("post:status:%s" % post.status, post.id)
    if post.tags is not None:
        for tag in post.tags: 
            db.srem("tags:%s" % tag.title, post.id)
            pass
        pass
    
    res = pipe.execute()
    return res[0] # value of initial hash delete

def get_post(post_id):
    """get a post"""
    post_hash = db.hgetall("post:id:%s" % post_id)

    if not _is_empty(post_hash):
        tags = []
        tag_set = db.smembers("post:id:%s:tags" % post_id)
        for tag_title in tag_set:
            tags.append({'title':tag_title})
            pass
        post_hash.update({'tags':tags})
    
        return Post.from_dict(post_hash)
    else:
        return None
    pass

def save_post(request_body):
    """save a post"""
    new_post = Post.from_dict(request_body)
    
    # we want saving a post to be an atmomic operation
    pipe = db.pipeline()

    timeout = time.time() + 10 
    while time.time() < timeout:
        try: 
            pipe.watch("post_id_counter")
            # create unique post ID if None provided
            if new_post.id is None:
                new_post.id = pipe.incrby("post_id_counter", 1)
                pass

            pipe.multi()
            pipe.hmset("post:id:%s" % new_post.id, {
                'title'   : str(new_post.title),
                'body'    : str(new_post.body),
                'status'  : str(new_post.status),
                'id'      : str(new_post.id)
            })

            pipe.sadd("post:status:%s" % new_post.status, new_post.id)
            
            if new_post.tags is not None:
                for tag in new_post.tags: 
                    pipe.sadd("post:id:%s:tags" % new_post.id, tag.title)
                    pipe.sadd("tags:%s" % tag.title, new_post.id)
                    pass
                pass
            pipe.execute()
            break
        except WatchError:
            continue
        pass
    return new_post

def get_posts_by_status(statuses):
    posts = []
    for status in statuses:
        post_ids = db.smembers("post:status:%s" % status)
        for post_id in post_ids:
            post = get_post(post_id)
            posts.append(post)
            pass
        pass
    return posts

def get_posts_by_tags(tags):
    posts = []
    for tag in tags:
        post_ids = db.smembers("tags:%s" % tag)
        for post_id in post_ids:
            post = get_post(post_id)
            posts.append(post)
            pass
        pass
        
    return posts

def get_all():
    posts = []
    post_ids = []
    allowed_vals = ["published", "draft", "private"]
    for status in allowed_vals:
        post_ids += list(db.smembers("post:status:%s" % status))
        pass
    for post_id in post_ids:
        post = get_post(post_id)
        posts.append(post)
        pass
    return posts


def _is_empty(e):
    if e:
        return False
    else:
        return True
