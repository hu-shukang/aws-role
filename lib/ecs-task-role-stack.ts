import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class ECSTaskRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ecsTaskPolicy = new iam.Policy(this, 'ECSTaskPolicy', {
      policyName: 'ECSTaskPolicy',
      statements: [
        new iam.PolicyStatement({
          actions: ['s3:GetObject', 's3:PutObject', 's3:ListBucket'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: ['dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:Query', 'dynamodb:Scan'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['logs:*', 'ssm:*', 'ssm:*', 'lambda:*', 'sns:*', 'dynamodb:*', 'kms:*', 'ses:*'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: ['cloudwatch:PutMetricData', 'logs:CreateLogStream', 'logs:PutLogEvents'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: ['sns:Publish'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: ['ses:SendEmail', 'ses:SendRawEmail'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: ['cognito-idp:*'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: ['ssm:GetParameters', 'ssm:GetParameter'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: ['secretsmanager:GetSecretValue'],
          resources: ['*'],
        }),
      ],
    });

    const ecsTaskRole = new iam.Role(this, 'ECSTaskRole', {
      roleName: 'ECSTaskRole',
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('lambda.amazonaws.com'),
        new iam.ServicePrincipal('apigateway.amazonaws.com'),
      ),
    });

    ecsTaskPolicy.attachToRole(ecsTaskRole);
  }
}
