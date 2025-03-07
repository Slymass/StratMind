# Terraform script for deploying a PostgreSQL database on AWS RDS
# Security Group pour PostgreSQL (autorise uniquement Beanstalk à se connecter)
resource "aws_security_group" "rds_sg" {
  name        = "rds-security-group"
  description = "Security group pour PostgreSQL RDS instance"

  # Permet l'accès au port PostgreSQL (5432) - Ajuste pour restreindre si besoin
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # ⚠️ À remplacer par l'IP de Beanstalk pour plus de sécurité
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# PostgreSQL Database sur RDS
resource "aws_db_instance" "postgres_db" {
  identifier            = "flask-db"
  engine                = "postgres"
  engine_version        = "13"
  instance_class        = "db.t3.micro"  # Ajuste selon les besoins
  allocated_storage     = 20
  storage_type          = "gp2"
  username             = "terraform_user"  # Changement du username pour éviter "admin"
  password             = "your-secure-password"  # Change pour un vrai mot de passe
  publicly_accessible  = false  # La base ne doit pas être accessible publiquement
  vpc_security_group_ids = [aws_security_group.rds_sg.id]  # Lie le Security Group
  skip_final_snapshot  = true   # Évite la création d'un snapshot final (utile en test)
}

# Output de l'endpoint de la base de données
output "rds_endpoint" {
  value = aws_db_instance.postgres_db.endpoint
}