# AWS provider and Terraform version constraints
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote backend: store state in S3, lock with DynamoDB
  # Uncomment after creating the S3 bucket and DynamoDB table (see README)
  # backend "s3" {
  #   bucket         = "your-terraform-state-bucket"
  #   key            = "cloud-notes-app/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "terraform-state-lock"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = var.common_tags
  }
}
