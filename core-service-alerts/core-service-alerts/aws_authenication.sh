#!/bin/bash

# Initialization logic can go here
apt-get update

echo "Aws configuration"
export AWS_ACCESS_KEY_ID=AKIARE5OXZT7NS4LFLHE
export AWS_SECRET_ACCESS_KEY=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
export AWS_DEFAULT_REGION=ap-south-1
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 079286488318.dkr.ecr.ap-south-1.amazonaws.com 
   
# Cleanup logic can go here