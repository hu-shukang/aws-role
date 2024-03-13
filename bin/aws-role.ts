#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaAccessRoleStack } from '../lib/lambda-access-role-stack';

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

new LambdaAccessRoleStack(app, 'LambdaAccessRoleStack', props);
