# -----------------------------------------------------------------------------
# provider.tf — Terraform and AWS provider configuration
# -----------------------------------------------------------------------------
# This file tells Terraform:
#   1. Which Terraform version to use
#   2. Which cloud provider plugin to download (AWS)
#   3. Which AWS region to deploy into
#
# Beginner flow:
#   terraform init    → downloads the AWS provider
#   terraform plan    → previews changes (needs AWS credentials)
#   terraform apply   → creates/updates real AWS resources
# -----------------------------------------------------------------------------

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Optional later: remote state in S3 (uncomment when you learn state backends)
  # backend "s3" {
  #   bucket         = "your-terraform-state-bucket"
  #   key            = "cloud-notes-app/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "terraform-state-lock"
  #   encrypt        = true
  # }
}

# AWS provider — all resources in this project use this region
provider "aws" {
  region = var.aws_region

  # Tags applied automatically to every resource that supports tags
  default_tags {
    tags = var.common_tags
  }
}
