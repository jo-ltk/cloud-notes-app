# Exported to root module (main.tf uses module.vpc.vpc_id, etc.)

output "vpc_id" {
  description = "VPC identifier"
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "Subnet where EC2 is placed"
  value       = aws_subnet.public.id
}
