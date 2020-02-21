FROM python:3.7.6-slim-buster

WORKDIR /app/backend 

# Installing dependencies early to leverage caching
COPY ./requirements.txt ./

RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/

# Copying project files
COPY . .

RUN chmod +x ./scripts/wait-for-it.sh

ENV PYTHONPATH "${PYTHONPATH}:/app"

# Run unit tests only
RUN pytest ./resources

ENV FLASK_APP=app.py

# Using flask built in server
# Not a good production practice at the moment
CMD [ "flask", "run" , "--host=0.0.0.0" ]
