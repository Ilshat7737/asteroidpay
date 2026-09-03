# AsteroidPay Content Redesign — Copy Deck

**Status:** Draft for approval. No layout/component work starts until this
is approved, per `2026-09-03-kshost-content-redesign-design.md`.

Final section order: Hero → Supported coins → Payment gateway → API →
Auto-convert → White-label → Testimonials → Wallet → Receive → Send →
Convert → Final CTA → Footer.

---

## 1. Hero — polish only

**H1:** Crypto payments that move at the speed of your business.

**Sub:** Accept Bitcoin, Ethereum, and stablecoins across six networks —
with fees from 0.3%, automatic conversion, and settlement you can count on.

**CTA 1 (primary):** Contact us
**CTA 2 (secondary):** See pricing → now anchors to `/#services` (was
`/#fees`, which no longer exists as a standalone section)

---

## 2. Supported coins — polish only

**Eyebrow:** 50+ popular coins supported

*(No further copy in this block — marquee content unchanged.)*

---

## 3. Payment gateway (Fees merged in)

**Eyebrow:** Payment gateway

**H2:** Accept crypto payments across the networks your customers already
use.

**Body:** One integration routes every payment to the right network and
back to you — no juggling separate wallets, dashboards, or providers.

**Embedded pricing callout (new — was the standalone Fees section):**

**Stat:** From **0.3%** per transaction
**Stat sub:** and it drops further as your volume grows.

**Pricing bullets** (kept from the current Fees section, unchanged):
- No setup fee — start accepting payments the same day you sign up.
- No monthly fee — pay only when you get paid.
- No hidden costs — the rate you see is the rate you pay.
- Volume-based discounts — your rate drops automatically as volume grows.
- Transparent pricing — every transaction shows its fee up front.

*(Network grid content is unchanged — pulled from `lib/data/networks.ts`,
not part of this copy deck.)*

---

## 4. API — new

**Eyebrow:** Built for developers

**H2:** One API for every network you accept.

**Body:** Create a payment, get a webhook when it settles. AsteroidPay handles
routing, conversion, and confirmations — your integration doesn't need to
know which chain the customer used.

**Code mockup card:**

Request:
```
POST /v1/payments
{
  "amount": "129.00",
  "currency": "USD",
  "settle_to": "USDT",
  "webhook_url": "https://yoursite.com/hooks/asteroidpay"
}
```

Response:
```
200 OK
{
  "id": "pay_8fq2k1",
  "status": "pending",
  "pay_address": "TXn2...ac9F",
  "network": "TRON"
}
```

**Bullets:**
- Real-time webhooks for every payment state
- Sandbox environment with test networks
- Official SDKs for Node, Python, and PHP
- Idempotent requests — retry safely, never double-charge

**CTA:** Contact us *(opens the existing contact modal — no separate docs
route; API access goes through contacting the team, same as every other
CTA on the page)*

---

## 5. Auto-convert — refresh

**Eyebrow:** Auto-convert *(new — section had no eyebrow before)*

**H2:** Every payment lands the way you want it.

**Body:** The moment a payment arrives, AsteroidPay converts it automatically
into a stablecoin like USDT or USDC — or straight to fiat — at the live
market rate. You never hold volatile crypto you didn't choose to hold.

**Bullets** (unchanged):
- Converted at the market rate the instant funds are received
- Settle in USDT, USDC, or fiat — your choice
- No manual swaps, no exposure to price swings

---

## 6. White-label — new

**Eyebrow:** White-label

**H2:** Your brand at checkout, not ours.

**Body:** Merchants on our white-label plan run AsteroidPay entirely under
their own identity — checkout, dashboard, and customer emails all carry
your logo, your colors, your domain. Your customers never see the word
AsteroidPay.

**Bullets:**
- Custom domain for checkout and dashboard
- Your logo and brand colors throughout
- No AsteroidPay branding shown to your customers
- Dedicated support line for white-label accounts

**CTA:** Talk to sales *(opens the existing contact modal)*

---

## 7. Testimonials — layout restyle only, copy unchanged

**Eyebrow:** Reviews
**H2:** Built for businesses that move fast.

*(Existing quotes/clients in `lib/data/testimonials.ts` are kept
verbatim — not part of this copy deck.)*

---

## 8. Wallet — new (revised: hot wallet, not cold/self-custody)

**Eyebrow:** AsteroidPay Wallet

**H2:** One wallet. Always on. Always ready.

**Body:** AsteroidPay Wallet is a hot wallet — always online, always
accessible, built to hold your funds centrally in one safe place until
you're ready to use them. No cold storage, no seed phrases to guard, no
hardware to plug in. Top up in any coin, on any network, and it's ready
to spend, send, or convert the moment it lands.

**Bullets:**
- Always online — no hardware, no unlocking devices, ready instantly
- One centralized balance, regardless of which network funds arrived on
- Built for everyday use, not long-term cold storage

**CTA:** Get the wallet *(opens a new lightweight registration/early-access
modal — name + email — following the existing `login-modal.tsx` /
`contact-modal.tsx` form pattern, submitted through the existing working
`/api/contact` endpoint tagged as a wallet signup, with a real success
confirmation on submit. Not a full password-based account system — no
backend exists for that, and building one is out of scope for a content
task. Flag if you want a different destination or fields.)*

---

## 9. Receive — new (revised: top up, not "get paid")

**Eyebrow:** Receive

**H2:** Top up your wallet, in any coin, on any network.

**Body:** Fund your AsteroidPay Wallet from any supported coin, on any
network — everything consolidates into one centralized balance, held
safely and ready whenever you need it. You don't need to track which
network your funds came in on; the wallet handles that for you.

**Bullets:**
- Top up in any supported coin, on any network
- Funds consolidate into one balance, network-agnostic
- Held safely and ready the moment they land

---

## 10. Send — new (revised: spend/pay across networks, not "send to an exchange")

**Eyebrow:** Send

**H2:** Send and spend, across any network.

**Body:** Use your balance to send funds across networks, pay for goods
and services, or transfer to anyone else — without worrying about which
network the recipient needs.

**Bullets:**
- Send across any supported network from one balance
- Pay for goods and services directly from your wallet
- No need to match networks — AsteroidPay handles the routing

---

## 11. Convert — new (revised: network-agnostic conversion, not "swap while idle")

**Eyebrow:** Convert

**H2:** Convert your funds, no matter which network they came in on.

**Body:** Received a coin on a network you don't need? Convert it inside
your wallet at a live market rate — the network the original coin arrived
on doesn't matter, only the balance does.

**Bullets:**
- Convert between any two supported coins
- Network of origin doesn't matter — everything converts from one balance
- Live market rates, no external exchange needed

---

## 12. Final CTA — no change

**H2:** Fast payments. Low fees. Reliable, every time.
**CTA:** Contact us

*(Already tight and covers both product lines without naming either —
kept as-is.)*

---

## 13. Footer — nav update

**Nav links (new set):**
- Solutions → `/#services`
- API → `/#api`
- White-label → `/#white-label`
- Wallet → `/#wallet`
- Reviews → `/#reviews`
- Terms of Use → `/terms`
- Privacy Policy → `/privacy`
- AML Policy → `/aml`

*(Standalone "Fees" link removed — pricing now lives inside `/#services`.
Networks link dropped to keep the nav from growing past a readable
width; network info is one scroll away inside Solutions. Confirm this
trim is acceptable, or say which links to keep instead.)*

Logo mark, copyright line, and the large "AsteroidPay" footer wordmark are
unchanged.
