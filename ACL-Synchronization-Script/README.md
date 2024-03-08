# Document for ACL Synchronization Script

This document provides an overview and usage guide for a script designed to synchronize Access Control Lists (ACLs) between DigitalOcean Spaces and AWS S3 buckets. The script allows users to copy the ACL settings from objects in a DigitalOcean Spaces bucket to corresponding objects in an AWS S3 bucket.

## Prerequisites

- Basic understanding of JavaScript and Node.js programming.
- Access to DigitalOcean Spaces and AWS accounts with appropriate permissions to access and modify bucket ACLs.
- AWS SDK for JavaScript installed (aws-sdk package).

## Script Overview

The script utilizes the AWS SDK for JavaScript to interact with DigitalOcean Spaces and AWS S3. It performs the following tasks:
1. Sets up AWS S3 clients for DigitalOcean Spaces (doS3) and AWS S3 (awsS3).
2. Defines a function (checkAndUpdateACL) to:
    - List objects in the DigitalOcean Spaces bucket with the specified prefix.
    - Iterate through each object and check its ACL.
    - Update the ACL of the corresponding object in the AWS S3 bucket to match the ACL obtained from DigitalOcean Spaces.
3. Defines helper functions (checkObjectACL and updateObjectACL) to respectively check the ACL of an object in DigitalOcean Spaces and update the ACL of an object in AWS S3.
4. Calls the checkAndUpdateACL() function to initiate the ACL synchronization process.

## Script Configuration 

Before running the script, users need to replace the placeholder values in the script with their actual credentials and bucket details:

- DO_ACCESS_KEY: DigitalOcean Spaces access key.
- DO_SECRET_KEY: DigitalOcean Spaces secret key.
- AWS_ACCESS_KEY: AWS access key.
- AWS_SECRET_KEY: AWS secret key.
- DO_SPACES_ENDPOINT: DigitalOcean Spaces endpoint.
- DO_REGION: DigitalOcean region.
- AWS_REGION: AWS region.
- DO_BUCKET_NAME: DigitalOcean Spaces bucket name.
- AWS_BUCKET_NAME: AWS S3 bucket name.
- DO_SPACES_DRIVE: Prefix of the objects in the DigitalOcean Spaces bucket to be synchronized.

## Running the Script

1. Ensure that Node.js is installed on your system.
2. Install the required AWS SDK for the JavaScript package (aws-sdk) if not already installed.
3. Save the script to a file (e.g., acl_sync_script.js).
4. Open a terminal or command prompt.
5. Navigate to the directory containing the script file.
6. Run the script using the command: node acl_sync_script.js.


## Conclusion 

This script provides a convenient way to synchronize ACL settings between DigitalOcean Spaces and AWS S3 buckets, ensuring consistent access control across different cloud storage services. By following the provided instructions and configuring the script with appropriate credentials and bucket details, users can efficiently manage ACLs for their objects stored in these cloud storage platforms.