# Asteroid Pay

This repository holds **two independent Next.js apps**, deployed separately on different
subdomains:

| Folder | What it is | Deployed at |
|---|---|---|
| [`landing/`](landing/README.md) | The marketing site — hero, pricing, docs, legal pages, sign-up/contact forms | `asteroidpay.io` |
| [`payform/`](payform/README.md) | The payment pages — fixed-amount invoices and static-wallet payments | `payment.asteroidpay.io` |

Each folder has its own `package.json`, `node_modules`, `Dockerfile`, and `docker-compose.yml` —
building or deploying one never requires touching the other, and they can run on entirely different
servers if that's preferred. **Read each folder's own README before working on it** — this file is
only the map.

## Why split

`payform/` needs to be reachable from `payment.asteroidpay.io` and talk directly to the real
payment backend (`api-payment.asteroidpay.io`) with no marketing-site code, dependencies, or
routes anywhere near it. Keeping it a fully separate app means its deploy, its dependency
footprint, and its blast radius are all independent of `landing/`.

## Local development

Each app is run from inside its own folder:

```bash
cd landing && npm install && npm run dev    # marketing site, localhost:3000
cd payform && npm install && npm run dev    # payment pages, localhost:3000 (run one at a time,
                                              # or change one's dev port — see its README)
```

## Deployment

See [`landing/README.md`](landing/README.md#deployment) and
[`payform/README.md`](payform/README.md#deployment) for the full steps (Docker build, reverse
proxy per subdomain). Before `payform/` ever goes to production, its temporary mock backend must be
removed — see the warning at the top of [`payform/README.md`](payform/README.md).
