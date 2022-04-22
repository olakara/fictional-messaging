var amqp = require('amqplib');
async function main() {
    const queue = 'hello';
    try {
        let connection = await amqp.connect('amqp://localhost');
        let channel = await connection.createChannel();
        await channel.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            let message = JSON.parse(msg.content)
            console.log(" [x] Received %s", JSON.stringify(message));
        }, {
            noAck: true,

        });

    } catch (error) {
        console.error(error);
    }
}

main();