from blog import util

class Tag():

    def __init__(self, id: int=None, title: str=None):
        self._id = id
        self._title = title

        self.data_types = {
            'id'     : int,
            'title'  : str
        }

        self.attribute_map = {
            'id'     : 'id',
            'title'  : 'title'
        }
        pass

    @classmethod
    def from_dict(cls, dikt) -> 'Tag':
        return util.deserialize_model(dikt, cls)

    def as_dict(self) -> dict:
        return {'title' : self.title}
    
    @property
    def id(self) -> int:
        """get the id of the Tag"""

        return self._id

    @id.setter
    def id(self, id: int):
        """Sets the id of this Tag"""

        self._id = id

    @property
    def title(self) -> str:
        """gets the title of this Tag"""

        return self._title

    @title.setter
    def title(self, title: str):
        """sets the title of this Tag """

        if title is None:
            raise ValueError("Invalid value for `title`, must not be `None`")

        self._title = title
