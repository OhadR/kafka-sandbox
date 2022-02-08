const { Kafka } = require('kafkajs')
const debug = require('debug')('producer');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}


function getRandomNumber(): number {
    return Math.round(Math.random() * 1000)
}

function createMessage(num: number) {
    return {
        key: `key-${num}`,
        value: `value-${num}-${new Date().toISOString()}`,
    };
}

export class KafkaProducer {

    private static _instance: KafkaProducer;
    protected producer: any;

    protected constructor() {

        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092', 'kafka2:9092']
        });

        this.producer = kafka.producer()
    }

    public static get instance() {
        if (!KafkaProducer._instance)
            KafkaProducer._instance = new KafkaProducer();

        return KafkaProducer._instance;
    }

    public async connect() {

        await this.producer.connect()
        debug('connected');
    }

    public async disconnect() {

        await this.producer.disconnect()
        debug('disconnected');
    }

    public async send(topicName: string, message: any) {
        await this.producer.send({
            topic: topicName,
            messages: [message]
        })
    }
}

async function sendMessage() {
    await KafkaProducer.instance.connect();
    await KafkaProducer.instance.send(process.env.KAFKA_TOPIC, createMessage(getRandomNumber()));
    await KafkaProducer.instance.disconnect();
}

sendMessage();