# Ce fichier Terraform cree l'infrastructure AWS pour heberger un frontend React
# Il inclut un bucket S3 pour stocker les fichiers et un CloudFront pour la distribution rapide

# 1. Definition du provider AWS
provider "aws" {
  region = "us-east-1"  # Remplace par la region de ton choix
}

# 2. Creation du bucket S3 pour stocker les fichiers du frontend React
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "mon-bucket-react-frontend"  # Remplace par un nom unique
  acl    = "public-read"  # Rend les fichiers accessibles publiquement
}

# 3. Configuration du bucket S3 pour servir un site web
resource "aws_s3_bucket_website_configuration" "frontend_config" {
  bucket = aws_s3_bucket.frontend_bucket.id

  index_document {
    suffix = "index.html"  # Page principale du site
  }
}

# 4. Ajout d'une policy pour rendre le contenu accessible publiquement
resource "aws_s3_bucket_policy" "frontend_policy" {
  bucket = aws_s3_bucket.frontend_bucket.id
  policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::mon-bucket-react-frontend/*"
      }
    ]
  }
  POLICY
}

# 5. Creation d'une distribution CloudFront pour accelerer le chargement du site
resource "aws_cloudfront_distribution" "frontend_cdn" {
  origin {
    domain_name = aws_s3_bucket.frontend_bucket.bucket_regional_domain_name
    origin_id   = "S3-Origin"
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true  # Utilise le certificat SSL par defaut de CloudFront
  }
}

# 6. Affichage des URLs apres le deploiement
output "s3_website_url" {
  value = aws_s3_bucket_website_configuration.frontend_config.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.frontend_cdn.domain_name
}
