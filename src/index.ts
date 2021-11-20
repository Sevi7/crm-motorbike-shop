import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { AppController } from './rest/AppController';

export const lambdaHandler = async (event: APIGatewayProxyEventV2) : Promise<APIGatewayProxyResultV2> => {
  return new AppController().run(event);
}