# Terraform script for deploying a Flask backend on AWS Elastic Beanstalk

# Elastic Beanstalk Application
resource "aws_elastic_beanstalk_application" "flask_app" {
  name        = "flask-backend"
  description = "Flask backend hébergé sur AWS Elastic Beanstalk"
}

# Elastic Beanstalk IAM Role
resource "aws_iam_role" "beanstalk_role" {
  name = "aws-elasticbeanstalk-role"

  assume_role_policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "ec2.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
  POLICY
}

resource "aws_iam_instance_profile" "beanstalk_instance_profile" {
  name = "aws-elasticbeanstalk-instance-profile"
  role = aws_iam_role.beanstalk_role.name
}


# Elastic Beanstalk Environment
resource "aws_elastic_beanstalk_environment" "flask_env" {
  name                = "flask-env"
  application         = aws_elastic_beanstalk_application.flask_app.name
  solution_stack_name = "64bit Amazon Linux 2 v3.7.9 running Python 3.8"

 setting {
  namespace = "aws:autoscaling:launchconfiguration"
  name      = "IamInstanceProfile"
  value     = "ElasticBeanstalkInstanceProfile"
}
}


# Output de l'URL de l'environnement Beanstalk
output "elastic_beanstalk_url" {
  value = aws_elastic_beanstalk_environment.flask_env.endpoint_url
}
