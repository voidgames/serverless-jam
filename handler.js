'use strict';

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB({
    region: 'ap-northeast-1'
});

module.exports.hello = (event, context) => {

  const params = {
    // テーブル名
    "TableName": "sls_person",
    // 条件式（カラム名＝:変数）
    "KeyConditionExpression":"person_id = :personId",
    // 変数の値にインプットパラメータを代入
    "ExpressionAttributeValues": {
      ":personId" : {"S": event.personId}
    }
  };

  // クエリ実行
  dynamo.query(params, (err, data) => {
    console.log("dynamo_data:", data);
    console.log("dynamo_err:", err);
    context.done(null, data);
  });

};
