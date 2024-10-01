# 🚀 NestJS Project

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white)
![Mongoose](https://img.shields.io/badge/mongoose-%23E54D26.svg?style=for-the-badge&logo=mongoose&logoColor=white)

## 📖 Description

This Backend project is built with [NestJS](https://nestjs.com/) and is a modular and scalable architecture that provides a secure and scalable way of creating applications. It is configured to work with MongoDB as a database and Docker as an efficient development environment.

## 🔧 Technologies

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Containers**: [Docker](https://www.docker.com/)
- **Testing**: [Jest](https://jestjs.io/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Version Control**: [Git](https://git-scm.com/)
- **Code Editor**: [Visual Studio Code](https://code.visualstudio.com/)

## 💻 Installation

To install the project, go to the project directory and execute:
```bash
npm install
```
Then, to run the application, execute:
```bash
npm start
```
This project uses the layer pattern to organize the application's layers:

- **Domain**: this layer contains entities and services that manage the business logic.
- **Infrastructure**: this layer contains services that interact with the database and containers.
- **Application**: this layer contains services that integrate the business logic and infrastructure.

🐳 Docker
This project is ready to run in a Dockerized environment. Use the following command to launch the container:
```bash
docker-compose up -d
```

## 📊 Roadmap

* Add endpoints for creating and updating users
* Implement authentication and authorization
* Add logs and metrics for monitoring performance
* Implement tests for security and performance

## 🤝 Contributing

This project is licensed under [MIT](https://opensource.org/licenses/MIT). If you wish to contribute, please refer to the [contributing guide](CONTRIBUTING.md).

I hope this is what you were looking for!
