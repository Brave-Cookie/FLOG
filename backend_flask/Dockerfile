FROM python:3.9

RUN apt-get update -y && apt-get install -y --no-install-recommends build-essential gcc libsndfile1 

WORKDIR /myfolder

COPY . /myfolder/

RUN pip install -r requirements.txt

CMD ["python", "app.py"]

# docker build -t flask_img .
# docker run -d --name flask_con -p 5000:5000 -v ${PWD}:/myfolder/ flask_img