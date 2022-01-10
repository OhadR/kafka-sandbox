import { Kafka } from 'kafkajs';

async function consumer() {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092', 'kafka2:9092']
    });

    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    console.log('connected');

    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    });
}

consumer();