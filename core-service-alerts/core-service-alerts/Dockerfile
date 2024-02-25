FROM node:16

WORKDIR /core-service

COPY package*.json ./
RUN	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

ARG AWS_ACCESS_KEY_ID=AKIARE5OXZT7NS4LFLHE
ARG AWS_SECRET_ACCESS_KEY=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
ARG AWS_REGION=ap-south-1
RUN	unzip awscliv2.zip && ./aws/install
RUN aws codeartifact login --tool npm --repository codeArtifact --domain company-domain --domain-owner 079286488318 --region us-east-1
RUN npm install 

COPY . .

EXPOSE 6001
CMD [ "npm", "start" ]