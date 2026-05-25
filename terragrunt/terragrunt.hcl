# Root Terragrunt config — shared settings for all environments
locals {
  project_name = "cloud-notes-app"
}

# Generate provider block for child modules
generate "provider" {
  path      = "provider_override.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = var.aws_region
}
EOF
}

# Remote state — same S3 backend for all envs, different state keys per folder
remote_state {
  backend = "s3"
  config = {
    bucket         = get_env("TF_STATE_BUCKET", "your-unique-terraform-state-bucket")
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = get_env("AWS_REGION", "us-east-1")
    dynamodb_table = get_env("TF_LOCK_TABLE", "terraform-state-lock")
    encrypt        = true
  }
}
