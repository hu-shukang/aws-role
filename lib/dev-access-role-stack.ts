import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class DevAccessRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const devAccessRole = new iam.Role(this, 'DevAccessRole', {
      roleName: 'DevAccessRole',
      assumedBy: new iam.AccountRootPrincipal(),
    });

    // 附加 AWSSupportAccess 托管策略
    devAccessRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSSupportAccess'));

    // 附加 IAMReadOnlyAccess 托管策略
    devAccessRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('IAMReadOnlyAccess'));
  }
}
