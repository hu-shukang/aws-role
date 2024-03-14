import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class ECSTaskRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const account = props?.env?.account as string;
    const region = props?.env?.region as string;

    const ecsTaskPolicy = new iam.Policy(this, 'ECSTaskPolicy', {
      policyName: 'ECSTaskPolicy',
      statements: [
        new iam.PolicyStatement({
          actions: [
            'ec2:Describe*',
            's3:GetObject',
            's3:PutObject',
            's3:ListBucket',
            's3:PutStorageLensConfiguration',
            's3:CreateJob',
            'elasticloadbalancing:RegisterTargets',
            'elasticloadbalancing:Describe*',
            'elasticloadbalancing:DeregisterTargets',
            'cloudwatch:PutMetricData',
            'cloudwatch:Describe*',
            'cloudwatch:GetMetricStatistics',
            'cloudwatch:ListMetrics',
            'autoscaling:Describe*',
            'logs:DescribeQueries',
            'logs:DescribeLogGroups',
            'logs:DescribeAccountPolicies',
            'logs:StopQuery',
            'logs:TestMetricFilter',
            'logs:DeleteQueryDefinition',
            'logs:PutQueryDefinition',
            'logs:PutAccountPolicy',
            'logs:GetLogDelivery',
            'logs:ListLogDeliveries',
            'logs:DeleteAccountPolicy',
            'logs:Link',
            'logs:CreateLogDelivery',
            'logs:DeleteResourcePolicy',
            'logs:PutResourcePolicy',
            'logs:DescribeExportTasks',
            'logs:StartLiveTail',
            'logs:UpdateLogDelivery',
            'logs:StopLiveTail',
            'logs:CancelExportTask',
            'logs:DeleteLogDelivery',
            'logs:DescribeQueryDefinitions',
            'logs:DescribeResourcePolicies',
            'logs:DescribeDestinations',
            'ssm:DescribeParameters',
            'sns:ListTopics',
            'sns:Unsubscribe',
            'sns:DeleteEndpoint',
            'sns:SetEndpointAttributes',
            'sns:GetEndpointAttributes',
            'sns:SetSubscriptionAttributes',
            'sns:SetSMSAttributes',
            'sns:GetSubscriptionAttributes',
            'sns:ListSubscriptions',
            'tag:GetResources',
            'dynamodb:ListContributorInsights',
            'dynamodb:DescribeReservedCapacityOfferings',
            'dynamodb:ListGlobalTables',
            'dynamodb:ListTables',
            'dynamodb:DescribeReservedCapacity',
            'dynamodb:ListBackups',
            'dynamodb:PurchaseReservedCapacityOfferings',
            'dynamodb:ListImports',
            'dynamodb:DescribeLimits',
            'dynamodb:DescribeEndpoints',
            'dynamodb:ListExports',
            'dynamodb:ListStreams',
            'cognito-idp:ForgotPassword',
            'cognito-idp:GlobalSignOut',
            'cognito-idp:ConfirmSignUp',
            'cognito-idp:CreateUserPool',
            'cognito-idp:ForgetDevice',
            'cognito-idp:RevokeToken',
            'cognito-idp:GetUserAttributeVerificationCode',
            'cognito-idp:InitiateAuth',
            'cognito-idp:DeleteUser',
            'cognito-idp:SetUserMFAPreference',
            'cognito-idp:GetUser',
            'cognito-idp:ConfirmForgotPassword',
            'cognito-idp:SetUserSettings',
            'cognito-idp:SignUp',
            'cognito-idp:VerifyUserAttribute',
            'cognito-idp:ListDevices',
            'cognito-idp:ListUserPools',
            'cognito-idp:AssociateSoftwareToken',
            'cognito-idp:VerifySoftwareToken',
            'cognito-idp:GetDevice',
            'cognito-idp:RespondToAuthChallenge',
            'cognito-idp:DeleteUserAttributes',
            'cognito-idp:UpdateUserAttributes',
            'cognito-idp:DescribeUserPoolDomain',
            'cognito-idp:UpdateDeviceStatus',
            'cognito-idp:ChangePassword',
            'cognito-idp:ConfirmDevice',
            'cognito-idp:ResendConfirmationCode',
            'secretsmanager:GetSecretValue',
            'kms:DescribeCustomKeyStores',
            'kms:ListKeys',
            'kms:GenerateRandom',
            'kms:UpdateCustomKeyStore',
            'kms:ListAliases',
            'kms:DisconnectCustomKeyStore',
            'kms:ConnectCustomKeyStore',
          ],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: [
            'elasticloadbalancing:DeregisterInstancesFromLoadBalancer',
            'elasticloadbalancing:RegisterInstancesWithLoadBalancer',
          ],
          resources: [`arn:aws:elasticloadbalancing:${region}:${account}:loadbalancer/*`],
        }),
        new iam.PolicyStatement({
          actions: ['s3:ListAccessGrants', 's3:GetBucketLocation'],
          resources: [`arn:aws:s3:${region}:${account}:access-grants/default`, 'arn:aws:s3:::*'],
        }),
        new iam.PolicyStatement({
          actions: [
            's3:DeleteStorageLensConfigurationTagging',
            's3:PutBucketOwnershipControls',
            's3:PutStorageLensConfigurationTagging',
            's3:PutJobTagging',
            's3:Get*',
            's3:UpdateJobStatus',
            's3:DescribeMultiRegionAccessPointOperation',
            's3:DeleteJobTagging',
            's3:PutBucketRequestPayment',
            's3:DescribeJob',
            's3:PutBucketTagging',
            's3:PutBucketLogging',
            's3:UpdateJobPriority',
            's3:PutBucketObjectLockConfiguration',
            's3:PutBucketVersioning',
            's3:DeleteObjectTagging',
            's3:DeleteObjectVersion',
            's3:ReplicateTags',
            's3:RestoreObject',
            's3:PutObjectVersionTagging',
            's3:DeleteObjectVersionTagging',
            's3:PutObjectLegalHold',
            's3:ReplicateObject',
            's3:PutObject',
            's3:AbortMultipartUpload',
            's3:PutObjectRetention',
            's3:PutObjectTagging',
            's3:DeleteObject',
            's3:ReplicateDelete',
          ],
          resources: [
            'arn:aws:s3:::*web*',
            'arn:aws:s3:::*web*/*',
            'arn:aws:s3:::*work*',
            'arn:aws:s3:::*work*/*',
            'arn:aws:s3:::*log*',
            'arn:aws:s3:::*log*/*',
            'arn:aws:s3:::*unyo*',
            'arn:aws:s3:::*unyo*/*',
            'arn:aws:s3:::*deploy*',
            'arn:aws:s3:::*deploy*/*',
            'arn:aws:s3:::*contents*',
            'arn:aws:s3:::*contents*/*',
          ],
        }),
        new iam.PolicyStatement({
          actions: ['cloudwatch:PutMetricStream', 'cloudwatch:PutMetricAlarm'],
          resources: [
            `arn:aws:cloudwatch:${region}:${account}:alarm:*`,
            `arn:aws:cloudwatch:${region}:${account}:metric-stream/*`,
          ],
        }),
        new iam.PolicyStatement({
          actions: [
            'autoscaling:AttachLoadBalancers',
            'autoscaling:EnableMetricsCollection',
            'autoscaling:ResumeProcesses',
            'autoscaling:PutLifecycleHook',
            'autoscaling:SuspendProcesses',
            'autoscaling:PutScheduledUpdateGroupAction',
            'autoscaling:CompleteLifecycleAction',
            'autoscaling:PutScalingPolicy',
            'autoscaling:UpdateAutoScalingGroup',
            'autoscaling:DeleteAutoScalingGroup',
            'autoscaling:DeleteLifecycleHook',
            'autoscaling:CreateAutoScalingGroup',
            'autoscaling:PutNotificationConfiguration',
            'autoscaling:RecordLifecycleActionHeartbeat',
          ],
          resources: [`arn:aws:autoscaling:${region}:${account}:autoScalingGroup:*`],
        }),
        new iam.PolicyStatement({
          actions: [
            'logs:CreateLogStream',
            'logs:PutDestinationPolicy',
            'logs:GetLogEvents',
            'logs:UntagResource',
            'logs:DeleteDestination',
            'logs:PutSubscriptionFilter',
            'logs:TagResource',
            'logs:PutDestination',
            'logs:DeleteLogStream',
            'logs:PutLogEvents',
            'logs:ListTagsForResource',
            'logs:ListTagsLogGroup',
            'logs:GetDataProtectionPolicy',
            'logs:GetLogRecord',
            'logs:DeleteDataProtectionPolicy',
            'logs:DeleteSubscriptionFilter',
            'logs:DescribeLogStreams',
            'logs:DescribeSubscriptionFilters',
            'logs:StartQuery',
            'logs:DescribeMetricFilters',
            'logs:CreateExportTask',
            'logs:DeleteMetricFilter',
            'logs:TagLogGroup',
            'logs:DeleteRetentionPolicy',
            'logs:AssociateKmsKey',
            'logs:FilterLogEvents',
            'logs:DisassociateKmsKey',
            'logs:PutDataProtectionPolicy',
            'logs:UntagLogGroup',
            'logs:DeleteLogGroup',
            'logs:Unmask',
            'logs:UntagResource',
            'logs:TagResource',
            'logs:CreateLogGroup',
            'logs:ListTagsForResource',
            'logs:PutMetricFilter',
            'logs:GetQueryResults',
            'logs:PutSubscriptionFilter',
            'logs:PutRetentionPolicy',
            'logs:GetLogGroupFields',
          ],
          resources: [
            `arn:aws:logs:${region}:${account}:log-group:*`,
            `arn:aws:logs:${region}:${account}:log-group:*:log-stream:*`,
            `arn:aws:logs:${region}:${account}:anomaly-detector:*`,
            `arn:aws:logs:${region}:${account}:delivery:*`,
            `arn:aws:logs:${region}:${account}:delivery-source:*`,
            `arn:aws:logs:${region}:${account}:destination:*`,
            `arn:aws:logs:${region}:${account}:delivery-destination:*`,
          ],
        }),
        new iam.PolicyStatement({
          actions: [
            'ssm:PutParameter',
            'ssm:LabelParameterVersion',
            'ssm:DeleteParameter',
            'ssm:UnlabelParameterVersion',
            'ssm:GetParameterHistory',
            'ssm:GetParametersByPath',
            'ssm:GetParameters',
            'ssm:GetParameter',
            'ssm:DeleteParameters',
          ],
          resources: [`arn:aws:ssm:${region}:${account}:parameter/*`],
        }),
        new iam.PolicyStatement({
          actions: [
            'sns:ListSubscriptionsByTopic',
            'sns:Publish',
            'sns:GetTopicAttributes',
            'sns:DeleteTopic',
            'sns:CreateTopic',
            'sns:SetTopicAttributes',
            'sns:Subscribe',
            'sns:ConfirmSubscription',
            'sns:AddPermission',
            'sns:RemovePermission',
          ],
          resources: [`arn:aws:sns:${region}:${account}:*`],
        }),
        new iam.PolicyStatement({
          actions: ['rds:DescribeDBInstances'],
          resources: [`arn:aws:rds:${region}:${account}:db:*`],
        }),
        new iam.PolicyStatement({
          actions: ['dynamodb:*'],
          resources: [
            `arn:aws:dynamodb:${region}:${account}:table/*`,
            `arn:aws:dynamodb:${region}:${account}:table/*/stream/*`,
            `arn:aws:dynamodb:${region}:${account}:table/*/export/*`,
            `arn:aws:dynamodb:${region}:${account}:table/*/backup/*`,
            `arn:aws:dynamodb:${region}:${account}:table/*/index/*`,
            `arn:aws:dynamodb:${region}:${account}:table/*/import/*`,
            `arn:aws:dynamodb::${account}:global-table/*`,
          ],
        }),
        new iam.PolicyStatement({
          actions: ['lambda:InvokeFunction'],
          resources: [`arn:aws:lambda:${region}:${account}f:function:*`],
        }),
        new iam.PolicyStatement({
          actions: [
            'ses:SendEmail',
            'ses:UpdateEmailTemplate',
            'ses:GetEmailTemplate',
            'ses:CreateEmailTemplate',
            'ses:SendBulkEmail',
            'ses:DeleteEmailTemplate',
          ],
          resources: [
            `arn:aws:ses:${region}:${account}:template/*`,
            `arn:aws:ses:${region}:${account}:configuration-set/*`,
            `arn:aws:ses:${region}:${account}:identity/*`,
          ],
        }),
        new iam.PolicyStatement({
          actions: ['cognito-idp:*'],
          resources: [
            `arn:aws:wafv2:${region}:${account}:*/webacl/*/*`,
            `arn:aws:cognito-idp:${region}:${account}:userpool/*`,
          ],
        }),
        new iam.PolicyStatement({
          actions: [
            'kms:EnableKey',
            'kms:GetPublicKey',
            'kms:ImportKeyMaterial',
            'kms:Decrypt',
            'kms:UntagResource',
            'kms:PutKeyPolicy',
            'kms:GenerateDataKeyWithoutPlaintext',
            'kms:Verify',
            'kms:ListResourceTags',
            'kms:ReplicateKey',
            'kms:GenerateDataKeyPair',
            'kms:SynchronizeMultiRegionKey',
            'kms:GenerateMac',
            'kms:TagResource',
            'kms:UpdatePrimaryRegion',
            'kms:Encrypt',
            'kms:GetKeyRotationStatus',
            'kms:ReEncryptTo',
            'kms:DescribeKey',
            'kms:Sign',
            'kms:EnableKeyRotation',
            'kms:ListKeyPolicies',
            'kms:UpdateKeyDescription',
            'kms:GetKeyPolicy',
            'kms:GenerateDataKeyPairWithoutPlaintext',
            'kms:ReEncryptFrom',
            'kms:RetireGrant',
            'kms:ListGrants',
            'kms:VerifyMac',
            'kms:UpdateAlias',
            'kms:RevokeGrant',
            'kms:GenerateDataKey',
          ],
          resources: [`arn:aws:kms:${region}:${account}:alias/*`, `arn:aws:kms:${region}:${account}:key/*`],
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