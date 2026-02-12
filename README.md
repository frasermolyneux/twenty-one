# Twenty One
[![Build and Test](https://github.com/frasermolyneux/twenty-one/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/build-and-test.yml)
[![PR Verify](https://github.com/frasermolyneux/twenty-one/actions/workflows/pr-verify.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/pr-verify.yml)
[![Code Quality](https://github.com/frasermolyneux/twenty-one/actions/workflows/codequality.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/codequality.yml)
[![Deploy Dev](https://github.com/frasermolyneux/twenty-one/actions/workflows/deploy-dev.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/deploy-dev.yml)
[![Deploy Prd](https://github.com/frasermolyneux/twenty-one/actions/workflows/deploy-prd.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/deploy-prd.yml)
[![Destroy Development](https://github.com/frasermolyneux/twenty-one/actions/workflows/destroy-development.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/destroy-development.yml)
[![Destroy Environment](https://github.com/frasermolyneux/twenty-one/actions/workflows/destroy-environment.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/destroy-environment.yml)
[![Dependabot Automerge](https://github.com/frasermolyneux/twenty-one/actions/workflows/dependabot-automerge.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/dependabot-automerge.yml)
[![Copilot Setup Steps](https://github.com/frasermolyneux/twenty-one/actions/workflows/copilot-setup-steps.yml/badge.svg)](https://github.com/frasermolyneux/twenty-one/actions/workflows/copilot-setup-steps.yml)

## Documentation
* [Development Workflows](/docs/development-workflows.md) - Branch strategy, CI/CD triggers, and typical development flows for the Azure Static Web App.

## Overview
Twenty One is a static blackjack card counting trainer built with HTML, CSS, and vanilla JavaScript to help players sharpen hand-evaluation speed. Players choose between multiple-choice, input, timed, and practice modes, tuning card counts and timers to suit their pace. The app tracks streaks, scores, accuracy, and best streaks across sessions via local storage to show progress over time. It is packaged as an Azure Static Web App and deployed through GitHub Actions pipelines that reuse Terraform composites for environment automation.

## Contributing
Please read the [contributing](CONTRIBUTING.md) guidance; this is a learning and development project.

## Security
Please read the [security](SECURITY.md) guidance; I am always open to security feedback through email or opening an issue.
