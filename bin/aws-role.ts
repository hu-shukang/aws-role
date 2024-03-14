#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaAccessRoleStack } from '../lib/lambda-access-role-stack';
import { ECSTaskRoleStack } from '../lib/ecs-task-role-stack';
import { ECSExecutionTaskRole } from '../lib/ecs-execution-task-role-stack';
import { CodePipelineRoleStack } from '../lib/codepipeline-role-stack';
import { DevAccessRoleStack } from '../lib/dev-access-role-stack';

const app = new cdk.App({
  defaultStackSynthesizer: new cdk.CliCredentialsStackSynthesizer({
    fileAssetsBucketName: 'hsk-cdk',
    bucketPrefix: 'aws-role',
    qualifier: 'aws-role',
  }),
});

const props = {
  env: { account: '471112651100', region: 'ap-northeast-1' },
};

new CodePipelineRoleStack(app, 'CodePipelineRoleStack', props);
new LambdaAccessRoleStack(app, 'LambdaAccessRoleStack', props);
new ECSTaskRoleStack(app, 'ECSTaskRoleStack', props);
new ECSExecutionTaskRole(app, 'ECSExecutionTaskRole', props);
new DevAccessRoleStack(app, 'DevAccessRoleStack', props);
