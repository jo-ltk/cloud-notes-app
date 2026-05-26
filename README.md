# Cloud Notes App

Cloud Notes App is a full-stack DevOps learning project built using Next.js, Flask, Docker, Terraform, Kubernetes, and GitHub Actions.

The project demonstrates modern DevOps workflows including containerization, CI/CD automation, Infrastructure as Code (IaC), Kubernetes deployments, scaling, and cloud-ready architecture.

---

## Features

- Create, edit, and delete notes
- Full-stack frontend and backend application
- Dockerized frontend and backend services
- Multi-container setup using Docker Compose
- Terraform infrastructure planning and validation
- Reusable Terraform modules
- GitHub Actions CI/CD pipeline
- Kubernetes deployment using Minikube
- Kubernetes manual replica scaling
- Kubernetes rolling updates and rollout management
- AWS-ready infrastructure structure

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Flask
- Python
- SQLite

### DevOps & Cloud
- Docker
- Docker Compose
- Terraform
- Terragrunt (optional wrapper — see `terragrunt/`)
- Kubernetes
- Minikube
- GitHub Actions
- AWS

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

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python app.py
```

Backend runs on:

```txt
http://localhost:5000
```

---

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

---

## Docker Setup

Run the application using Docker Compose:

```bash
docker compose up --build
```

### Docker Services

- Frontend → `http://localhost:3000`
- Backend → `http://localhost:5001`

Docker Compose starts:
- Frontend container
- Backend container
- Shared Docker network
- Persistent backend volume

---

## Terraform

Beginner-friendly layout under `terraform/`:

| File | Purpose |
|------|---------|
| `provider.tf` | AWS provider and Terraform version |
| `variables.tf` | Input definitions (with defaults) |
| `terraform.tfvars` | Your environment values (dev, etc.) |
| `main.tf` | Calls vpc → security-group → ec2 modules |
| `outputs.tf` | IDs and IPs after apply |
| `modules/` | Reusable vpc, security-group, ec2 modules |

### Terraform Components

- VPC
- Public Subnet
- Internet Gateway
- Route Table
- Security Group
- EC2 Instance

### Plan / apply flow

```bash
cd terraform
terraform init
terraform fmt -recursive
terraform validate
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

Generated locally (do not commit): `terraform/.terraform/`, `*.tfstate`. Keep `.terraform.lock.hcl` for stable provider versions.

### Terragrunt (optional next step)

Same infrastructure, different folder — learn how teams wrap Terraform without duplicating modules. See [`terragrunt/README.md`](terragrunt/README.md).

```bash
cd terragrunt/dev
terragrunt init
terragrunt plan
```

---

## Terraform Plan

Terraform successfully validates and generates infrastructure plans for:

- VPC
- Public Subnet
- Internet Gateway
- Route Table
- Security Group
- EC2 Instance

Command used:

```bash
terraform plan -input=false -var-file=terraform.tfvars
```

<img width="967" height="517" alt="image" src="https://github.com/user-attachments/assets/b27a06e0-51be-4433-aa90-e4ab8ab1edf4" />

---

## CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`) on push/PR:

1. Checkout
2. Setup Terraform
3. Configure AWS credentials (repository secrets)
4. `terraform fmt` → `init` → `validate` → `plan`
5. Build backend and frontend Docker images

---

## Kubernetes Deployment

Two files only:

- `kubernetes/deployment.yaml` — runs backend and frontend (2 replicas each)
- `kubernetes/service.yaml` — NodePort access to both apps

```bash
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```

Application deployed locally using Minikube Kubernetes cluster.

### Kubernetes Features Tested

- Deployments
- Services
- Replica scaling
- Rolling updates
- Namespace isolation
- Pod monitoring
- Logs and rollout management

<img width="1077" height="362" alt="image" src="https://github.com/user-attachments/assets/2e64f27e-39ef-493a-913c-2ab1599d125b" />

Kubernetes successfully scaled the frontend deployment from 2 to 5 replicas, demonstrating container orchestration, high availability, and manual replica scaling using Minikube.

<img width="1215" height="290" alt="image" src="https://github.com/user-attachments/assets/35a66135-b906-4835-98bb-4d7bcc8e1725" />

---

## Future Improvements

- Deploy infrastructure fully on AWS
- Configure Terraform remote backend using S3 + DynamoDB
- Push Docker images to Docker Hub or Amazon ECR
- Deploy Kubernetes cluster using EKS
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
Local Kubernetes Deployment (Minikube)
    ↓
Scaling & Rollout Management
    ↓
Cloud Notes App Running
```
