# -----------------------------------------------------------------------------
# main.tf — root module: wires child modules together
# -----------------------------------------------------------------------------
# Order matters for dependencies (Terraform figures this out automatically):
#   1. vpc            → network (VPC, subnet, internet gateway)
#   2. security_group → firewall rules (needs vpc_id)
#   3. ec2            → compute instance (needs subnet + security group)
#
# Each module lives under ./modules/<name>/ and keeps its own resources.
# -----------------------------------------------------------------------------

module "vpc" {
  source = "./modules/vpc"

  project_name       = var.project_name
  environment        = var.environment
  vpc_cidr           = var.vpc_cidr
  public_subnet_cidr = var.public_subnet_cidr
  availability_zone  = var.availability_zone
  common_tags        = var.common_tags
}

module "security_group" {
  source = "./modules/security-group"

  project_name = var.project_name
  environment  = var.environment
  vpc_id       = module.vpc.vpc_id
  ssh_cidr     = var.ssh_cidr
  common_tags  = var.common_tags
}

module "ec2" {
  source = "./modules/ec2"

  project_name       = var.project_name
  environment        = var.environment
  ami_id             = var.ami_id
  instance_type      = var.instance_type
  subnet_id          = module.vpc.public_subnet_id
  security_group_ids = [module.security_group.security_group_id]
  common_tags        = var.common_tags
}
