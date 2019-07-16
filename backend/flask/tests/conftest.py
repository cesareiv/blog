import pytest

from multiprocessing import Process
import asyncio
import time

def _spawn():
    from blog.service import flask_service
    flask_service.run(port=5000, host="0.0.0.0")
    return

@pytest.fixture(scope="session")
def flask_service(request):
    # setup the service
    p = Process(target=_spawn)
    p.start()

    # wait for flask to be listening for requests
    loop = asyncio.get_event_loop()
    loop.run_until_complete(
        _wait_for_port("127.0.0.1", 5000)
    )
    time.sleep(4)
    
    # run the tests
    yield

    # cleanup the service 
    p.terminate()
    p.join()
    return

async def _wait_for_port(host, port, retries=30, poll_time=2):
    loop = asyncio.get_event_loop()
    while (retries > 0):
        retries -= 1
        try:
            fut = asyncio.open_connection(host, port, loop=loop)
            reader, writer = await asyncio.wait_for(fut, timeout=poll_time) 
            break
        except asyncio.TimeoutError:
            pass
        except ConnectionRefusedError:
            time.sleep(poll_time)
            pass
    return
