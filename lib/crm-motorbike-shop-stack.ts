import { Construct, Stack, StackProps, Duration } from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { BuildConfig } from '../bin/config/BuildConfig';

export default class CrmMotorbikeShopStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    const customerTable = new Table(this, 'customerTable', {
      tableName: buildConfig.Parameters.DYNAMO_TABLE_NAME_CUSTOMER,
      partitionKey: { name: 'id', type: AttributeType.STRING },
    });

    const crmMotorbikeShopAppLambda = new Function(this, 'crmMotorbikeShopApp', {
      functionName: 'crmMotorbikeShopApp',
      handler: 'index.lambdaHandler',
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('dist/src'),
      timeout: Duration.seconds(5),
      environment: {
        DYNAMO_TABLE_NAME_CUSTOMER: buildConfig.Parameters.DYNAMO_TABLE_NAME_CUSTOMER,
      },
    });

    customerTable.grantReadWriteData(crmMotorbikeShopAppLambda);
  }
}
