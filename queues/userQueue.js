let RedisSMQ = require("rsmq");
const userService = require("../services/user.service");
const config = require("../configs/config");
const REDIS_HOST =config.REDIS_HOST;
const REDIS_PORT =config.REDIS_PORT;
let NAMESPACE = "rsmq";
let rsmq = new RedisSMQ({
    host: REDIS_HOST,
    port: REDIS_PORT,
    NAMESPACE
});


async function createWorkerQueue(qname) {
    try {
        rsmq.createQueue({ qname }, (err) => {
            if (err) {
                if (err.name !== "queueExists") {
                    console.error(err);
                    return;
                } else {
                    console.log("The queue exists");
                }
            }
            let TIME_WAIT=1;
            setInterval(() => {
                rsmq.receiveMessage( { qname }, async (err, resp) => {
                    if (err) {
                        TIME_WAIT=10000;
                        return;
                    }
                    if (resp.id) {
                        message = JSON.parse(resp.message);
                        let result = await userService.handleMessage(message,);
                        console.log("deletequeue ", resp.id);
                        if(result==true){
                        rsmq.deleteMessage({ qname, id: resp.id }, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                    } else {
                    }
                });
            }, TIME_WAIT);

            console.log("queue created");
        });
    } catch (error) {
        console.log(error)
    }
}

async function addQueue(qname, data) {
    console.log('addqueue',qname)
    rsmq.sendMessage({
        qname,
        message: JSON.stringify(data),
        delay: 0
    }, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });

}

module.exports = {
    createWorkerQueue,
    addQueue,
}