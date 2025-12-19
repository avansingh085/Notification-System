# Real-Time Notification System

A high-performance notification service built with **Node.js**, **Express**, **Socket.io**, and **Redis**. This system uses a hybrid approach of MongoDB for persistence and Redis Pub/Sub for real-time, cross-server communication.

##  Features

* **Instant Notifications**: Delivered via WebSockets for zero-latency user experience.
* **Redis Pub/Sub**: Ensures that notifications are delivered even if the sender and receiver are connected to different server instances (horizontal scaling).
* **Smart Caching**: Uses Redis to cache user notification history with a 120-second TTL.
* **Recent History**: Maintains a fast-access list of the 50 most recent notifications using Redis `LPUSH` and `LTRIM`.
* **Data Persistence**: All notifications are permanently stored in MongoDB.

---

##  Tech Stack

* **Backend**: Node.js / Express
* **Real-time**: Socket.io
* **Database**: MongoDB (Mongoose)
* **Caching/Messaging**: Redis (ioredis)

---

##  System Architecture



1.  **POST Request**: A notification is sent to the API.
2.  **Database & Cache**: The notification is saved to MongoDB, and the specific user's Redis cache is invalidated.
3.  **Pub/Sub**: The message is published to the Redis `new_notification` channel.
4.  **WebSocket Emission**: All server instances listening to that Redis channel receive the message and emit it to the specific Socket.io room (`user_userId`).

---

##  Prerequisites

* Node.js installed
* A running MongoDB instance
* A Redis instance (Upstash, Redis Cloud, or Local)

---

##  Setup & Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/avansingh085/Notification-System.git
    cd Notification-System
    
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    PORT=3000
    MONGO_URI=mongodb://127.0.0.1:27017/notifications
    REDIS_URL=your_redis_connection_url
    ```

4.  **Run the Server**
    ```bash
    node src/server.js
    ```



