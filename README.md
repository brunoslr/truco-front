# Codemie 🤖

## Running in docker 🐳

### Requirements

- `docker` (or alternative)
- `docker-compose`

### Starting up

- Run
  ```bash
  docker-compose up --build
  ```
- Check out `http://localhost:8080/docs`

## Running on bare metal 🐍

### Requirements 
- Python (>= 3.12)
- [Poetry](https://python-poetry.org/)

### Starting up
- Run
  ```bash
  poetry install
  ```
- Run
  ```bash
  poetry run download_nltk_packages
  ```
- ```bash
  cd src/
  ```
- ```bash
  poetry run uvicorn codemie.rest_api.main:app --host=0.0.0.0 --port=8080 --reload
  ```
- Up and running! 🔥 Check out `http://localhost:8080/docs`

### Database Migrations
For information about working with database migrations, see the [Alembic README](src/external/alembic/README).


## Run unit tests 🧪
```bash
poetry run pytest tests/
```

## Ruff Linter Instructions 📝
Ruff is a fast Python linter that can be used to ensure code quality. Follow the instructions below to use Ruff linter in this project.

### Installation 🛠️
To install Ruff, you can use Poetry:
```bash
poetry add ruff
```

Sure, here's the revised README section with both lint and format commands:

### Running Ruff 🚀

To run Ruff on your codebase, use the following commands:

#### Linting

To lint all Python files in the current directory and its subdirectories, use:

```bash
poetry run ruff check
```

#### Formatting

To format all Python files in the current directory and its subdirectories, use:

```bash
poetry run ruff format
```

This ensures your code is both linted and formatted consistently.

### Configuration ⚙️
You can configure Ruff by creating a `pyproject.toml` file in the root of your project and adding the following configuration:
```toml
[tool.ruff]
# Add your configuration options here
```
For more configuration options, refer to the [Ruff documentation](https://beta.ruff.rs/docs/).

## How to Update `codemie-tools` to the Latest Version

When new changes are merged into the `codemie-tools` repository, the build pipeline automatically pushes a new version to [PyPI](https://pypi.org/project/codemie-tools/).
To update the project to use the latest version of `codemie-tools`, follow these steps:

1. Update the package version in pyproject.toml:

   Open your pyproject.toml file and locate the dependency declaration for codemie-tools. Replace the local path-based dependency with the new version number. It should look similar to this:

   ```text
   codemie-tools = "x.y.z"
   ```

2. Update the Package via Poetry:

   After updating the version number in pyproject.toml, run the following command to update the codemie-tools package in your local environment:

   ```bash
   poetry update codemie-tools
   ```
   This command will download the new version from PyPI and update the project's lock file accordingly.

## How to use `codemie-tools` and develop and test it locally 🐍
Need to change `codemie-tools` package in `pyproject.toml` file to the following:

```toml
codemie-tools = {path = "<Path to codemie-tools folder>", develop = true}
```

and run update of `codemie-tools` package:

```python
poetry update codemie-tools
```

`NOTE`: don't forget to revert these changes before pushing changes to the repository (`poetry.lock` as well)!

### Another option to use `codemie-tools` package from git repository directly from specific branch:

```toml
codemie-tools = {git = "https://gitbud.epam.com/epm-cdme/codemie-tools.git", branch = "main"}
```

## How to enable different connections and features 🐍

### How to enable "Generate Image" tool
Need to specify 2 env variables for DALL-E model to .env file:

`DALLE_API_URL`
`DALLE_API_KEY`

### Contribution guidelines 🌳

We use trunk-based development.
This method implies that pull requests are generated directly to the `main` branch.

Branch name should match the following pattern: `EPMCDME-XX_short-description`

Commit messages should follow `EPMCDME-XX: Description of a commit`

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

## Manage your own LLM and embedding models via Helm Chart

By default, AI/Run provides predefined LLM and embedding models for AWS, Azure, GCP. They can be found here: `config/llms`.

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
      - name: codemie-llm-customer-config
        mountPath: /app/config/llms/llm-epm-cdme-config.yaml
        subPath: llm-epm-cdme-config.yaml
      ...
    
    extraVolumes: |
      ...
      - name: codemie-llm-customer-config
        configMap:
          name: codemie-llm-customer-config
      ...
   
    extraObjects:
      - apiVersion: v1
        kind: ConfigMap
        metadata:
          name: codemie-llm-customer-config
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

## CodeMie provides the following metrics 📊:

| Metric name                      | Description                                  |
|----------------------------------|----------------------------------------------|
| create_assistant                 | Number of created assistants                 |
| create_assistant_error           | Number of created assistants with errors     |
| update_assistant                 | Number of updated assistants                 |
| update_assistant_error           | Number of updated assistants with errors     |
| delete_assistant                 | Number of deleted assistants                 |
| codemie_tools_usage_total        | Number of tools usage                        |
| codemie_tools_usage_tokens       | number of tokens using with tools            |
| codemie_tools_usage_errors_total | Number of tools usage with errors            |
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

## How to Build Docker Image for SWE Testing 🐳
To build a Docker image using the swe.Dockerfile, you need to name your branch appropriately.  
Branch Name Format: swe-'<placeholder>'.  
Example: If you want to use the swe.Dockerfile, create a branch with a name like "swe-feature1".


## Truco Mineiro Rules

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