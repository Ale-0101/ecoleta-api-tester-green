
export const dockerfileContent = `FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set environment variables
ENV NODE_ENV=test
ENV API_URL=https://api.ecoleta-sustentavel.com/v1

CMD ["npm", "run", "test"]`;

export const dockerComposeContent = `version: '3.8'

services:
  ecoleta-tester:
    build: .
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - NODE_ENV=test
      - API_URL=https://api.ecoleta-sustentavel.com/v1
    command: npm run test

  report-server:
    image: nginx:alpine
    volumes:
      - ./reports:/usr/share/nginx/html
    ports:
      - "8080:80"
    depends_on:
      - ecoleta-tester`;

export const packageJsonContent = `{
  "name": "ecoleta-api-tester",
  "version": "1.0.0",
  "description": "Testes automatizados para a API Ecoleta",
  "main": "index.js",
  "scripts": {
    "test": "npm-run-all --parallel test:*",
    "test:api": "mocha api-tests/**/*.test.js --timeout 10000",
    "test:bdd": "cucumber-js",
    "report": "node ./utils/generate-report.js"
  },
  "dependencies": {
    "@cucumber/cucumber": "^7.3.1",
    "ajv": "^8.6.3",
    "axios": "^0.21.4",
    "chai": "^4.3.4",
    "chai-json-schema": "^1.5.1",
    "dotenv": "^10.0.0",
    "mocha": "^9.1.1",
    "mochawesome": "^6.2.2",
    "moment": "^2.29.1",
    "npm-run-all": "^4.1.5"
  }
}`;

export const githubWorkflowContent = `name: Ecoleta API Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Run daily at midnight

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js environment
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run API tests
      run: npm run test:api
      env:
        API_URL: \${{ secrets.API_URL }}
        API_KEY: \${{ secrets.API_KEY }}
        
    - name: Run BDD tests
      run: npm run test:bdd
      env:
        API_URL: \${{ secrets.API_URL }}
        API_KEY: \${{ secrets.API_KEY }}
        
    - name: Generate report
      run: npm run report
      
    - name: Archive test results
      uses: actions/upload-artifact@v2
      with:
        name: test-reports
        path: reports/`;
