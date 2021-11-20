## CRM Online Motorbike Shop
An API for the customer management of an online motorbike shop.

### Prerequisites
- Install AWS CLI
  - https://docs.aws.amazon.com/es_es/cli/latest/userguide/install-cliv2.html
  - Run `aws configure` and add dummy values for *AWS Access Key ID* and *AWS Secret Access Key*. Write `eu-west-2` for *Default region name*.
- Install Docker
- Install AWS SAM CLI (for testing locally)
  - Creating an AWS Account is not needed, you can go directly to the last steps.
  - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

### Testing Locally
- Run the following command to create a docker network, run a local dynamodb container in it and create the DynamoDB tables
  ```
  sh initialize-docker-dynamodb.sh
  ```
- Compile TypeScript files
  ```
  npm run build
  ```
- Synthesize the CloudFormation template:
  ```
  npm run cdk:synth
  ```
- Use AWS SAM CLI for testing locally the resources of the CloudFormation template generated.
  - To invoke the lambda function locally (you can use a different event by replacing the file path after `-e`):
    ```
    sam local invoke crmMotorbikeShopApp -e tests/mocks/events/createCustomer/createCustomerValid.json --docker-network crm-motorbike-shop-network | jq
    ```
  - To debug the lambda function locally:
    - Run the following command:
      ```
      sam local invoke crmMotorbikeShopApp -e tests/mocks/events/createCustomer/createCustomerValid.json --debug-port 5858 --docker-network crm-motorbike-shop-network
      ```
    - Go to VSCode section __Run and Debug__ and select `Attach to SAM crmMotorbikeShopApp`
  - To create a local HTTP server that hosts all the lambda functions:
    ```
    sam local start-api --warm-containers EAGER --docker-network crm-motorbike-shop-network
    ```

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