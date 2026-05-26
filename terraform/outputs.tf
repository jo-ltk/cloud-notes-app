# -----------------------------------------------------------------------------
# outputs.tf — values shown after terraform apply
# -----------------------------------------------------------------------------
# Use these in interviews to explain what Terraform created:
#   terraform output              → list all outputs
#   terraform output ec2_public_ip → public IP to SSH or open in browser
# -----------------------------------------------------------------------------

output "vpc_id" {
  description = "VPC ID — the isolated network"
  value       = module.vpc.vpc_id
}

output "public_subnet_id" {
  description = "Subnet ID where the EC2 instance runs"
  value       = module.vpc.public_subnet_id
}

output "security_group_id" {
  description = "Security group ID (firewall rules for the instance)"
  value       = module.security_group.security_group_id
}

output "ec2_public_ip" {
  description = "Public IP of the EC2 instance (use for SSH or app access)"
  value       = module.ec2.public_ip
}

output "ec2_instance_id" {
  description = "EC2 instance ID (use in AWS Console or CLI)"
  value       = module.ec2.instance_id
}
