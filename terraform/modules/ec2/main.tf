# EC2 module — one virtual server to run Docker or Kubernetes (learning/demo)

resource "aws_instance" "app" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = var.security_group_ids

  tags = merge(var.common_tags, {
    Name = "${var.project_name}-${var.environment}-ec2"
  })
}
