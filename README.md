# Microservices System using NestJS

This repository contains the microservices for handling reservations, payments, authentication, and notifications using the NestJS framework. Refer to the architecture diagram for an overview of service interactions.

## Prerequisites

- Node.js
- MongoDB
- `pnpm` package manager

## Installation

To install the necessary dependencies, run the following command:

```bash
$ pnpm install
```

## Running the app

You can start the application in development, watch, or production mode.

```bash
# development mode
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Microservices Structure

This system is composed of several distinct microservices, each responsible for a specific part of the application's functionality. Here is a breakdown of each service:

- **Auth Service** (TCP 3002):

  - Handles user authentication.
  - Issues JSON Web Tokens (JWTs) for securing endpoints.
  - Connects to MongoDB to manage user data.
  - Deployment configurations are managed through `auth/deployment.yaml`.

- **Reservations Service** (HTTP 3000):

  - Manages reservation data.
  - Interfaces directly with MongoDB to store and retrieve reservations.
  - Accessible via HTTP to support web-based interactions.
  - Kubernetes services include load balancing and optional ingress for external access.

- **Payments Service** (TCP 3003):

  - Integrates with Stripe to process payments.
  - Manages transaction records in MongoDB.
  - Utilizes a TCP connection for internal communication.
  - Ensured high availability and security through Kubernetes deployment settings.

- **Notifications Service** (TCP 3004):
  - Handles sending email notifications via Gmail.
  - Works asynchronously to send alerts about reservations, payments, and user activities.
  - Uses a TCP connection for inter-service messaging.
  - Deployment ensures reliability and scalability.

Each service is designed to operate independently, allowing for scalability and resilience. Configurations for Kubernetes deployments, including services and optional ingress settings, are managed through respective YAML files in the `charts` directory.

## Environment Configuration

Each service requires its own environment configuration for optimal operation. Ensure that environment variables are set up for each service according to their specific needs.

## Test

Testing is an integral part of maintaining code quality and ensuring functionality. Ensure you have the necessary testing environment setup, including any required service stubs or mocks for integration tests.

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

### Prerequisites

- Kubernetes cluster (GKE recommended)
- Helm 3 installed
- `kubectl` configured to communicate with your Kubernetes cluster
- Access to a Google Cloud Platform (GCP) account

### Configuring Helm and Kubernetes

1. **Set up the Kubernetes context:**

   Ensure `kubectl` is configured to interact with your Kubernetes cluster. You can set the current context to your cluster using:

   ```bash
   $ gcloud container clusters get-credentials [CLUSTER_NAME] --zone [CLUSTER_ZONE] --project [PROJECT_ID]
   ```

### Deploying Microservices

Deploy each microservice using Helm. The templates for deployment, services, and ingress (if applicable) are organized under each microservice directory.

```bash
# Deploy the Auth service
$ helm install auth ./auth

# Deploy the Notifications service
$ helm install notifications ./notifications

# Deploy the Payments service
$ helm install payments ./payments

# Deploy the Reservations service
$ helm install reservations ./reservations
```

### Monitoring Deployment

Monitor the deployment status and troubleshoot any issues with:

```bash
$ kubectl get pods
$ kubectl describe pod [POD_NAME]
```
