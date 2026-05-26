output "security_group_id" {
  description = "ID attached to the EC2 instance"
  value       = aws_security_group.web.id
}
