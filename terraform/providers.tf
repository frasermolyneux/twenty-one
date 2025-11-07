terraform {
  required_version = ">= 1.11.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.51.0"
    }

    time = {
      source  = "hashicorp/time"
      version = "~> 0.9"
    }
  }

  backend "azurerm" {}
}

provider "azurerm" {
  subscription_id = var.subscription_id

  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }

  storage_use_azuread = true
}

provider "azurerm" {
  alias           = "dns"
  subscription_id = var.dns.subscription_id

  features {}

  storage_use_azuread = true
}
