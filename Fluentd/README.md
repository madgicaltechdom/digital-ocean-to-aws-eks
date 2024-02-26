# Fluentd Configuration for Container Log Management

This repository contains the configuration files and setup instructions for configuring Fluentd to manage container logs effectively. Fluentd is used to ship logs from containers to ElasticSearch for storage and analysis.

## Prerequisites

- Kubernetes cluster
- Fluentd installed in the Kubernetes cluster
- Access to ElasticSearch for log storage and analysis

## Setup Instructions

1. Update the fluent.conf part with your specific configurations as needed.

2. Apply the Fluentd configuration to your Kubernetes cluster using the fluent-configmap.yml file.
```
kubectl apply -f fluent-configmap.yml
```

3. Ensure that Fluentd is running and collecting logs from containers.

4. Verify that logs are being shipped to ElasticSearch for storage and analysis.

## License

This project is licensed under the MIT License.