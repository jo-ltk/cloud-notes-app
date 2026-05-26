# Root Terragrunt config — inherited by terragrunt/dev (and future env folders)
#
# Beginner tip: you rarely edit this file. Most learning happens in dev/terragrunt.hcl
# and in ../../terraform (the actual modules and resources).

locals {
  project_name = "cloud-notes-app"
}
