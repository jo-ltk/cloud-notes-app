include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "../../terraform"
}

inputs = {
  environment          = "dev"
  instance_type        = "t3.micro"
  public_subnet_cidr   = "10.0.1.0/24"
  availability_zone    = "us-east-1a"
  common_tags = {
    Project     = "cloud-notes-app"
    Environment = "dev"
    ManagedBy   = "terragrunt"
  }
}
