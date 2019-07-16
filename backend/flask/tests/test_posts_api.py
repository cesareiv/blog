import pytest
from blog.log import Log
from blog.db.redis import RedisDB
from blog.models import Post, Tag
from blog.controllers import post_controller as pc

req1 = {
    'title' : 'new post',
    'body'   : 'all the kings horses, and all the kings men',
    'status' : 'published',
    'tags'   : [ {'title':'rhymes'}, {'title':'nursery'} ]
}    

class Test_API:
    log = Log()

    def test_post_obj_creation(self, flask_service):
        req = {
            'id'     : 1,
            'title'  : 'new post',
            'body'   : 'all the kings horses, and all the kings men',
            'status' : 'published',
            'tags'   : [ {'title':'rhymes'}, {'title':'nursery'} ]
        }

        post = Post.from_dict(req)
        
        assert post.title == "new post"
        assert post.body == "all the kings horses, and all the kings men"
        assert post.id == 1
        assert post.status == 'published'
        assert post.tags[0].title == 'rhymes'
        assert post.tags[1].title == 'nursery'

        return

    # test saving a post
    def test_save_post(self, flask_service):
        d = pc.save_post(req1)
        e = pc.get_post(d.id)

        assert d.title == e.title
        assert d.body == e.body
        assert d.id == e.id
        assert d.status == e.status

        return

    # test deleting a post
    def test_delete_post(self, flask_service):
        d = pc.save_post(req1)
        assert pc.delete_post(d.id) == 1
        assert pc.get_post(d.id) is None
        return

    # test updating a post
    def test_update_post(self, flask_service):
        d = pc.save_post(req1)
        pc.save_post({'id':d.id,'body':'updated','title':'new title', 'status':'draft'})
        e = pc.get_post(d.id)
        assert d.id == e.id
        assert e.body == 'updated'
        assert e.title == 'new title'
        return

    # test getting posts by status
    def test_get_by_status(self, flask_service):
        d = pc.save_post(req1)
        e = pc.get_posts_by_status("published")
        f = pc.get_posts_by_status("draft")
        assert e[0].title == 'new post'
        assert e[0].status == 'published'
        assert f[0].title == 'new title'
        assert f[0].status == 'draft'
        return

    # test getting posts by tag
    def test_get_by_tags(self, flask_service):
        d = pc.save_post(req1)
        e = pc.get_posts_by_tags(["nursery"])
        tags = []
        for tag in e[0].tags:
            tags.append(tag.title)
            pass
        
        assert "nursery" in tags
        return
