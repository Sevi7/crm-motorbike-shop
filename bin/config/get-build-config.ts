/* eslint-disable @typescript-eslint/dot-notation */
import { App } from '@aws-cdk/core';
import { BuildConfig } from './BuildConfig';

export default function getConfig(app: App, env: string): BuildConfig {
  const unparsedEnv = app.node.tryGetContext(env);

  const buildConfig: BuildConfig = {
    Environment: unparsedEnv.Environment,
    Parameters: {
      DYNAMO_TABLE_NAME_CUSTOMER: unparsedEnv.Parameters['DYNAMO_TABLE_NAME_CUSTOMER'],
    },
  };

  return buildConfig;
}
