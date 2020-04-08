FROM python:3.7.6-slim-buster

ARG pythonrepo=https://pypi.tuna.tsinghua.edu.cn/simple/

ARG unittests=1

WORKDIR /app/backend 

# Installing dependencies early to leverage caching
COPY ./requirements.txt ./

RUN pip install -r requirements.txt -i ${pythonrepo}

# Copying project files
COPY . .

RUN chmod +x ./scripts/wait-for-it.sh

ENV PYTHONPATH "${PYTHONPATH}:/app"

# Run unit tests only
RUN if [ ${unittests} -eq 1 ]; then \
    pytest --ignore=tests/ ; \
    fi

ENV FLASK_APP=app.py

# Using flask built in server
# Not a good production practice at the moment
CMD [ "python", "app.py" ]
