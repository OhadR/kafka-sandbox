import { EachMessagePayload, Kafka, KafkaMessage } from 'kafkajs';

function debug(msg: string) { console.log(msg); }

export class KafkaComsumer {

    private static _instance: KafkaComsumer;
    protected consumer: any;

    protected constructor() {

        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092', 'kafka2:9092']
        });

        this.consumer = kafka.consumer({ groupId: 'test-group' });
    }

    public static get instance() {
        if (!KafkaComsumer._instance)
            KafkaComsumer._instance = new KafkaComsumer();

        return KafkaComsumer._instance;
    }

    public async connect() {

        await this.consumer.connect()
        debug('connected');
    }

    public async disconnect() {

        await this.consumer.disconnect()
        debug('disconnected');
    }

    public async listen() {
        await this.consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

        await this.consumer.run({
            eachMessage: handleMessage,
        });
    }
}

async function handleMessage(eachMessagePayload: EachMessagePayload) {
    console.log({
        value: eachMessagePayload.message.value.toString(),
    })
}


async function consumer() {
    await KafkaComsumer.instance.connect();
    await KafkaComsumer.instance.listen();
}

consumer();