export interface BuildConfig {
  readonly Environment: string;
  readonly Parameters: {
    DYNAMO_TABLE_NAME_CUSTOMER: string;
  };
}
