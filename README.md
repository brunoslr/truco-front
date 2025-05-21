# Project README

## Running in Docker 🐳

### Requirements

- `docker` (or alternative)
- `docker-compose`

### Starting up

- Run
  ```bash
  docker-compose up --build
  ```
- Check out `http://localhost:3000`

## Running on Bare Metal 🐍

### Requirements 
- Node.js (>= 16.0.0)
- npm (>= 7.0.0)

### Starting up
- Run
  ```bash
  npm install
  ```
- Run
  ```bash
  npm start
  ```
- Up and running! 🔥 Check out `http://localhost:3000`

### Database Migrations
For information about working with database migrations, see the [documentation](src/external/migrations/README).

## Run Unit Tests 🧪
```bash
npm test
```

## ESLint Instructions 📝
ESLint is a fast JavaScript linter that can be used to ensure code quality. Follow the instructions below to use ESLint in this project.

### Installation 🛠️
To install ESLint, you can use npm:
```bash
npm install eslint --save-dev
```

### Running ESLint 🚀

To run ESLint on your codebase, use the following commands:

#### Linting

To lint all JavaScript and TypeScript files in the current directory and its subdirectories, use:

```bash
npm run lint
```

#### Formatting

To format all JavaScript and TypeScript files in the current directory and its subdirectories, use:

```bash
npm run format
```

This ensures your code is both linted and formatted consistently.

### Configuration ⚙️
You can configure ESLint by creating a `.eslintrc.json` file in the root of your project and adding the following configuration:
```json
{
  "extends": "eslint:recommended",
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    // Add your configuration options here
  }
}
```
For more configuration options, refer to the [ESLint documentation](https://eslint.org/docs/user-guide/configuring).

## How to Update Dependencies to the Latest Version

To update the project dependencies to the latest versions, follow these steps:

1. Update the package versions in `package.json`:

   Open your `package.json` file and locate the dependency declarations. Replace the current versions with the latest versions available.

2. Update the Packages via npm:

   After updating the version numbers in `package.json`, run the following command to update the packages in your local environment:

   ```bash
   npm update
   ```
   This command will download the new versions and update the project's lock file accordingly.

## How to Develop and Test Locally 🐍
To develop and test the project locally, make necessary changes and run the following command to update dependencies:

```bash
npm update
```

`NOTE`: Don't forget to revert these changes before pushing changes to the repository (`package-lock.json` as well)!

## How to Enable Different Connections and Features 🐍

### How to Enable "Generate Image" Tool
Need to specify 2 env variables for the image generation service to the `.env` file:

`IMAGE_API_URL`
`IMAGE_API_KEY`

### Contribution Guidelines 🌳

We use trunk-based development.
This method implies that pull requests are generated directly to the `main` branch.

Branch name should match the following pattern: `feature/short-description`

Commit messages should follow `Description of a commit`

## Handling Changes in Helm Chart

This section provides simple steps to update Helm chart and ensure the documentation is current.

Install Helm and Helm-docs:

```bash
brew install helm

brew install helm-docs
```

1. Update the Helm chart files (e.g., values.yaml, Chart.yaml, templates).
2. Run helm-docs to update documentation:

    ```bash
    helm-docs .
    ```

## Manage Your Own LLM and Embedding Models via Helm Chart

By default, the application provides predefined LLM and embedding models for AWS, Azure, GCP. They can be found here: `config/llms`.

The `MODELS_ENV` is used to specify the environment for the models. For example, `MODELS_ENV=dial` will use the models from the `config/llms/llm-dial-config.yaml` file (Pattern: `llm-<MODELS_ENV>-config.yaml`). 

Example of providing LLM and embedding models for the `epm-cdme` environment:

1. Go to the `deploy-templates/values.yaml` file.
2. Add the following lines to the `values.yaml` file:

    ```yaml
    extraEnv:
      - name: MODELS_ENV
        value: "epm-cdme"

    extraVolumeMounts: |
      ...
      - name: llm-customer-config
        mountPath: /app/config/llms/llm-epm-cdme-config.yaml
        subPath: llm-epm-cdme-config.yaml
      ...
    
    extraVolumes: |
      ...
      - name: llm-customer-config
        configMap:
          name: llm-customer-config
      ...
   
    extraObjects:
      - apiVersion: v1
        kind: ConfigMap
        metadata:
          name: llm-customer-config
        data:
          llm-epm-cdme-config.yaml: |
            llm_models:
              - base_name: "gpt-4o-2024-08-06"
                deployment_name: "gpt-4o-2024-08-06"
                label: "GPT-4o 2024-08-06"
                multimodal: true
                enabled: true
                default: true
                provider: "azure_openai"
                cost:
                  input: 0.0000025
                  output: 0.000011
     
            embeddings_models:
              - base_name: "ada-002"
                deployment_name: "text-embedding-ada-002"
                label: "Text Embedding Ada"
                enabled: true
                default: true
                provider: "azure_openai"
                cost:
                  input: 0.0000001
                  output: 0
    ```

## Project Metrics 📊:

| Metric name                      | Description                                  |
|----------------------------------|----------------------------------------------|
| create_assistant                 | Number of created assistants                 |
| create_assistant_error           | Number of created assistants with errors     |
| update_assistant                 | Number of updated assistants                 |
| update_assistant_error           | Number of updated assistants with errors     |
| delete_assistant                 | Number of deleted assistants                 |
| tools_usage_total                | Number of tools usage                        |
| tools_usage_tokens               | Number of tokens using with tools            |
| tools_usage_errors_total         | Number of tools usage with errors            |
| datasource_index_total           | Number of indexed datasources                |
| datasource_index_documents       | Number of indexed documents in datasources   |
| datasource_index_errors_total    | Number of indexed datasources with errors    |
| datasource_reindex_total         | Number of reindexed datasources              |
| datasource_reindex_documents     | Number of reindexed documents in datasources |
| datasource_reindex_errors_total  | Number of reindexed datasources with errors  |
| delete_datasource                | Total number of deleted datasources          |
| update_datasource                | Total number of updated datasources          |
| workflow_execution_total         | Number of workflow executions                |
| workflow_execution_state_total   | Number of workflow executions by state       |
| workflow_created_total           | Number of created workflows                  |
| workflow_updated_total           | Number of updated workflows                  |
| workflow_deleted_total           | Number of deleted workflows                  |

## How to Build Docker Image for Development 🐳
To build a Docker image using the Dockerfile, you need to name your branch appropriately.  
Branch Name Format: dev-'<placeholder>'.  
Example: If you want to use the Dockerfile, create a branch with a name like "dev-feature1".

# Truco Mineiro Rules

The game uses a 40-card deck (8s, 9s, and 10s removed).

The card ranking is as follows:

1. 4 of Clubs (Zap)
2. 7 of Hearts (Copas)
3. Ace of Spades (Espadão)
4. 7 of Diamonds (Espadinha)
5. 3s, 2s, Aces, Kings, Jacks, Queens, 7 of Spades, 7 of Clubs, 6s, 5s, 4s

A regular hand is worth 2 points.

A hand with Truco is worth 4 points, with increments of 4 points if raised.

The first team to reach 12 points wins the game.

The game does not include Envido or Flor.