from blog.models import Post, Tag

POST_DB_PREFIX = "post:id:"

def delete_post(post_id):
    """delete a post - returns 1 if post was found and deleted"""
    res = db.delete("%s%s" % (POST_DB_PREFIX, post_id))
    return res

def get_post(post_id):
    """get a post"""
    post_hash = db.hgetall("post:id:%s" % post_id)
    tags = []
    tag_set = db.smembers("post:id:%s:tags" % post_id)
    for tag_title in tag_set:
        tags.append(Tag.from_dict({'title':tag_title}))
        pass
    post = post_hash.update({'tags':tags})
    return Post.from_dict(post)

def save_post(request_body):
    """save a post"""

    new_post = Post.from_dict(request_body)
    
    # create unique post ID
    new_post.id = db.incrby("post_id_counter", 1)

    db.hmset("post:id:%s" % new_post.post_id, {
        'title'   : new_post.title,
        'body'    : new_post.body,
        'status'  : new_post.status,
        'id'      : new_post.id
    })

    for tag in new_post.tags:
        db.sadd("post:id:%s:tags" % new_post.id, tag.title)
        db.sadd("tags:%s" % tag.title, new_post.id)
        db.sadd("post:status:%s" % new_post.status, new_post.id)
        pass
    
    return new_post


def get_posts_by_status(status):
    posts = []
    post_ids = db.smembers("post:status:%s" % status)
    for post_id in post_ids:
        post = Post.get_post(post_id)
        posts.append(post)
        pass
    return posts


def get_posts_by_tags(tags):
    posts = []
    for tag in tags:
        post_ids = db.smembers("tags:%s" % tag.title)
        for post_id in post_ids:
            post = Post.get_post(post_id)
            posts.append(post)
            pass
        pass
        
    return posts

def update_post(data):
    if data['post_id'] is None:
        Post.save_post(data)
        pass
    return
