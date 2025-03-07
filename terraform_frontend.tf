# Terraform script for deploying a React frontend on AWS (S3 + CloudFront)

# 1. Création du bucket S3 pour stocker les fichiers du frontend React
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "stratmind-frontend"  # Remplace par un nom unique
}

# 2. Suppression des ACLs publiques (AWS les bloque par défaut)
# Cette section a été supprimée pour éviter l'erreur AccessDenied

# 3. Configuration du bucket S3 pour servir un site web
resource "aws_s3_bucket_website_configuration" "frontend_config" {
  bucket = aws_s3_bucket.frontend_bucket.id

  index_document {
    suffix = "index.html"  # Page principale du site
  }
}

# 4. Suppression de la policy publique (AWS bloque les policies publiques par défaut)
# Cette section a été supprimée pour éviter l'erreur AccessDenied

# 5. Création d'une distribution CloudFront pour accélérer le chargement du site
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

  # Obligatoire : Restrictions pour CloudFront
  restrictions {
    geo_restriction {
      restriction_type = "none"  # Pas de restriction géographique
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true  # Utilise le certificat SSL par défaut de CloudFront
  }
}

# 6. Affichage des URLs après le déploiement
output "s3_website_url" {
  value = aws_s3_bucket_website_configuration.frontend_config.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.frontend_cdn.domain_name
}