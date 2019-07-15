# This is the build stage 
FROM alpine:3.9 as build_stage

# install git
RUN apk update && apk add git

# clone the wait-for-it repo. this will be copied into the production stage
WORKDIR /git
RUN git clone https://github.com/vishnubob/wait-for-it.git
WORKDIR /git/wait-for-it
RUN git checkout 54d1f0bfeb6557adf8a3204455389d0901652242

# This container image is based on a slimmed down debian Linux operating system with python3.7 preinstalled
ARG ARCH=""
FROM ${ARCH}python:3.7.2-alpine3.9 as production_stage

# copy the wait-for-it script into the /usr/local/bin directory
COPY --from=build_stage /git/wait-for-it/wait-for-it.sh /usr/local/bin

# wait-for-it requires bash
RUN apk add bash

# set the current working directory of the app to "/app"
WORKDIR /app

# make the "entrypoint script" (i.e. default command the container runs) our flask app
ENTRYPOINT ["gunicorn", "--bind", "0.0.0.0:5000", "blog.service:flask_service"]

# expose port 5000 as the flask apps port
EXPOSE 5000

# make it so python scripts know where to find our python libraries
ENV PYTHONPATH="/app:$PYTHONPATH"

# enable python's better exceptions library by default
ENV BETTER_EXCEPTIONS=1

# install all of our python dependencies (i.e. 'requirements')
COPY requirements.txt /tmp/pip/requirements.txt
RUN apk add --virtual build_dependencies build-base libffi-dev && \
    pip install --upgrade pip -r /tmp/pip/requirements.txt && \ 
    apk del build_dependencies

# copy all the source code from the 'src' folder into "/app"
COPY . /app/



