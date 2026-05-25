include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "../../terraform"
}

inputs = {
  environment          = "staging"
  instance_type        = "t3.small"
  public_subnet_cidr   = "10.0.2.0/24"
  availability_zone    = "us-east-1b"
  common_tags = {
    Project     = "cloud-notes-app"
    Environment = "staging"
    ManagedBy   = "terragrunt"
  }
}
