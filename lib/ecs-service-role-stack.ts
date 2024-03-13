import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class ECSServiceRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ecsServiceRole = new iam.Role(this, 'ECSServiceRole', {
      assumedBy: new iam.ServicePrincipal('ecs.amazonaws.com'),
    });

    ecsServiceRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2ContainerServiceRole'),
    );

    ecsServiceRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'application-autoscaling:*',
          'ecs:DescribeServices',
          'ecs:UpdateService',
          'cloudwatch:DescribeAlarms',
          'cloudwatch:PutMetricAlarm',
          'cloudwatch:DeleteAlarms',
          'cloudwatch:DescribeAlarmHistory',
          'cloudwatch:DescribeAlarms',
          'cloudwatch:DescribeAlarmsForMetric',
          'cloudwatch:GetMetricStatistics',
          'cloudwatch:ListMetrics',
          'cloudwatch:PutMetricAlarm',
          'cloudwatch:DisableAlarmActions',
          'cloudwatch:EnableAlarmActions',
          'iam:CreateServiceLinkedRole',
          'sns:CreateTopic',
          'sns:Subscribe',
          'sns:Get*',
          'sns:List*',
        ],
        resources: ['*'],
      }),
    );
  }
}
