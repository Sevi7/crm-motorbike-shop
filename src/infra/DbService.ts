export abstract class DbService {
  abstract get(params: any): Promise<any>;
  abstract put(params: any): Promise<any>;
  abstract update(params: any): Promise<any>;
  abstract delete(params: any): Promise<any>;
}
