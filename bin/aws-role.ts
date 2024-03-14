#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaAccessRoleStack } from '../lib/lambda-access-role-stack';
import { ECSTaskRoleStack } from '../lib/ecs-task-role-stack';
import { ECSExecutionTaskRole } from '../lib/ecs-execution-task-role-stack';
import { CodePipelineRoleStack } from '../lib/codepipeline-role-stack';
import { DevAccessRoleStack } from '../lib/dev-access-role-stack';
import { DevUserGroupStack } from '../lib/dev-user-group-stack';
import { AdminUserGroupStack } from '../lib/admin-user-group-stack';
import { S3Stack } from '../lib/s3-stack';

declare module 'aws-cdk-lib' {
  interface Environment {
    appName: string;
    env: string;
  }
}

const app = new cdk.App({
  defaultStackSynthesizer: new cdk.CliCredentialsStackSynthesizer({
    fileAssetsBucketName: 'hsk-cdk',
    bucketPrefix: 'aws-role',
    qualifier: 'aws-role',
  }),
});

const env = app.node.tryGetContext('env') as string;

const props: cdk.StackProps = {
  env: { account: '471112651100', region: 'ap-northeast-1', appName: 'tanso', env: env },
};

new CodePipelineRoleStack(app, 'CodePipelineRoleStack', props);
new LambdaAccessRoleStack(app, 'LambdaAccessRoleStack', props);
new ECSTaskRoleStack(app, 'ECSTaskRoleStack', props);
new ECSExecutionTaskRole(app, 'ECSExecutionTaskRole', props);
new DevAccessRoleStack(app, 'DevAccessRoleStack', props);
new AdminUserGroupStack(app, 'AdminUserGroupStack', props);
new DevUserGroupStack(app, 'DevUserGroupStack', props);
new S3Stack(app, `S3Stack-${env}`, props);
