FROM golang:1.20

WORKDIR /webscrp

COPY ./server/*  ./server/
COPY ./client/html/* ./client/html/
COPY ./client/css/* ./client/css/
COPY ./client/js/* ./client/js/
COPY ./go.work ./

RUN CGO_ENABLED=0 GOOS=linux go build -o ./webserver ./server

EXPOSE 80
CMD ["./webserver"]