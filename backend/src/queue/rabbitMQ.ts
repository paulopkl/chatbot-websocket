// import amqp from "amqplib";

// const queue = "product_inventory";

// const text = {
//     item_id: "macbook",
//     text: "This is a sample message to send receiver to check the ordered Item Availablility",
// };

// class RabbitMQ {
//     private connection: amqp.Connection | null = null;
//     private channel: amqp.Channel | null = null;
//     private readonly queueName: string;

//     constructor(queueName: string) {
//         this.queueName = queueName;
//         this.connect();
//     }

//     async connect(): Promise<void> {
//         this.connection = await amqp
//             .connect("amqp://localhost")
//             .catch(console.warn);
//     }

//     async closeConnection() {
//         await this.channel.close();
//         await this.connection.close();
//     }
// }

// const connection = async () => {
//     let connection;
//     try {
//         connection = await amqp.connect("amqp://localhost");
//         const channel = await connection.createChannel();
//         await channel.assertQueue(queue, { durable: false });
//         channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
//         console.log(" [x] Sent '%s'", text);
//         await channel.close();
//     } catch (err) {
//         console.warn(err);
//     } finally {
//         if (connection) await connection.close();
//     }
//     console.log("acabou!");
// };

// export { RabbitMQ };
