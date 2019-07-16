from datetime import date, datetime

from blog import util

from typing import List, Dict
from blog.models.tag import Tag

class Post():

    def __init__(self, id: int=None, title: str="untitled",
                 body: str=None, tags: List[Tag]=None, status: str="draft"):

        self.data_types = {
            'id'     : int,
            'title'  : str,
            'body'   : str,
            'tags'   : List[Tag],
            'status' : str
        }

        self.attribute_map = {
            'id'     : 'id',
            'title'  : 'title',
            'body'   : 'body',
            'tags'   : 'tags',
            'status' : 'status'
        }

        
        self._id = id
        self._title = title
        self._body = body
        self._tags = tags
        self._status = status

        pass

    @classmethod
    def from_dict(cls, dikt) -> 'Post':
        """returns the dict as a model"""
        return util.deserialize_model(dikt, cls)
        
    @property
    def id(self) -> int:
        """get the id of the Post"""

        return self._id

    @id.setter
    def id(self, id: int):
        """Sets the id of this Post"""

        self._id = id

    @property
    def title(self) -> str:
        """gets the title of this Post"""

        return self._title

    @title.setter
    def title(self, title: str):
        """sets the title of this Post """

        if title is None:
            raise ValueError("Invalid value for `title`, must not be `None`")

        self._title = title

    @property
    def body(self) -> str:
        """gets the title of this Post"""

        return self._body

    @body.setter
    def body(self, body: str):
        """sets the title of this Post """

        if body is None:
            raise ValueError("Invalid value for `body`, must not be `None`")

        self._body = body


    @property
    def tags(self) -> List[Tag]:
        """Gets the tags of this Post"""

        return self._tags

    @tags.setter
    def tags(self, tags: List[Tag]):
        """Sets the tags of this Post"""

        self._tags = tags

    @property
    def status(self) -> str:
        """Gets the status of this Post"""
        return self._status

    @status.setter
    def status(self, status: str):
        """Sets the status of this Post"""

        allowed_vals = ["published", "draft", "private"]
        if status not in allowed_vals:
            raise ValueError(
                "Invalid value for `status` %s, must be one of %s"
                % (status, allowed_vals)
            )

        self._status = status
