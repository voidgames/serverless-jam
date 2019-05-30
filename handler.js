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
    "KeyConditionExpression":"person_id = :person_id",
    // 変数の値にインプットパラメータを代入
    "ExpressionAttributeValues": {
      ":person_id" : {"S": event.person_id}
    }
  };

  // クエリ実行
  dynamo.query(params, (err, data) => {
    console.log("dynamo_data:", data);
    console.log("dynamo_err:", err);
    context.done(null, data);
  });

};
