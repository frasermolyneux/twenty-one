variable "workload" {
  default = "twenty-one"
}

variable "environment" {
  default = "dev"
}

variable "location" {
  default = "westeurope"
}

variable "subscription_id" {}

variable "cloudflare_api_token" {
  type      = string
  sensitive = true
  ephemeral = true
}

variable "dns" {
  type = object({
    subscription_id     = string
    resource_group_name = string
    zone_id             = string
    domain              = string
    subdomain           = string
  })
}

variable "tags" {
  default = {}
}
