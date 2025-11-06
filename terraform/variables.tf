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

variable "dns" {
  type = object({
    subscription_id     = string
    resource_group_name = string
    domain              = string
    subdomain           = string
  })
}

variable "tags" {
  default = {}
}
