require("dotenv").config();
const mongoose = require("mongoose");

const uri = 'mongodb://mongo/BlogDB'


async function connectToMongoDB() {
    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message)
    }
}

async function disconnectFromMongoDB() {
    try {
        await testClient.disconnect()
        console.log('Disconnected from MongoDB')
    } catch (error) {
        console.log('Error disconnecting from MongoDB:', error.message)
    }
}

module.exports = async () => {
    await connectToMongoDB();

    // The returned function will be called after all tests have run
    return async () => {
      await disconnectFromMongoDB();
    };
}

