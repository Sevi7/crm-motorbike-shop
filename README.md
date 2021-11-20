## CRM Online Motorbike Shop
An API for the customer management of an online motorbike shop.

### Prerequisites
- Install AWS SAM CLI (for testing locally)
  - Creating an AWS Account is not needed, you can go directly to the last steps.
  - Installing Docker is needed for testing locally.
  - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

### Testing Locally
- Compile TypeScript files
  ```
  npm run build
  ```
- Synthesize the CloudFormation template:
  ```
  npm run cdk:synth
  ```
- Use AWS SAM CLI for testing locally the resources of the CloudFormation template generated.

### Deployment in AWS (not needed)
  - The first time you need to bootstrap your AWS environment
    ```
    npm run cdk bootstrap -- aws://ACCOUNT-NUMBER-1/REGION-1
    ```
  - Compile TypeScript files
    ```
    npm run build
    ```
  - Deploy the CDK App into the AWS environment
    ```
    npm run cdk:deploy
    ```