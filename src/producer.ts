const { Kafka } = require('kafkajs')


function getRandomNumber(): number {
    return Math.round(Math.random() * 1000)
}

function createMessage(num: number) {
    return {
        key: `key-${num}`,
        value: `value-${num}-${new Date().toISOString()}`,
    };
}

async function producer() {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092', 'kafka2:9092']
    });

    const producer = kafka.producer()

    await producer.connect()

    console.log('connected');

    await producer.send({
        topic: 'test-topic',
        messages: [createMessage(getRandomNumber())]
    })

    await producer.disconnect();
}

producer();