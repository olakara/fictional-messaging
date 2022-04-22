var amqp = require('amqplib');

async function main() {
    const queue = 'hello';
    try {
        let connection = await amqp.connect('amqp://localhost');
        let channel = await connection.createChannel();
        await channel.assertQueue(queue, {
            durable: false
        });
        let msg = {
            type: 'PERSON',
            event: 'ADD',
            payload: {
                id: 123,
                name: 'Abdel Raoof',
                time: new Date().toLocaleTimeString()
            }
        }
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        console.log('[x] Sent %s', msg);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error(error);
    }
}

main();


