import { Consumer, EachMessagePayload, Kafka, KafkaMessage } from 'kafkajs';
const debug = require('debug')('consumer');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}


export class KafkaConsumer {

    private static _instance: KafkaConsumer;
    protected consumer: Consumer;

    protected constructor() {

        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092', 'kafka2:9092']
        });

        this.consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });
    }

    public static get instance() {
        if (!KafkaConsumer._instance)
            KafkaConsumer._instance = new KafkaConsumer();

        return KafkaConsumer._instance;
    }

    public async connect() {

        await this.consumer.connect()
        debug('connected');
    }

    public async disconnect() {

        await this.consumer.disconnect()
        debug('disconnected');
    }

    public async listen(topicName: string, messageHandler: (payload: EachMessagePayload) => Promise<void>) {
        await this.consumer.subscribe({ topic: topicName, fromBeginning: true })

        await this.consumer.run({
            eachMessage: messageHandler,
        });
    }


}

async function handleMessage(eachMessagePayload: EachMessagePayload) {
    console.log({
        value: eachMessagePayload.message.value.toString(),
    })
}


async function consumer() {
    await KafkaConsumer.instance.connect();
    // await KafkaConsumer.instance.listen('test-topic', handleMessage);
    await KafkaConsumer.instance.listen(process.env.KAFKA_TOPIC, handleMessage);
}

consumer();