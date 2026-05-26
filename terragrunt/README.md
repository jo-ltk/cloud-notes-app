# Terragrunt (optional — learn after plain Terraform)

**Start here first:** `terraform/` — use `terraform plan` and `terraform apply` there.

**Terragrunt** is a thin wrapper around the same Terraform code. It helps you:

- Run Terraform from a folder per environment (`dev/`)
- Pass variables via `inputs` instead of `-var-file`
- Later: share remote state and DRY config across teams (not required for learning)

## Folder layout

```txt
terragrunt/
├── README.md           ← you are here
├── terragrunt.hcl      ← root (shared settings)
└── dev/
    └── terragrunt.hcl  ← points at ../../terraform
```

Same AWS resources as `terraform/` — only the **workflow** changes.

## Prerequisites

1. [Terraform](https://developer.hashicorp.com/terraform/install) installed
2. [Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/) installed
3. AWS credentials configured (same as for plain Terraform)

## Try it (dev only)

```bash
cd terragrunt/dev
terragrunt init
terragrunt plan
# terragrunt apply   # creates real AWS resources — run when ready
```

Terragrunt copies `../../terraform` into a cache folder (`.terragrunt-cache/`). That is normal — ignore it in the IDE.

## Interview one-liner

> “I learned Terraform directly in `terraform/`, then used Terragrunt in `terragrunt/dev` to see how teams pass environment inputs and organize folders without duplicating modules.”

## When to go deeper

- Remote state (S3 + DynamoDB lock) — see commented block in `terraform/provider.tf`
- `staging/` and `prod/` folders — copy `dev/terragrunt.hcl` and change `environment` + tags
