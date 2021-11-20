import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { LambdaBaseController } from "../../infra/controllers/LambdaBaseController";
import { createCustomerConstraints } from "./CreateCustomerConstraints";

export class CreateCustomerController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2>{
    const body = event.body ? JSON.parse(event.body) : {};
    const { error, value } = createCustomerConstraints.validate(body);
    if (error) {
      return this.validationFailed(error.message);
    }
    return this.created(value);
  }
}
