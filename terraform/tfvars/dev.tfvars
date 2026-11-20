environment = "dev"
location    = "westeurope"

subscription_id = "ef3cc6c2-159e-4890-9193-13673dded835"

workload = "twenty-one"

dns = {
  subscription_id     = "db34f572-8b71-40d6-8f99-f29a27612144"
  resource_group_name = "rg-platform-dns-prd-uksouth-01"
  zone_id             = "3a722fb78d09a0de06a0af0e3b2b0ab0"
  domain              = "molyneux.me"
  subdomain           = "twenty-one.dev"
}

tags = {
  Environment = "dev"
  Workload    = "twenty-one"
  DeployedBy  = "GitHub-Terraform"
  Git         = "https://github.com/frasermolyneux/twenty-one"
}
