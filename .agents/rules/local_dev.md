---
trigger: always_on
---

#local dev mode#
- when testing on this machine, webhooks doint work because we are not reachable from outside
-- run the Stripe CLI listener and take the key from web/.env, never paste it here:

   PowerShell:
     .\stripe listen --api-key $env:STRIPE_SECRET --forward-to http://127.0.0.1:8001/stripe/webhook

   Bash:
     ./stripe listen --api-key "$STRIPE_SECRET" --forward-to http://127.0.0.1:8001/stripe/webhook

   Alternatively log in once with `stripe login`, then --api-key is not needed at all.

- Never write real keys into this file. It is tracked by git and would end up in the
  repository. The live values belong in web/.env, which is gitignored.
