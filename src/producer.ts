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

function debug(msg: string) { console.log(msg); }

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

    public async send() {
        await this.producer.send({
            topic: 'test-topic',
            messages: [createMessage(getRandomNumber())]
        })
    }
}

async function sendMessage() {
    await KafkaProducer.instance.connect();
    await KafkaProducer.instance.send();
    await KafkaProducer.instance.disconnect();
}

sendMessage();