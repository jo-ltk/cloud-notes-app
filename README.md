# Cloud Notes App

Cloud Notes App is a full-stack DevOps learning project built using Next.js, Flask, Docker, Terraform, Kubernetes, and GitHub Actions.  
The project demonstrates modern DevOps workflows including containerization, CI/CD automation, Infrastructure as Code (IaC), Kubernetes deployments, scaling, and cloud-ready architecture.

---

## Features

- Create and delete notes
- Full-stack application with frontend and backend
- Dockerized frontend and backend services
- Multi-container setup using Docker Compose
- Terraform infrastructure provisioning
- Reusable Terraform modules
- GitHub Actions CI/CD pipeline
- Kubernetes deployment using Minikube
- Kubernetes scaling and rolling updates
- Multi-environment Kubernetes namespaces
- AWS-ready infrastructure setup

---

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Flask
- Python
- SQLite

### DevOps & Cloud
- Docker
- Docker Compose
- Terraform
- Kubernetes
- Minikube
- GitHub Actions
- AWS
- Terragrunt
- ArgoCD

---

## Architecture

![Architecture diagram](assets/screenshots/architecture.png)

---

## Screenshots

### App UI

![Notes app UI](assets/screenshots/app-ui.png)

---

### Docker

![Docker Desktop — cloud-notes-app running](assets/screenshots/docker-running.png)

---

### GitHub Actions

![GitHub Actions CI — successful pipeline](assets/screenshots/github-actions.png)

---

## Local Setup

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

Backend runs on:

```txt
http://localhost:5000
```

---

## Docker Setup

Run the full application using Docker Compose:

```bash
docker compose up --build
```

This starts:
- Frontend container
- Backend container
- Shared Docker network
- Persistent backend volume

---

## Terraform

Terraform is used to provision AWS infrastructure using reusable modules.

### Terraform Components

- VPC
- Public Subnet
- Internet Gateway
- Route Table
- Security Group
- EC2 Instance

### Terraform Commands

```bash
cd terraform

terraform init -backend=false

terraform validate

terraform plan -input=false "-var-file=environments/dev/terraform.tfvars"
```

---

## Terraform Plan

Terraform successfully validates and generates infrastructure plan for:

- VPC
- Public Subnet
- Internet Gateway
- Route Table
- Security Group
- EC2 Instance

Command used:

```bash
terraform plan -input=false "-var-file=environments/dev/terraform.tfvars"
```

<img width="967" height="517" alt="image" src="https://github.com/user-attachments/assets/b27a06e0-51be-4433-aa90-e4ab8ab1edf4" />

---

## CI/CD Pipeline

GitHub Actions pipeline automatically performs:

- Terraform format check
- Terraform validation
- Terraform plan
- Docker image build
- CI workflow automation

---

## Kubernetes Deployment

Application deployed locally using Minikube Kubernetes cluster.

### Kubernetes Features Tested

- Deployments
- Services
- Scaling
- Rolling updates
- Namespace isolation
- Pod monitoring
- Logs and rollout management

<img width="1077" height="362" alt="image" src="https://github.com/user-attachments/assets/2e64f27e-39ef-493a-913c-2ab1599d125b" />

Kubernetes successfully scaled the frontend deployment from 2 to 5 replicas, demonstrating container orchestration, high availability, and auto-scaling capabilities using Minikube.

<img width="1215" height="290" alt="image" src="https://github.com/user-attachments/assets/35a66135-b906-4835-98bb-4d7bcc8e1725" />

---

## Future Improvements

- Deploy infrastructure fully on AWS
- Configure Terraform remote backend using S3 + DynamoDB
- Push Docker images to Docker Hub or Amazon ECR
- Deploy Kubernetes cluster using EKS
- Configure live ArgoCD GitOps sync
- Add monitoring and logging tools
- Add authentication and database improvements

---

## Project Flow

```text
Developer Push
    ↓
GitHub Actions CI/CD
    ↓
Terraform Validation & Planning
    ↓
Docker Image Build
    ↓
Kubernetes Deployment
    ↓
Scaling & Rollout Management
    ↓
Cloud Notes App Running
```
