# Root module wires VPC, security group, and EC2 together
# No hardcoded values — everything comes from variables.tf

module "vpc" {
  source = "./modules/vpc"

  project_name          = var.project_name
  environment           = var.environment
  vpc_cidr              = var.vpc_cidr
  public_subnet_cidr    = var.public_subnet_cidr
  availability_zone     = var.availability_zone
  common_tags           = var.common_tags
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

  project_name         = var.project_name
  environment          = var.environment
  ami_id               = var.ami_id
  instance_type        = var.instance_type
  subnet_id            = module.vpc.public_subnet_id
  security_group_ids   = [module.security_group.security_group_id]
  common_tags          = var.common_tags
}
