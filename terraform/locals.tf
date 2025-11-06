locals {
  resource_group_name = "rg-${var.workload}-${var.environment}-${var.location}"
  static_web_app_name = "stapp-${var.workload}-${var.environment}-${var.location}"
}
