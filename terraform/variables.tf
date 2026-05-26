# -----------------------------------------------------------------------------
# variables.tf — inputs for the root module
# -----------------------------------------------------------------------------
# Defaults work for local learning; override values in terraform.tfvars
# or on the CLI: terraform plan -var="instance_type=t3.small"
# -----------------------------------------------------------------------------

variable "aws_region" {
  description = "AWS region where all resources are created (e.g. us-east-1)"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Prefix used in resource names and tags"
  type        = string
  default     = "cloud-notes-app"
}

variable "environment" {
  description = "Environment label: dev, staging, or prod"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "IP range for the VPC (private network)"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "IP range for the public subnet (EC2 gets a public IP here)"
  type        = string
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "AWS Availability Zone for the public subnet"
  type        = string
  default     = "us-east-1a"
}

variable "instance_type" {
  description = "EC2 instance size (t3.micro is free-tier friendly)"
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "Amazon Machine Image ID for the EC2 instance"
  type        = string
  default     = "ami-0c55b159cbfafe1f0"
}

variable "ssh_cidr" {
  description = "Who may SSH to the instance (use your IP in production, not 0.0.0.0/0)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "common_tags" {
  description = "Tags applied to all resources for cost tracking and organization"
  type        = map(string)
  default = {
    Project   = "cloud-notes-app"
    ManagedBy = "terraform"
  }
}
