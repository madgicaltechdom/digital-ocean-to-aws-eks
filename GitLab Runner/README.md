# How to Deploy GitLab Runner on AWS EC2

In modern software development workflows, Continuous Integration (CI) and Continuous Deployment (CD) play a vital role in ensuring code quality, streamlining development processes, and enabling faster time-to-market. At the heart of these practices lies GitLab Runner, a crucial component within the GitLab DevOps platform. GitLab Runner automates the execution of CI/CD pipelines defined in GitLab CI/CD configuration files (.gitlab-ci.yml), enabling developers to automate tasks, run tests, and deploy applications seamlessly.

By integrating GitLab Runner with AWS EC2 instances, developers can harness the scalability and reliability of AWS infrastructure for their CI/CD pipelines, ensuring efficient and reliable software delivery. In this step-by-step guide, we'll explore how to set up GitLab Runner on an AWS EC2 instance, empowering you to streamline your development workflows and maximize the potential of CI/CD practices.

## Prerequisites

Before we start, make sure you have the following:

- An AWS account with permissions to create EC2 instances.
- Basic knowledge of GitLab and CI/CD concepts.
- GitLab repository with a .gitlab-ci.yml file defining your CI/CD pipelines and a Dockerfile.
- GitLab Runner registration token:
    1. For repository: Go to your repository then go to the settings click on the CI/CD then in the Runners click on the "Expand" button then click on the three dots beside the "New project runner" button.
    2. For Group: Go to your GitLab group then go to the Build click on the Runner then click on the three dots beside the "New group runner" button.
- AWS configured on your local system.

## Step:1 Launch an EC2 Instance

1. Log in to your AWS Management Console.

2. Navigate to the EC2 Dashboard and click on "Launch Instance."

3. Choose an Amazon Machine Image (AMI) based on your preference (e.g., Ubuntu and Amazon Linux, I am using Amazon Linux 2 AMI).

4. Select an instance type based on your workload requirements.

5. Configure instance details like network settings, storage, and security groups.

6. Review and launch the instance.

7. In the EC2 Dashboard, locate the "Elastic IPs" option in the navigation pane on the left side.

8. Click on "Elastic IPs" to view the list of existing EIPs.

9. Click on the "Allocate new address" button located at the top of the page.

10. In the Allocate Elastic IP address dialog box, you can choose whether to allocate an Amazon IP or bring your IP. Select the appropriate option and click on "Allocate."

## Step 2: Connect to the EC2 Instance

- Through Terminal:
    1. Once the instance is launched, note its Elastic IP address.

    2. Connect to the instance using SSH. Open your terminal and run:
    ```
    ssh -i <path_to_key_pair_file> ec2-user@<instance_elastic_ip> 
    ```
    3. Replace <path_to_key_pair_file> with the path to your key pair file and <instance_elastic_ip> with the elastic IP address of your EC2 instance.

- Through Console:
    1. Once the instance is launched, select it and click on the "Connect" button.

    2. It will automatically take the "User name" so again click on the "Connect" button.

## Step 3: Install GitLab Runner

1. Update the package dependencies:
```
sudo yum -y update
```
2. Install Git:
```
sudo yum install -y git
```
3. Install Docker:
```
sudo amazon-linux-extras install -y docker
```
4. Add the "ec2-user user" to the docker group:
```
sudo usermod -aG docker ec2-user
```
5. Ensure the Docker daemon starts automatically:
```
sudo systemctl enable docker
```
6. Restart your EC2 instance:
```
sudo reboot
```
7. Test the Docker is installed and running properly:
```
docker run hello-world
```
8. Download the GitLab Runner installation package:
```
curl -LJO "https://gitlab-runner-downloads.s3.amazonaws.com/latest/rpm/gitlab-runner_adm64.rpm"
```
9. Install the GitLab Runner: 
```
sudo rpm -i gitlab-runner_amd64.rpm
```
10. Register the GitLab Runner:
```
sudo gitlab-runner register
```
11. Provide the GitLab URL: 
```
https://gitlab.com/
```
12. Provide the registration token.

13. Enter the description for the runner.

14. Press Enter.

15. Press Enter.

16. Provide the executor(I am using docker).

17. Provide the default Docker image(I am using alpine).

18. Check the runner status:
```
sudo gitlab-runner status
```
19. Go to your GitLab runner page and refresh it, the runner will be shown there.

## Step 4: Configure and Start GitLab Runner

1. After registration, the GitLab Runner configuration will be stored in /etc/gitlab-runner/config.toml.

2. Edit the configuration file and make privileged true:
```
sudo vi /etc/gitlab-runner/config.toml
```
3. Restart the GitLab Runner service:
```
sudo gitlab-runner restart
```
4. Verify the status of the GitLab Runner service:
```
sudo gitlab-runner status
```

## Step 5: Test the GitLab Runner

1. Go to your GitLab project and trigger a pipeline manually or push a commit to trigger the pipeline automatically.

2. Monitor the pipeline execution logs to ensure that the GitLab Runner on AWS EC2 is successfully executing jobs.

## Conclusion

Congratulations! You have successfully set up Runner on an AWS EC2 instance. By integrating GitLab CI/CD with AWS, you can automate your software development workflows and achieve faster and more reliable deployments. Experiment with different pipeline configurations and explore advanced features to enhance your CI/CD process further. You can refer to the video which I have given in reference.

## References

- [Configure GitLab CI Runner with Docker executor using AWS EC2](https://www.youtube.com/watch?v=HGJWMTNeYqI).

## License

This project is licensed under the MIT License.