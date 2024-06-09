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

[Nest](https://github.com/nestjs/nest) Framework

This repository contains a sample project demonstrating the integration of Apache Kafka with a NestJS application. Kafka is a distributed streaming platform used for building real-time data pipelines and streaming applications. It is capable of handling trillions of events a day and is commonly used for messaging, log aggregation, stream processing, and more.

# Table of Contents

- [Introduction](#introduction)

  - [Project Overview](#project-overview)
  - [Key Features](#key-features)

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

- [Prisma Migrations](#prisma-migrations)
  - [Baselining your database](#baselining-your-database)
  - [Applying a new migration](#applying-a-new-migration)
  - [Applying all migrations](#applying-all-migrations)
  - [Merge all migrations](#merge-all-migrations)

## Introduction

### Project Overview

- This repository provides a foundation for building robust **NestJS** applications utilizing **Prisma** as the ORM and **MySQL** as the underlying database. It streamlines the initial setup process, offering essential features commonly required in NestJS projects. This repo demonstrates the integration of **Apache Kafka** with a NestJS application

### Key Features

- **Multitenancy Support**: Implement a multi-tenant environment using environment variables and configuration files, enabling data segregation and customized functionalities for different tenants.

- **Efficient Data Management**: Leverage Prisma ORM as an abstraction layer for seamless interaction with your MySQL database, reducing boilerplate code and simplifying data manipulation.

- **Reusable Components**: Utilize common response entities and data transfer objects (DTOs) to ensure consistent data structures and streamline data handling across your application.

- **Enhanced Debugging**: Implement a custom NestJS interceptor to log request details and Prisma queries, providing valuable insights for troubleshooting and monitoring purposes.

- **Interactive API Documentation**: Integrate Swagger documentation to generate clear API descriptions and facilitate user interaction with the application through an interactive interface.

- **Data Validation**: Enforce data integrity and consistency using NestJS validation pipes, ensuring that incoming requests adhere to predefined data structures.

- **Comprehensive Documentation**: Benefit from clear and detailed documentation, including comments and relevant references, to guide you through the codebase and understand its functionality.

- **Kafka Integration**: Implement a message workflow using Kafka, allowing different parts of your application and different tenants to communicate efficiently through a robust and scalable messaging system.

## Project Structure

TODO:

<!-- // UPDATE THISSSS
This sample project includes a Kafka module with the following services:

- **Consumer Service**: Listens to Kafka topics and processes incoming messages.
- **Producer Service**: Sends messages to Kafka topics.
- **Test Consumer**: Automatically starts consuming messages from specific Kafka topics upon initialization. -->

## Project Explanation

TODO:

<!-- // UPDATE THISSSS
After setting up and running this project, you can access the Swagger documentation at:

```bash
http://localhost:3000/api
```

This project includes an endpoint that produces a message for the "test" topic. When you use this endpoint, it sends a "hello" message, or some other text, to the "test" topic.

The Test Service, which subscribes to the "test" topic, receives these messages and prints them in the terminal where the server is running.

This setup allows you to observe the full flow of producing and consuming messages in Kafka through a simple example. -->

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

### 5. kafka Installation

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

This command will handle the installation of all necessary dependencies for the project.

### 6. Start the Server

Run the following command to start the server in development mode:

```bash
$ yarn start:dev
```

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

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Prisma Migrations

Prisma migration tools are used to manage the database for this repository. This requires prisma to maintain a record of past migrations, which must be in sync with the database.

### Baselining your database

The following command is used to baseline a database.

```bash
$ yarn prisma migrate resolve --applied <migration-name>
```

This step is not required to work in this repository, and has been left in purely for educational purposes.

### Applying a new migration

To make any modification to the database after having baselined it, simply update the prisma schema as desired. Next, stage your migration using:

```bash
$ yarn prisma migrate dev --name <migration-name> --create-only
```

This will generate the appropriate migration files and sql required, but will **not** apply the migration to your database. If you wish, you can inspect and edit the generate files at this point (in case you need to insert data into a new column, for example). Finally, once you are satisfied that this is the migration you wish to apply, use the following command:

```bash
$ yarn prisma migrate dev
```

See [Prisma's custom migration instructions](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/customizing-migrations) for more information.

### Applying all migrations

When deploying to production/making a new deployment, you will want
to deploy all migrations created uptil now after successfully
baselining your database. To do this, run the following command:

```bash
$ yarn prisma migrate deploy
```

### Merge all Migrations

To consolidate all migrations into a single file, follow these steps:

1. **Delete folders of Prisma migration folder.**

   ```bash
   $ rm -rf prisma/migrations/*
   ```

2. **Empty `_prisma_migrations` table from the database.**

   ```sql
   TRUNCATE _prisma_migrations; -- Apply this in the database
   ```

3. **Create `squashed_migrations` migration (single migration).**

   ```bash
   $ yarn prisma migrate dev --name squashed_migrations
   ```

   When prompted, provide a name for the migration, such as `squashed_migrations` or `init` or anything you like.

4. **Mark the created migration as resolved.**

   ```bash
   $ yarn prisma migrate resolve --applied <Migration name>
   ```

   Migration name will be same as created in migration folder.

   This step will generate a single migration file for all migrations.

You can refer to the [Prisma Documentation on squashing migrations](https://www.prisma.io/docs/orm/prisma-migrate/workflows/squashing-migrations#how-to-squash-migrations).

**Note:**
`Please ensure there is no seeding data in the migration files before following these steps; otherwise, seeding data may be lost.`

## Stay in Touch

- **LinkedIn Profile**: [Muhammad Faraz Khan](https://www.linkedin.com/in/farazkhan455/)
- **GitHub Profile**: [Muhammad Faraz Khan](https://github.com/faraz455)
