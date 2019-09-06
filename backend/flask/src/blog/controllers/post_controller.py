import datetime
import time
import redis
from typing import List
from redis import exceptions

from blog.log import Log
from blog.models import Post, Tag
from blog.db.redis import RedisDB

log = Log()
db = RedisDB().conn
WatchError = exceptions.WatchError

def delete_post(post_id:int) -> bool:
    """Delete a post by ID.
    
    Args:
        post_id (int) : The id of the post.
    
    Returns:
        bool : ``True`` if deleted, ``False`` if not.    

    """
    
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
    if res[0]:
        return True
    else:
        return False

    
def get_post(post_id:int) -> Post:
    """Get a post by ID.

    Args:
        post_id (int) : The id of the post.

    Returns:
        Post : a Post object

    """

    # retrieve post data from database
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
    

def save_post(post_dict:dict) -> Post:
    """Save or update post.

    Args:
        post_dict (dict) : A dictionary representing the post to be saved

    Returns:
        Post : the newly saved post as a Post object
    
    """
    new_post = Post.from_dict(post_dict)
    updated_at = int(time.time())
    created_at = db.hget("post:id:%s" % new_post.id, 'created_at')
    
    # we want saving a post to be an atmomic operation
    pipe = db.pipeline()
    pipe.watch("post_id_conuter")
    # create unique post ID if None provided, if provided, delete old post and overwrite
    if new_post.id is None:
        new_post.id = pipe.incrby("post_id_counter", 1)
        created_at = updated_at
        pass
    else:
        delete_post(new_post.id)
        pass

    pipe.multi()
    pipe.hmset("post:id:%s" % new_post.id, {
        'title'      : str(new_post.title),
        'body'       : str(new_post.body),
        'status'     : str(new_post.status),
        'img_url'    : str(new_post.img_url),
        'id'         : str(new_post.id),
        'created_at' : str(created_at),
        'updated_at' : str(updated_at)
    })
    
    pipe.sadd("post:status:%s" % new_post.status, new_post.id) 
    
    if new_post.tags is not None:
        for tag in new_post.tags: 
            pipe.sadd("post:id:%s:tags" % new_post.id, tag.title)
            pipe.sadd("tags:%s" % tag.title, new_post.id)
            pass
        pass
    pipe.execute()
        
    return get_post(new_post.id)




def get_by_status(statuses:list) -> List[Post]:
    """
    Get all posts by status.

    Arguments:
        statuses (list) : a list of strings representing possible post statuses

    Returns:
        list[Posts] : a list of the posts that match the status(es) provided 

    """
    
    posts = []
    for status in statuses:
        post_ids = db.smembers("post:status:%s" % status)
        for post_id in post_ids:
            post = get_post(post_id)
            posts.append(post)
            pass
        pass
    return posts


def get_by_tags(tags):
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
