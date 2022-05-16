var amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');


async function main() {
    
    try {               
        myInterval = setInterval(sendMessage,2500);
    } catch (error) {
        console.error(error);
    }
}

async function sendMessage() {

    let connection = await amqp.connect('amqp://localhost');
    let channel = await connection.createChannel();
    
    await channel.assertQueue('hello', {
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
    await channel.sendToQueue('hello', Buffer.from(JSON.stringify(msg)));
    console.log('[x] Sent %s', msg);  
    await channel.close();
    await connection.close();
}

main();


