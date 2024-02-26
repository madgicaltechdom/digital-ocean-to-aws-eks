# How to Use GitLab Container Registry in Amazon EKS

In today's fast-paced software development landscape, leveraging containerization technologies like Docker and Kubernetes has become indispensable for building scalable and flexible applications. Amazon Elastic Kubernetes Service (EKS) offers a managed Kubernetes service that simplifies the deployment, management, and scaling of containerized applications on AWS. Meanwhile, GitLab Container Registry provides a convenient and integrated solution for storing, managing, and distributing Docker container images within the GitLab ecosystem.

In this repo, we'll explore how to effectively utilize GitLab Container Registry in conjunction with Amazon EKS. We'll delve into the background of both technologies, provide a step-by-step guide on integration, present a case study highlighting real-world use cases, and conclude with key takeaways and references.

## Prerequisites

- [GitLab Container Registry Image](https://docs.gitlab.com/ee/user/packages/container_registry/build_and_push_images.html) in your GitLab project with Dockerfile.

## Steps to set up the GitLab Container Registry  credentials

Pulling images directly from GitLab Container Registry to Kubectl proved elusive. The workaround involved a meticulous process:

1. Generate Base64 Encoded Credentials

```
echo -n "<GitLab_User_Name>:<GitLab_Access_Token>" | base64
```

2. Copy creds.json file in your system and replace the "Step-1_Output_Paste_Here" keyword with the step-1 output.

```
{
  "auths": {
    "registry.gitlab.com/mpsrc": {
      "auth": "<Step-1_Output_Paste_Here>"
    }
  }
}
```

3. Encode the creds.json file to Base64 by running the below command: 

```
cat creds.json | base64
```

4. Update Kubernetes Secret using a registry-credentials.yml file. So copy the registry-credentials.yml file in your system and replace the "YOUR_BASE64_KEY" keyword with the step-3 output.

```
apiVersion: v1
kind: Secret
metadata:
  name: registry-credentials
  namespace: default
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <YOUR_BASE64_KEY>
```

5. Then use registry-credentials in your deployment.yml file.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <app-name>
spec:
  replicas: 1
  selector:
    matchLabels:
      app: <app-name>
  template:
    metadata:
      labels:
        app: <app-name>
    spec:
      containers:
        - name: <app-name>
          image: <image-path>
          imagePullPolicy: Always
          ports:
          - containerPort: 80
      imagePullSecrets:
        - name: registry-credentials
```

This step-by-step process ensured secure and authenticated access to the GitLab Container Registry, resolving the image-pulling challenges.

## Conclusion

In conclusion, integrating GitLab Container Registry with Amazon EKS offers numerous benefits for developers and DevOps teams. By centralizing container image management within the GitLab ecosystem and leveraging the power of Amazon EKS for Kubernetes deployment, organizations can streamline their development workflow, improve collaboration, and accelerate time-to-market. 

By following the steps outlined in this readme file and embracing a container-native approach, teams can unlock the full potential of modern application development on AWS.

Thank you for Reading !! 🙌🏻😁📃, see you in the next blog.🤘

The end ✌🏻

## License

This project is licensed under the MIT License.
