# fictional-messaging
RabbitMQ basic messaging using Node.js


# Running the RabbitMQ server

docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 8080:15672 rabbitmq:3-management

You can then go to http://localhost:8080 for management console and access it with the default username and password of `guest` / `guest`
