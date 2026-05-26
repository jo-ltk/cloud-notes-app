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
Developer Push → GitHub
    ↓
GitHub Actions (CI)
    ├── Terraform validate & plan (AWS)
    └── Docker build → push to Docker Hub (main branch)
    ↓
Kubernetes pulls images from Docker Hub
    ↓
ArgoCD syncs cluster from Git (optional, when configured)
    ↓
Terraform provisions AWS infrastructure
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
2. Setup Terraform → fmt, init, validate, plan (AWS)
3. Build Docker images (frontend + backend)
4. On push to **main**: log in to Docker Hub and **push** images

CI/CD automates:

* Terraform validation and planning
* Docker image builds on every push/PR
* Docker Hub publish on merge to `main`

### Docker Hub secrets (required for push)

In GitHub: **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Value |
|-------------|--------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub **Access Token** (Account Settings → Security → New Access Token) |
| `AWS_ACCESS_KEY_ID` | (existing) Terraform |
| `AWS_SECRET_ACCESS_KEY` | (existing) Terraform |

Do **not** use your Docker Hub password in CI; use a token.

### Image names

After CI runs on `main`, images are available as:

* `<username>/cloud-notes-backend:latest`
* `<username>/cloud-notes-frontend:latest`

Update `kubernetes/deployment.yaml`: replace `YOUR_DOCKERHUB_USERNAME` with your username, then `kubectl apply -f kubernetes/`.

![GitHub Actions](assets/screenshots/github-actions.png)

---

# Kubernetes

kubernetes/
→ runs containers from **Docker Hub** (not local Minikube images)

Files:

* deployment.yaml — image: `<dockerhub-user>/cloud-notes-backend:latest`
* service.yaml

Before first deploy, edit `deployment.yaml` and set your Docker Hub username.

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
