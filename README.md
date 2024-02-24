# digital_ocean_to_aws_eks


Pulling images directly from GitLab Container Registry to Kubectl proved elusive. The workaround involved a meticulous process:

1. Generate Base64 Encoded Credentials

echo -n "<User_name>:<token>" | base64

2. Create creds.json File

{
  "auths": {
    "registry.gitlab.com/mpsrc": {
      "auth": "<Output_Paste_Here>"
    }
  }
}

3. Base64 Encode creds.json

cat creds.json | base64

4. Update Kubernetes Secret using a registry-credentials.yml file

apiVersion: v1
kind: Secret
metadata:
  name: registry-credentials
  namespace: default
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <YOUR_KEY>

5. Then use registry-credentials in your deployment.yml file.

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

This step-by-step process ensured secure and authenticated access to the GitLab Container Registry, resolving the image-pulling challenges.