FROM python:3.9

ENV PYTHONUNBUFFERED 1

ENV DJANGO_SECRET_KEY "Replace-with-your-secret-key"
ENV DJANGO_DEBUG "False"

COPY ./src /app
WORKDIR /app

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

ENTRYPOINT ["gunicorn", "dashboard.wsgi:application", "-k", "gevent", "-b", "0.0.0.0:80"]