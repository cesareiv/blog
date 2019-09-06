# Blog by 2003
A simple CRUD blog webapp with containerized microservice architecture using Node.js, Python Flask and Docker. React JS frontend, Flask backend and Redis for persistent storage. Uses React Router and CSS Modules (thanks to create-react-app). Minimal CSS. Very lighweight! Circle CI integration for testing.

## Getting Started
You will need Docker Desktop installed to run this app. Defaults to a development enviornment. Visit https://www.docker.com/ to get started there.

## To Build
```bash
./compose.sh build
```

## To Run (foreground - requires CRTL+C)
```bash
./compose.sh up
```

## To access the front end web content
* http://localhost

## To Run tests (pytest)
```bash
./compose.sh test
```

## To use
Add a post by clicking "new post" in navbar and bringing up modal.
<br>Edit/Delete a post from the dash by clicking the post status label and using the modal window.
<br>View published posts by clicking "Preview".
<br>View posts by tag by clicking a tag chiclet.
<br>Datastore is persistent.

## Authors

* **Rich Hunter** - [cesareiv](https://github.com/cesareiv)

## License

This project is licensed under the GNU 3.0 License - see the [LICENSE.md](LICENSE.md) file for details

