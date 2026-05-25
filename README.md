# Cloud Notes App

Short project intro

## Features

## Tech Stack

## Architecture

![Architecture diagram](assets/screenshots/architecture.png)

## Screenshots

### App UI

![Notes app UI](assets/screenshots/app-ui.png)

### Docker

![Docker Desktop — cloud-notes-app running](assets/screenshots/docker-running.png)

### GitHub Actions

![GitHub Actions CI — successful pipeline](assets/screenshots/github-actions.png)

## Local Setup

## Docker Setup

## Terraform

## CI/CD Pipeline

## Future Improvements

## Terraform Plan

Terraform successfully validates and generates infrastructure plan for:

- VPC
- Public Subnet
- Internet Gateway
- Route Table
- Security Group
- EC2 Instance

Command used:

terraform plan -input=false "-var-file=environments/dev/terraform.tfvars"
