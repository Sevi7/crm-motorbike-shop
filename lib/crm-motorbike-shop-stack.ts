import { Construct, Stack, StackProps, Duration } from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';

export default class CrmMotorbikeShopStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new Function(this, 'crmMotorbikeShopApp', {
      functionName: 'crmMotorbikeShopApp',
      handler: 'index.lambdaHandler',
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('dist/src'),
      timeout: Duration.seconds(5),
      environment: {},
    });
  }
}
