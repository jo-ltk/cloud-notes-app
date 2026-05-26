# Cloud Notes App

Cloud Notes App is a full-stack DevOps learning project built using:

* Next.js
* Flask
* Docker
* Terraform
* Kubernetes
* GitHub Actions
* AWS

Purpose:
Learn modern DevOps workflow from development → containerization → infrastructure → Kubernetes deployment.

---

# Project Flow

```text
Developer Push
    ↓
GitHub Actions CI/CD
    ↓
Terraform Validation & Planning
    ↓
Docker Image Build
    ↓
Kubernetes Deployment (Minikube)
    ↓
Scaling & Rollout Management
    ↓
Cloud Notes App Running
```

---

# Architecture

![Architecture Diagram](assets/screenshots/architecture.png)

Frontend
↓
Backend API
↓
Docker Containers
↓
Kubernetes
↓
Terraform Infrastructure
↓
CI/CD Automation

---

# Application UI

![Notes App UI](assets/screenshots/app-ui.png)

Frontend built using:

* Next.js
* React
* TypeScript
* Tailwind CSS

Backend built using:

* Flask
* Python
* SQLite

---

# Docker

docker-compose.yml
→ runs frontend and backend containers together

Command:

```bash
docker compose up --build
```

Docker handles:

* frontend container
* backend container
* shared Docker network
* isolated environment

![Docker Running](assets/screenshots/docker-running.png)

---

# Terraform

terraform/
→ Infrastructure as Code (IaC)

Terraform creates:

* VPC
* Public Subnet
* Internet Gateway
* Route Table
* Security Group
* EC2 Instance

Terraform Files:

provider.tf
→ connects Terraform to AWS

variables.tf
→ reusable variables

terraform.tfvars
→ actual environment values

main.tf
→ connects Terraform modules

outputs.tf
→ prints infrastructure outputs

modules/
→ reusable infrastructure blocks

Terraform Commands:

```bash
cd terraform

terraform init

terraform fmt -recursive

terraform validate

terraform plan -var-file=terraform.tfvars
```

Terraform Plan:

![Terraform Plan](https://github.com/user-attachments/assets/b27a06e0-51be-4433-aa90-e4ab8ab1edf4)

Terraform Explanation:
Terraform creates AWS infrastructure automatically using reusable code.

---

# Terragrunt

terragrunt/
→ optional Terraform wrapper

Purpose:
Reuse same Terraform code for multiple environments without duplication.

Current Setup:

```txt
terragrunt/
 ├── terragrunt.hcl
 ├── README.md
 └── dev/
      └── terragrunt.hcl
```

Terragrunt currently manages:

* dev environment

Future environments:

* staging
* production

Terragrunt Explanation:
Terragrunt helps manage Terraform environments using the same infrastructure code.

---

# GitHub Actions CI/CD

.github/workflows/ci.yml

Pipeline Flow:

1. Checkout code
2. Setup Terraform
3. Configure AWS credentials
4. Terraform fmt
5. Terraform init
6. Terraform validate
7. Terraform plan
8. Docker image build

CI/CD automates:

* Terraform validation
* Terraform planning
* Docker image builds

![GitHub Actions](assets/screenshots/github-actions.png)

---

# Kubernetes

kubernetes/
→ manages Docker containers automatically

Files:

* deployment.yaml
* service.yaml

Kubernetes Features Tested:

* Deployments
* Services
* Replica scaling
* Rolling updates
* Namespace isolation
* Pod monitoring
* Logs and rollout management

Commands:

```bash
kubectl apply -f kubernetes/deployment.yaml

kubectl apply -f kubernetes/service.yaml
```

Scaling Example:

```bash
kubectl scale deployment cloud-notes-frontend --replicas=5
```

Pods Running:

![Kubernetes Pods](https://github.com/user-attachments/assets/2e64f27e-39ef-493a-913c-2ab1599d125b)

Replica Scaling:

![Replica Scaling](https://github.com/user-attachments/assets/35a66135-b906-4835-98bb-4d7bcc8e1725)

Kubernetes Explanation:
Kubernetes automatically manages containers, scaling, and application availability.

---

# Important Definitions

Docker
→ packages applications into containers

Terraform
→ creates infrastructure using code

Terragrunt
→ manages multiple Terraform environments

Kubernetes
→ manages Docker containers

CI/CD
→ automates validation and build workflow

VPC
→ private AWS network

Security Group
→ firewall

EC2
→ virtual server

Deployment
→ runs containers

Service
→ exposes app to network

---

# Final Summary

This project helped me learn:

* Docker containerization
* Terraform Infrastructure as Code
* Kubernetes deployment and scaling
* CI/CD automation
* DevOps workflows
* Cloud-native architecture

The project was mainly built for learning modern DevOps practices and deployment workflows.
