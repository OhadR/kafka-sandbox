const { Kafka } = require('kafkajs')


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
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })

    await producer.disconnect();
}

producer();