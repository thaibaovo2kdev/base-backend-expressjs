const RedisSMQ = require('rsmq');
const Promise = require('bluebird');

class RedisSMQPromise {

    constructor(options) {
        this.rsmq = new RedisSMQ(options);
    };

    get listQueues() {
        return Promise.promisify(this.rsmq.listQueues);
    };

    get changeMessageVisibility() {
        return Promise.promisify(this.rsmq.changeMessageVisibility);
    };

    get createQueue() {
        return Promise.promisify(this.rsmq.createQueue);
    };

    get setQueueAttributes() {
        return Promise.promisify(this.rsmq.setQueueAttributes);
    };
    
    get getQueueAttributes() {
        return Promise.promisify(this.rsmq.getQueueAttributes);
    };

    get deleteQueue() {
        return Promise.promisify(this.rsmq.deleteQueue);
    };

    get sendMessage() {
        return Promise.promisify(this.rsmq.sendMessage);
    };

    get receiveMessage() {
        return Promise.promisify(this.rsmq.receiveMessage);
    };

    get deleteMessage() {
        return Promise.promisify(this.rsmq.deleteMessage);
    };
    
    get popMessage() {
        return Promise.promisify(this.rsmq.popMessage);
    };

    get quit() {
        return Promise.promisify(this.rsmq.quit);
    }; 
}

module.exports = RedisSMQPromise;