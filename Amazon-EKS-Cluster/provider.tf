provider "aws" {
  region = var.region
  profile = var.profile
}

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket = "<YOUR_S3_BUCKET_NAME>"
    key = "euw1-aws-eks-cluster/terraform.tfstate"
    region = "ap-south-1"
    encrypt = true
  }
}