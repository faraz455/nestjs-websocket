<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

## Description

This repository contains a sample project demonstrating the integration of Apache Kafka with a NestJS application. Kafka is a distributed streaming platform used for building real-time data pipelines and streaming applications. It is capable of handling trillions of events a day and is commonly used for messaging, log aggregation, stream processing, and more.

## Prerequisites

To get started with this project, you need to have Java and Kafka installed on your machine. Below are the steps to set up the environment on macOS using Homebrew.

## Steps

1. Check if Java is installed:

   ```bash
   java -version
   ```

2. If Java is not installed, install OpenJDK 11:

   ```bash
   brew install openjdk@11
   ```

   Add OpenJDK 11 to your PATH:

   ```bash
   echo 'export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
   ```

   Set the CPPFLAGS environment variable:

   ```bash
   export CPPFLAGS="-I/opt/homebrew/opt/openjdk@11/include"
   ```

   Source the updated profile:

   ```bash
   source ~/.zshrc  # or source ~/.bash_profile
   ```

3. Install Kafka:

   ```bash
   brew install kafka
   ```

4. Start Zookeeper:

   ```bash
   zookeeper-server-start /opt/homebrew/etc/kafka/zookeeper.properties
   ```

5. Start Kafka server:
   ```bash
   kafka-server-start /opt/homebrew/etc/kafka/server.properties
   ```

These steps will set up Kafka and Java, enabling you to start this project.

## Installation

To install the project dependencies, run:

```bash
$ yarn install
```

## Project Structure

This sample project includes a Kafka module with the following services:

- **Consumer Service**: Listens to Kafka topics and processes incoming messages.
- **Producer Service**: Sends messages to Kafka topics.
- **Test Consumer**: Automatically starts consuming messages from specific Kafka topics upon initialization.

## Project Explanation

After setting up and running this project, you can access the Swagger documentation at:

```bash
http://localhost:3000/api
```

This project includes an endpoint that produces a message for the "test" topic. When you use this endpoint, it sends a "hello" message, or some other text, to the "test" topic.

The Test Service, which subscribes to the "test" topic, receives these messages and prints them in the terminal where the server is running.

This setup allows you to observe the full flow of producing and consuming messages in Kafka through a simple example.

## Running the App

You can run the application in various modes:

```bash
# Development mode
$ yarn run start

# Watch mode
$ yarn run start:dev

# Production mode
$ yarn run start:prod
```

## Stay in Touch

- **LinkedIn Profile**: [Muhammad Faraz Khan](https://www.linkedin.com/in/farazkhan455/)
- **GitHub Profile**: [Muhammad Faraz Khan](https://github.com/faraz455)

## License

Nest is [MIT licensed](LICENSE).
