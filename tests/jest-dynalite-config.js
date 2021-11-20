module.exports = {
  tables: [
    {
      TableName: process.env.DYNAMO_TABLE_NAME_CUSTOMER,
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    },
  ],
  basePort: 8000,
};
