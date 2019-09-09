"""
Logger object
"""

import inspect
import logging

class Log():
    def __init__(self):
        # obtain the logger for the calling module
        frm = inspect.stack()[1]
        mod = inspect.getmodule(frm[0])
        try:
            self._log = logging.getLogger(mod.__name__)
        except:
            self._log = logging.getLogger("main")

        self._log.setLevel(logging.DEBUG)
        
        # install a basic logging config for this logger
        fmt = '%(asctime)-15s [%(levelname)s] [%(name)s.%(funcName)s():%(lineno)d] %(message)s'
        logging.basicConfig(format=fmt)

        # install all the logging mechanisms
        self.debug = self._log.debug        
        self.info = self._log.info
        self.warning = self._log.warning
        self.error = self._log.error
        self.critical = self._log.critical                

        return
