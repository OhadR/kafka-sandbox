import { EachMessagePayload, Kafka, KafkaMessage } from 'kafkajs';

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
        eachMessage: handleMessage,
    });
}

async function handleMessage(eachMessagePayload: EachMessagePayload) {
    console.log({
        value: eachMessagePayload.message.value.toString(),
    })
}

consumer();