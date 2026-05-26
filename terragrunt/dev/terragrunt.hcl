# Dev environment — runs the same Terraform code as ../../terraform
#
# Compare with terraform/terraform.tfvars: same values, different mechanism.
#   Plain Terraform:  terraform plan -var-file=terraform.tfvars
#   Terragrunt:       terragrunt plan  (inputs below are passed automatically)

include "root" {
  path = find_in_parent_folders()
}

terraform {
  # Reuse root module — no copy of VPC/EC2 code in this folder
  source = "../../terraform"
}

inputs = {
  project_name       = "cloud-notes-app"
  environment        = "dev"
  vpc_cidr           = "10.0.0.0/16"
  public_subnet_cidr = "10.0.1.0/24"
  availability_zone  = "us-east-1a"
  instance_type      = "t3.micro"
  ami_id             = "ami-0c55b159cbfafe1f0"
  ssh_cidr           = "0.0.0.0/0"

  common_tags = {
    Project     = "cloud-notes-app"
    Environment = "dev"
    ManagedBy   = "terragrunt"
  }
}
