# EC2 module: single instance to host Docker/K8s node for learning

resource "aws_instance" "app" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = var.security_group_ids

  tags = merge(var.common_tags, {
    Name = "${var.project_name}-${var.environment}-ec2"
  })
}
