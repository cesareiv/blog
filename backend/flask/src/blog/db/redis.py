"""
Redis Database Abstraction Class
"""

from blog.util import Singleton

class RedisDB (metaclass=Singleton):
    def __init__(self, host='redis', port=6379):
        self.host = host
        self.port = port
        self.conn = self._connect()      
        return

    @property
    def host(self):
        return self._host
    
    @host.setter
    def host(self,value):
        self._host = value

    @property
    def port(self):
        return self._port
    
    @port.setter
    def port(self,value):
        self._port = value        
    
    @property
    def conn(self):
        return self._conn

    @conn.setter
    def conn(self,value):
        self._conn = value

    def _connect(self):
        # connect to redis
        from redis import Redis
        self.conn = Redis(host=self.host, port=self.port, decode_responses=True)
        return self.conn
