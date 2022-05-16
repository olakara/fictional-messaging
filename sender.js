var amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const faker = require('@faker-js/faker');


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
                id: uuidv4(),
                name: faker.name.findName(),
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


