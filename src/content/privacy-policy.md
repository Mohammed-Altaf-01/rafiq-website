# Privacy Policy

**Effective date:** 24 July 2026
**Last updated:** 24 July 2026

Rafiq ("Rafiq", "we", "us", or "our") is an Android app that helps you live more intentionally by blocking harmful and habit-forming content and by enforcing screen-time limits you set for yourself. We built Rafiq around one promise: what you look at on your phone is nobody's business but yours. This policy explains exactly what we collect, what we deliberately never collect, and the choices you have.

Rafiq is operated by an individual developer (Altaf) and is governed by the laws of India. Rafiq is intended for people aged 15 and older.

If you have any question about this policy, email **rafiqgaurdian@gmail.com**.

---

## The short version

- Rafiq reads your screen to detect blocked content, but it **never stores, logs, or sends** the URLs you visit, what you search, or anything you type or see.
- A block only ever records its **type and the time it happened** — never what triggered it.
- All content matching happens **on your device**. Nothing about what you did leaves your phone.
- We use Firebase and RevenueCat for accounts, crash reporting, and subscriptions. We never sell your data, and there are no ads.
- Your PIN is never stored in plain text.

---

## What we collect

### Account and identity

When you use Rafiq you either continue anonymously or sign in with Google.

- **Anonymous:** Firebase assigns a random identifier. No personal information is required or collected.
- **Google Sign-In:** we receive your email address, display name, an optional profile photo, and your Google account ID.

Your identifier is the key that links your settings and progress. Signing in is only needed to keep a subscription and to sync your data across devices.

### On-device activity

To enforce your limits and show your progress, Rafiq keeps a small amount of data on your device:

- **Block events** — the *type* of block (adult content, short-video feed, or app-limit reached), the *time* it happened, and whether you chose to continue past it. Nothing about what you were viewing is included.
- **Per-app screen time** — how many minutes you spent in the apps you set limits on, per day.
- **Streaks and dhikr** — your clean-day streak, longest streak, and daily dhikr count.

For free users this data stays only on your device. For subscribers, streaks and settings are also synced to the cloud so they survive a reinstall.

### Settings and preferences

Your protection choices — which categories you block, pause durations, dhikr targets, per-app limits, and whether biometric unlock is on. Stored privately on your device, and synced to the cloud only if you subscribe.

### Your PIN

If you set a PIN for strict blocking, it is **never stored in plain text**. We store a salted, hashed form of it, which is itself encrypted with a hardware-backed key on your device. Even a full read of the app's storage cannot recover your PIN. Your PIN is never sent to the cloud.

### Subscription and billing

To manage your subscription we collect your subscription status, plan (monthly or annual), renewal state, and expiry date. This is handled by our billing partner, RevenueCat, on top of Google Play.

### Analytics

We use Firebase Analytics to understand how the app is used. Every event we send is a **count or a funnel step** — for example, "onboarding step reached", "permission granted", "block fired by type", or "subscription purchased". We never attach the content of what you did.

By design, our analytics code has no way to record free-form text. A URL, a search term, or a page title simply cannot be logged, even by mistake.

### Crash reports

We use Firebase Crashlytics to fix bugs. Crash reports contain stack traces, your device model and OS version, and whether you are a subscriber. They never contain screen text or anything you viewed.

### Notifications

If you subscribe, we register your device's notification token so we can tell you about renewals. It is removed when you sign out or uninstall.

### Blocklist updates

Rafiq downloads a reference list of adult domains and keywords so detection stays accurate as sites and apps change. This is a static list coming *down* to your device — nothing about your activity goes *up* with it.

---

## What Rafiq's Accessibility permission reads (and never keeps)

To detect blocked content and short-video feeds, Rafiq uses Android's Accessibility Service to read on-screen text in real time. This is the most sensitive permission the app uses, so here is exactly how it works:

- Rafiq reads the URL in your browser's address bar, the text in search fields, and the on-screen structure that identifies a Shorts or Reels feed.
- That text is compared against the blocklist **in memory**, and then discarded — usually within a fraction of a second.
- It is **never** written to storage, never sent over the network, and never printed to a log — not even in test builds.
- Rafiq ignores password fields and does not read your messages, emails, or page content.

If a block fires, all that is recorded is the block's type and the time. Never the URL, the search, or the reason.

---

## How we use your data

- **To run the app** — sign you in, sync your data if you subscribe, deliver blocklist updates, and enforce your blocks and limits.
- **To improve the app** — see which features are used and where people get stuck, so we can fix and prioritise.
- **To keep you informed** — streak reminders, trial-expiry notices, and renewal alerts (all optional).
- **To fix crashes** — diagnose and resolve stability problems.
- **To handle billing** — determine free vs. premium access and manage your subscription.

We do **not** use your data for advertising, profiling, or resale. There are no ads in Rafiq and no ad networks to target.

---

## Who we share data with

We do not sell your data. We share it only with the service providers that make the app work:

- **Google Firebase** — sign-in, cloud storage for subscribers, analytics, crash reporting, notifications, and blocklist delivery. See Google's privacy policy at policies.google.com/privacy.
- **RevenueCat** — subscription and entitlement management, sitting on top of Google Play. See revenuecat.com/privacy.
- **Google Play** — payment processing for subscriptions. See policies.google.com/privacy.

There are no other third parties — no ad networks, no data brokers, no marketing platforms.

---

## Where your data is stored, and for how long

Your cloud data is processed on Google's infrastructure in the United States. If you are outside the US, using Rafiq involves transferring your data there.

- **On your device** — block history, usage, streaks, settings, and your encrypted PIN stay until you clear the app's data or uninstall. Older block history is trimmed automatically over time.
- **In the cloud (subscribers)** — your profile, entitlement, streaks, and settings persist until you ask us to delete them.
- **Analytics and crash reports** — retained by Google under their standard policies (roughly 14 months for analytics, 90 days for crashes), then deleted automatically.
- **Notification token** — removed when you sign out or uninstall.

---

## Your choices and rights

- **See or export your data** — email rafiqgaurdian@gmail.com and we will help.
- **Correct your data** — update your Google account details, or change your settings and limits in the app.
- **Delete your account and data** — in the app, open Settings → Account → Delete account, and your account and everything synced with it go straight away. If you have already uninstalled Rafiq, email rafiqgaurdian@gmail.com from the address tied to your account and we will remove your profile, entitlement, and synced data within 30 days. Both routes, and the full list of what is deleted and what is kept, are set out at https://rafiq.app/delete-account/. Uninstalling removes everything held on your device.
- **Revoke permissions** — you can turn off Accessibility, overlay, usage-access, or notifications at any time in Android Settings. Blocking stops when Accessibility is off, and Rafiq will simply invite you to turn it back on.

Depending on where you live — for example under the GDPR in the EU/EEA, or under India's data-protection law — you may have additional rights to access, correct, delete, restrict, or object to the processing of your data, and to lodge a complaint with your local authority. To exercise any of these, email rafiqgaurdian@gmail.com with your request and a way to verify your identity. We will respond within 30 days.

---

## Children

Rafiq is intended for people aged 15 and older. We do not knowingly collect data from anyone younger. If you believe a child has provided us data, email rafiqgaurdian@gmail.com and we will delete it.

---

## Changes to this policy

We may update this policy as the app evolves or as the law requires. When we do, we will change the "Last updated" date above, and for meaningful changes we will let you know inside the app. Continuing to use Rafiq after an update means you accept the revised policy.

---

## Contact

Questions, requests, or complaints: **rafiqgaurdian@gmail.com**

We will always try to resolve things with you directly first.
