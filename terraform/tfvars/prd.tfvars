environment = "prd"
location    = "westeurope"

subscription_id = "3cc59319-eb1e-4b52-b19e-09a49f9db2e7"

workload = "twenty-one"

dns = {
  subscription_id     = "db34f572-8b71-40d6-8f99-f29a27612144"
  resource_group_name = "rg-platform-dns-prd-uksouth-01"
  domain              = "molyneux.me"
  subdomain           = "twenty-one"
}

tags = {
  Environment = "prd"
  Workload    = "twenty-one"
  DeployedBy  = "GitHub-Terraform"
  Git         = "https://github.com/frasermolyneux/twenty-one"
}
