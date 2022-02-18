import { Admin, EachMessagePayload, Kafka } from 'kafkajs';
const debug = require('debug')('admin');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}


export class KafkaAdmin {

    private static _instance: KafkaAdmin;
    protected admin: Admin;

    protected constructor() {

        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092', 'kafka2:9092']
        });

        this.admin = kafka.admin();
    }

    public static get instance() {
        if (!KafkaAdmin._instance)
            KafkaAdmin._instance = new KafkaAdmin();

        return KafkaAdmin._instance;
    }

    public async connect() {

        await this.admin.connect()
        debug('connected');
    }

    public async disconnect() {

        await this.admin.disconnect()
        debug('disconnected');
    }

    async tests() {
        const topics = await this.admin.listTopics();
        debug(topics);

        topics.forEach(async topic => {
            const offset = await this.admin.fetchTopicOffsets(topic);
            debug(offset);
        });

    }
}


async function admin() {
    await KafkaAdmin.instance.connect();
    await KafkaAdmin.instance.tests();
}

admin();