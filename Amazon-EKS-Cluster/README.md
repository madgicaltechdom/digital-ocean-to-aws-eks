# Amazon EKS Cluster
This repository contains source code to provision an EKS cluster in AWS using Terraform. 

## Prerequisites
* AWS account
* AWS profile configured with CLI on the local machine
* [Terraform](https://www.terraform.io/)
* [kubectl](https://kubernetes.io/docs/tasks/tools/)

## Project Structure

```
├── README.md
├── eks
|  ├── cluster.tf
|  ├── cluster_role.tf
|  ├── cluster_sg.tf
|  ├── node_group.tf
|  ├── node_group_role.tf
|  ├── node_sg.tf
|  └── vars.tf
├── main.tf
├── provider.tf
├── raw-manifests
|  ├── aws-auth.yaml
|  ├── pod.yaml
|  └── service.yaml
├── variables.tf
└── vpc
   ├── control_plane_sg.tf
   ├── data_plane_sg.tf
   ├── nat_gw.tf
   ├── output.tf
   ├── public_sg.tf
   ├── vars.tf
   └── vpc.tf
```

## Steps for Installation

Step-by-step user guide [video](https://drive.google.com/file/d/1VcMmWo1f4a_gU6AMMkk_2d6yIYt76Qu8/view?usp=sharing).

1. Run the below command to clone this repo:

```
git clone https://github.com/madgicaltechdom/amazon-eks-cluster.git
```

2. Modify the variables in the variables.tf, vpc/vars.tf, and eks/vars.tf files like region, availability_zones, instance_types, etc. Also replace the YOUR_S3_BUCKET_NAME keyword from your S3 bucket name in the Provider.tf file.

## Remote Backend State Configuration
To configure the remote backend state for your infrastructure, create an S3 bucket and DynamoDB table before running *terraform init*. In the case that you want to use local state persistence, update the *provider.tf* accordingly(like bucket name, bucket region, and dynamodb table name), and don't bother with creating an S3 bucket and DynamoDB table. 

### Create S3 Bucket for State Backend
```aws s3api create-bucket --bucket <bucket-name> --region <region> --create-bucket-configuration LocationConstraint=<region>```

### Create a DynamoDB table for State Locking
```aws dynamodb create-table --table-name <table-name> --attribute-definitions AttributeName=LockID,AttributeType=S --key-schema AttributeName=LockID,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1```

NOTE: If you don't want to configure the remote backend state for your infrastructure then don't create the S3 bucket and DynamoDB table. Simply open the provider.tf file and remove the backend block code.

## Provision Infrastructure
Review the *main.tf* to update the node size configurations (i.e. desired, maximum, and minimum). When you're ready, run the following commands:

1. `terraform init` - Initialize the project, set up the state persistence (whether local or remote), and download the API plugins.
2. `terraform plan` - Print the plan of the desired state without changing the state.
3. `terraform apply` - Print the desired state of infrastructure changes with the option to execute the plan and provision. 

## Connect To Cluster
Using the same AWS account profile that provisioned the infrastructure, you can connect to your cluster by updating your local kube config with the following command:
`aws eks --region <aws-region> update-kubeconfig --name <cluster-name>`

## Reference

   - [Automate Deployments to Amazon EKS with Skaffold and GitHub Actions](https://www.suse.com/c/rancher_blog/automate-deployments-to-amazon-eks-with-skaffold-and-github-actions/)
