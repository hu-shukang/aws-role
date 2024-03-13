import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CodePipelineAccessRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const codePipelineAccessPolicy = new iam.Policy(this, 'CodePipelineAccessPolicy', {
      policyName: 'CodePipelineAccessPolicy',
      statements: [
        new iam.PolicyStatement({
          actions: [
            'lambda:UpdateFunctionCode',
            'lambda:UpdateFunctionConfiguration',
            'lambda:InvokeFunction',
            'lambda:GetFunction',
            'lambda:GetFunctionConfiguration',
            'lambda:PublishVersion',
            'lambda:CreateAlias',
            'lambda:DeleteAlias',
            'lambda:UpdateAlias',
          ],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: [
            'ecs:RegisterTaskDefinition',
            'ecs:DescribeTaskDefinition',
            'ecs:UpdateService',
            'ecs:DescribeServices',
            'iam:PassRole',
          ],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          actions: [
            'ecr:GetAuthorizationToken',
            'ecr:BatchCheckLayerAvailability',
            'ecr:GetDownloadUrlForLayer',
            'ecr:GetRepositoryPolicy',
            'ecr:DescribeRepositories',
            'ecr:ListImages',
            'ecr:DescribeImages',
            'ecr:BatchGetImage',
            'ecr:InitiateLayerUpload',
            'ecr:UploadLayerPart',
            'ecr:CompleteLayerUpload',
            'ecr:PutImage',
          ],
          resources: ['*'],
        }),
      ],
    });

    const codePipelineAccessRole = new iam.Role(this, 'CodePipelineAccessRole', {
      roleName: 'CodePipelineAccessRole',
      assumedBy: new iam.ServicePrincipal('codepipeline.amazonaws.com'),
    });

    codePipelineAccessRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodePipeline_FullAccess'));

    codePipelineAccessPolicy.attachToRole(codePipelineAccessRole);
  }
}
