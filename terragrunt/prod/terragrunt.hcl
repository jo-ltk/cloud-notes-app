include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "../../terraform"
}

inputs = {
  environment          = "prod"
  instance_type        = "t3.small"
  public_subnet_cidr   = "10.0.3.0/24"
  availability_zone    = "us-east-1c"
  ssh_cidr             = "YOUR_OFFICE_IP/32"  # Restrict SSH in production
  common_tags = {
    Project     = "cloud-notes-app"
    Environment = "prod"
    ManagedBy   = "terragrunt"
  }
}
