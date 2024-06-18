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

This project is built on top of [Git Repository](https://github.com/faraz455/nestjs-prisma-mysql).

Built with [Nest Framework](https://github.com/nestjs/nest) , this project demonstrates the use of **WebSockets** in a **NestJS application** to enable real-time communication. It features a single-page front-end where users can interact with each other through WebSocket connections. The primary goal of this project is to showcase the integration of NestJS WebSockets with a front-end interface, facilitating real-time messaging between users.

# Table of Contents

- [Introduction](#introduction)

  - [Project Overview](#project-overview)
  - [Key Features](#key-features)
  - [Project Structure](#project-structure)

- [Demo Video](#demo-video)

- [Quick Start](#quick-start)

- [Installation](#installation)

  - [Prerequistes](#prerequisites)
  - [Setting up environment variables](#setting-up-environment-variables)

    - [Basic Environment](#basic-environment)
    - [Tenant Configuration](#tenant-configuration)

  - [Prisma Integration](#prisma-integration)
    - [Key benefits of Prisma](#key-benefits-of-prisma)
    - [Prisma Setup](#prisma-setup)

- [Running the app](#running-the-app)

## Introduction

### Project Overview

This project provides a practical implementation of real-time communication using **WebSockets** in a **NestJS application**. It comprises a backend server built with NestJS and a simple single-page front-end application.

### Key Features

- **Multitenancy Support**: Implement a multi-tenant environment using environment variables and configuration files, enabling data segregation and customized functionalities for different tenants.

- **Efficient Data Management**: Leverage Prisma ORM as an abstraction layer for seamless interaction with your MySQL database, reducing boilerplate code and simplifying data manipulation.

- **NestJS WebSocket Integration**: Demonstrates how to set up and manage WebSocket connections in a NestJS server. This includes handling user connections, broadcasting messages, and managing real-time data flow.

- **Real-Time Messaging**: Users can send and receive messages instantly through the WebSocket connection. Messages are displayed in a chat interface, similar to popular messaging apps.

- **Single-Page Application (SPA)**: The front-end is built as a SPA using HTML, CSS, and JavaScript. This interface allows users to log in, view messages, and send new messages without needing to reload the page.

- **User Authentication**: The project includes a basic user authentication system. Users must log in to access the chat functionality, ensuring that messages are tied to specific users.

- **Enhanced Debugging**: Implement a custom NestJS interceptor to log request details and Prisma queries, providing valuable insights for troubleshooting and monitoring purposes.

### Project Structure

This project is organized into two main parts: the front-end application and the back-end server. Below is an overview of each part and its components.

#### Front-End

- **User Registration**: Users can register by providing a username, full name, and password. Users can log in using their registered username and password. Upon successful authentication, users are redirected to the chat interface.
- **Real-Time Messaging**: Once logged in, users can view all previous messages and send new messages in real-time without reloading the page. The chat interface updates instantly to display messages from all connected users.

#### Back-End

- **Database Schema**: The back-end utilizes a relational database with tables for users and messages. Each message is linked to a user, enabling the identification of message senders.
- **WebSocket Integration**: The Chat Gateway Service handles WebSocket connections. It initializes connections, manages user sessions, and When the WebSocket server emits a message, the service ensures all connected clients receive the message in real-time.

#### Workflow

- Users **register and log in** via the front-end application, with authentication handled by the back-end server.

- Upon successful login, users are connected to the **WebSocket server**. The chat interface allows users to send and receive messages instantly. Messages are broadcast to all connected clients and stored in the database for future retrieval.

- It manages the **storage and retrieval** of user and message data, ensuring a seamless and persistent chat experience.

## Demo Video

You can watch the demo video [here](https://drive.google.com/file/d/1BMc1U8BYrm2ExQCLMDMwf2RkZz2DWoCS/preview).

Or view it directly below:

<div align="center">
  <iframe src="https://drive.google.com/file/d/1BMc1U8BYrm2ExQCLMDMwf2RkZz2DWoCS/preview" width="640" height="480" allow="autoplay; fullscreen"></iframe>
</div>

## Quick Start

### 1. MySQL 8 Docker Setup

If you have already set up MySQL 8, you can skip this step. Otherwise, you can use the following instructions to set up MySQL 8 using Docker.

```yaml
version: "3.5"
services:
  mysql8:
    container_name: mysql8
    hostname: mysql8
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 1234
    ports:
      - "3306:3306"
    volumes:
      - ./database:/var/lib/mysql
    networks:
      - net-db

networks:
  net-db:
    external: true
```

Save the file and run the following command in your terminal:

```bash
$ docker-compose up -d
```

This command will start the MySQL 8 database container.

### 2. Environment Configuration

Create a `.env` file at the root directory of your project with the following content:

```bash
DATABASE_URL=mysql://root:1234@localhost:3306/nestdb
TIMEZONE=0
LOG_QUERIES=0
LOG_REQUESTS=1
PRODUCTION=0
```

Create an `env.conf` file at the root directory of your project with the following content:

```
[localhost:3000]

SITE_CODE=qa
BASE_URL=http://localhost:3000
AUTH_COOKIE_NAME=_qa_

# DATABASE
DB_HOST_MAIN=localhost:3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=nestdb
DB_DEBUG=0
```

### 3. Install Dependencies

To install all the required dependencies, run the following command in your terminal:

```bash
$ yarn install
```

### 4. Prisma Setup

Generate Prisma client and apply migrations:

```bash
$ yarn prisma generate
$ yarn prisma migrate deploy
```

### 5. Start the Server

Run the following command to start the server in development mode:

```bash
$ yarn start
```

### 6. Getting Started

To use the system, follow these steps:

- Navigate to the `frontend` folder in the project directory.
- Open the `index.html` file in your web browser.
- **Signup**: Create a new user account by providing a username, full name, and password.
- **Login**: Log in with your newly created credentials.
- **Chat**: Once logged in, you will see the chat screen where you can send and receive messages in real-time without the need for page reloads. Messages will appear instantly as they are sent and received.

## Installation

### Prerequisites

Before proceeding with the setup, ensure that your development system has the following prerequisites installed:

**Node.js**: This project relies on Node.js for its functionality. If you haven't installed it yet, you can download and install the latest version from the [ official Node website](https://nodejs.org/en).

**Yarn**: Yarn is used for efficient dependency management in this project. Make sure Yarn is installed on your system. If not, you can install it by following the instructions on the [official Yarn website.](https://yarnpkg.com/).

To install all the required dependencies, run the following command in your terminal:

```bash
$ yarn install
```

To get started with this project, you need to have Java and Kafka installed on your machine. Below are the steps to set up the environment on macOS using Homebrew.

## Setting up environment variables

### Basic Environment

Create a `.env` file in the root directory of the repository and add the following lines:

```
DATABASE_URL=mysql://<username>:<password>@<host-address:port>/<db-name>
TIMEZONE=<0>

LOG_QUERIES=<0 or 1>
LOG_REQUESTS=<0 or 1>
PRODUCTION=<0 or 1>
```

E.g.

```
DATABASE_URL=mysql://root:1234@localhost:3306/databaseName
TIMEZONE=0

LOG_QUERIES=0
LOG_REQUESTS=1
PRODUCTION=0
```

Remember, the `DATABASE_URL` environment variable should refer to your dev database and is only present for use with the Prisma CLI. To see how to configure the database(s) you wish to use when running the server, see Tenant Configuration below.

### Tenant Configuration

This application is designed to be multi-tenant. That is, multiple users will use a single deployment, with the services provided being distinguished by the host address.

A tenant configuration file needs to be added for this. Create `env.conf` in the root directory of the repository as follows:

```
[<host-address>]

SITE_CODE=qa
BASE_URL=http://<host-address>
AUTH_COOKIE_NAME=<cookie-name>

# DATABASE
DB_HOST_MAIN=<db-host>:<db-port>
DB_USER=<db-user>
DB_PASSWORD=<db-password>
DB_NAME=<db-name>
DB_DEBUG=0 or 1
```

E.g.

```
[localhost:3000]

SITE_CODE=qa
BASE_URL=http://localhost:3000
AUTH_COOKIE_NAME=_qa_

# DATABASE
DB_HOST_MAIN=localhost:3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=databaseName
DB_DEBUG=0
```

Copy paste the above as many times as you wish to serve multiple tenants. Make sure to update their host addresses and environment details accordingly.

## Prisma Integration

Prisma is a next-generation object-relational mapper (ORM) designed specifically for Node.js and TypeScript. It offers a streamlined and intuitive approach to interacting with databases, making your development experience more efficient and enjoyable.

### Key Benefits of Prisma

- **Intuitive data model**: Define your database schema using a concise and human-readable syntax.
- **Automated migrations**: Effortlessly manage database schema changes through automated migrations.
- **Type-safety and auto-completion**: Benefit from TypeScript's inherent type-safety and auto-completion features, simplifying query development and reducing errors.

### Prisma Setup

This project utilizes yarn to manage dependencies. Running `yarn install` will automatically install both Prisma and its client library as defined in the package.json file. However, if you prefer manual installation, you can use the following commands:

```bash
$ yarn add prisma@latest
$ yarn add @prisma/client@latest
```

To apply all the current migrations located in the prisma/migrations folder to your MySQL database.

```bash
$ yarn prisma migrate deploy
```

This ensures that the database schema reflects the latest changes defined in your Prisma models.

Execute below command to generate the Prisma client. This client serves as an interface for interacting with your database, allowing you to perform queries and data manipulation operations.

```bash
$ yarn prisma generate
```

By following these steps, you'll successfully set up Prisma and its client, enabling you to seamlessly interact with your MySQL database within the project.

**Note:** To learn more about Prisma migrations, please refer to the [GitHub repository](https://github.com/faraz455/nestjs-prisma-mysql), where detailed instructions on Prisma migration are provided in the README.

### Aditional Resources

- [Prisma playground](https://playground.prisma.io/) - Practice your Prisma queries and migrations in an interactive environment.
- [Primsa Documentation](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma) - Dive deeper into Prisma functionalities with the comprehensive official documentation.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

To use the system, follow these steps:

- Navigate to the `frontend` folder in the project directory.
- Open the `index.html` file in your web browser.
- **Signup**: Create a new user account by providing a username, full name, and password.
- **Login**: Log in with your newly created credentials.
- **Chat**: Once logged in, you will see the chat screen where you can send and receive messages in real-time without the need for page reloads. Messages will appear instantly as they are sent and received.

## Stay in Touch

- **LinkedIn Profile**: [Muhammad Faraz Khan](https://www.linkedin.com/in/farazkhan455/)
- **GitHub Profile**: [Muhammad Faraz Khan](https://github.com/faraz455)
