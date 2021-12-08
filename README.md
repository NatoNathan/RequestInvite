# RequestInvite

Simple site for UoP staff and Students to Request an invitation to the UoP Repos organisation

## Local development instructions

**Website**:

  1. Clone the repo
  2. Run `yarn install` or `npm install`
  3. Run `yarn dev:site` or `npm run dev:site` to start development web server
  4. Open [http://localhost:3000/](http://localhost:3000/) in your browser

**Cloud Functions**:

  1. Clone the repo
  2. Run `yarn install` or `npm install`
  3. Run `"GITHUB_ORG=SOME_ORG \nGITHUB_TOKEN=GH_PAT" > .env.development.local`
  4. Update `.env.development.local` with your GitHub organisation and token (Use a token with the `org` scope). You may need to make a org for testing purposes.
  5. Run `yarn dev:cloud or npm run dev:cloud` to serve cloud functions locally (you will need to restart the server after every change)
  6. Run

      ```console
        ~/git/github/uoprepos/RequestInvite(main) » curl --request POST \
          --url <http://localhost:8080/> \
          --header 'Content-Type: application/json' \
          --data '{
            "email":"UPnumber@port.ac.uk" # or Staff Email
        }'
        ```

## Deployment instructions

The following instructions assume you are deploying to a Google Cloud Function with the default configuration of this Project (i.e. no customisation). If you are deploying to a different platform, please refer to the instructions for that platform.

If you would prefer to use Google cloud Secret Manager instead of the default configuration, please refer to the documentation for the [Google Cloud Secret Manager](https://cloud.google.com/secret-manager/).

**Cloud Functions**:

  1. Download and setup [Cloud SDK from google](https://cloud.google.com/sdk/docs/install), You will need to Have a Google Cloud account.
  2. Return into the root of the repo

      ```console
          ~ » cd ~/git/github/uoprepos/
      ```

  3. Add to .env.production.yaml
    
    ```yaml
    GITHUB_ORG: "SOME_ORG"
    GITHUB_TOKEN: "GH_PAT" 
    ```
    
  5. Update `.env.production.yaml` with your GitHub organisation and token (Use a token with the `org` scope)
  6. Run `yarn install` or `npm install` to update dependencies
  7. Run `yarn deploy:cloud`or `npm run deploy:cloud` to deploy the cloud functions

**Website**:

  1. I recommend you deploy the cloud functions first. As you need to know the URL of the cloud function.
  2. Return into the root of the repo

      ```console
          ~ » cd ~/git/github/uoprepos/
      ```

  3. Run `yarn install` or `npm install` to update dependencies
  4. Update `.env.production` with the `REGION` and `PROJECT_ID` from the cloud function
  5. Run `yarn deploy:site` or `npm run deploy:site` to deploy the website to github pages
  6. Ensure github pages setup to use the `gh-pages` branch
  7. Open [https://uoprepos.github.io/](https://uoprepos.github.io/) in your browser
