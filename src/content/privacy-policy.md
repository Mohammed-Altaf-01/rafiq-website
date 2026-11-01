# Privacy Policy

**Effective date:** 24 July 2026
**Last updated:** 1 November 2026

Rafiq ("Rafiq", "we", "us", or "our") is an Android app that helps you live more intentionally by blocking harmful and habit-forming content and by enforcing screen-time limits you set for yourself. We built Rafiq around one promise: what you look at on your phone is nobody's business but yours. This policy explains exactly what we collect, what we deliberately never collect, and the choices you have.

Rafiq is operated by an individual developer (Altaf) and is governed by the laws of India. Rafiq is intended for people aged 15 and older.

If you have any question about this policy, email **privacy@rafiqguardian.app**.

---

## The short version

- Rafiq reads your screen to detect blocked content, and **none of what it reads is ever stored, logged, or sent anywhere** — not the addresses you visit, not what you search for, not the text on the page. Matching happens in memory on your device and the text is discarded immediately.
- A block only ever records **the kind of block, when it happened, and whether you chose to continue past it** — never what triggered it.
- All content matching happens **on your device**. Nothing Rafiq reads from your screen ever leaves your phone.
- Some things do leave your phone, and none of them is screen content: your account details, anonymous usage counts, your subscription status, anything you deliberately write in the feedback form, and — only if you turn prayer times on — an approximate location. Each has its own section below.
- We use Firebase and RevenueCat for accounts, crash reporting and subscriptions, and AppsFlyer to measure which of our adverts brought someone to Rafiq. We never sell your data, and **there are no ads inside Rafiq**.
- Your PIN is never stored in plain text.

---

## What we collect

### Account and identity

When you use Rafiq, you sign in with Google or create an Email/Password account.

- **Google Sign-In:** we receive your email address, display name, an optional profile photo, and your Google account ID.
- **Email/Password account:** Firebase stores your email address and a securely hashed password so you can sign in, verify your address, reset your account password, and restore your account.

Your identifier is the key that links your settings and progress. An account is required to use Rafiq. We do not send marketing email in this version of the app.

### On-device activity

To enforce your limits and show your progress, Rafiq keeps a small amount of data on your device:

- **Block events** — the **type** of block (adult content, short-video feed, or app-limit reached), the **time** it happened, and whether you chose to continue past it. Nothing about what you were viewing is included.
- **Per-app screen time** — how many minutes you spent in the apps you set limits on, per day.
- **Streaks and dhikr** — your clean-day streak, longest streak, and daily dhikr count.

For free users this data stays only on your device. For subscribers, streaks and settings are also synced to the cloud so they survive a reinstall.

### Settings and preferences

Your protection choices — which categories you block, pause durations, dhikr targets, per-app limits, and whether biometric unlock is on. Stored privately on your device, and synced to the cloud only if you subscribe.

### Your PIN

If you set a PIN for strict blocking, it is **never stored in plain text**. We store a salted, hashed form of it, which is itself encrypted with a hardware-backed key on your device. Even a full read of the app's storage cannot recover your PIN. Your PIN is never sent to the cloud.

### Subscription and billing

To manage your subscription we collect your subscription status, which plan you are on, whether it renews, and when it expires. This is handled by our billing partner, RevenueCat, on top of Google Play.

### Analytics

We use Firebase Analytics to understand how the app is used. Every event we send is a **count or a funnel step** — for example, "onboarding step reached", "permission granted", "block fired by type", or "subscription purchased". We never attach the content of what you did.

By design, our analytics code has no way to record free-form text. A URL, a search term, or a page title simply cannot be logged, even by mistake.

### Advertising measurement

We advertise Rafiq on Meta (Facebook and Instagram) and on X, and we need to know which advert actually brought someone here — otherwise we are paying to show adverts to nobody in particular. That measurement is done by **AppsFlyer**, an attribution provider.

What AppsFlyer receives:

- your device's **advertising ID** (the resettable ID Android provides for this purpose) and an AppsFlyer device identifier;
- the fact that Rafiq was **installed** and **opened**, and when;
- **four app events** and nothing else: that an account was created or signed into, that setup was completed (and how many protections were switched on), that the subscription screen was shown, and — sent by RevenueCat, not by the app — that a trial or subscription started, renewed, or ended;
- **basic device and app information** that its SDK sends with those: phone model and make, Android version, language, country, your app version, screen size, battery and storage level, and whether you are on Wi-Fi or mobile data. We have switched off the carrier-name collection it offers.

What it never receives, and cannot: **anything Rafiq reads from your screen.** No app you opened, no site you visited, no search term, no keyword, no page text — and not a count or a summary of them either. The part of Rafiq that blocks content and the part that measures advertising share no data path at all, deliberately, and that separation is enforced in the code rather than by policy.

Meta and X receive the result of that measurement — that an install or one of those four events happened, and which campaign it came from. They receive nothing about your activity in Rafiq.

**This applies wherever you are, including the EEA, the UK and Switzerland.** Rafiq does not ask for a separate permission before running advertising measurement. If you would rather it did not apply to you, email privacy@rafiqguardian.app and we will ask AppsFlyer to delete the records held about you; you can also reset or delete your Android advertising ID at any time in **Settings → Privacy → Ads**.

Wherever you are, you can limit this at the Android level: **Settings → Privacy → Ads** lets you delete or reset your advertising ID, and "Delete advertising ID" stops apps receiving one at all. You can also email us to object, and we will have your attribution records deleted.

### Crash reports

We use Firebase Crashlytics to fix bugs. Crash reports contain stack traces, your device model and OS version, and whether you are a subscriber. They never contain screen text or anything you viewed.

### Feedback you choose to send us

Rafiq has an in-app feedback form. It asks three things: a rating from 1 to 5, why you gave that rating, and what you think should be improved. The two written answers are optional; the rating is not.

**Nothing is sent unless you fill the form in and tap send.** This is the only place in Rafiq where text you have written is transmitted anywhere, and it is the only place because you are the one writing it and choosing to send it — it is not read from your screen, and Rafiq's screen-reading has no path to it.

- **Where it goes.** The form is a **Google Form** owned by Rafiq's developer, and your answers are stored in Google Sheets under that Google account. Google processes them on our behalf as our service provider; see Google's own privacy policy for how they handle data they hold for us.
- **Your email address goes with it.** So that we can reply and, where a suggestion is used, thank you or apply the subscription we offer for it. It is filled in automatically from the account you are signed in to, and the form itself tells you so before you send. If you are using Rafiq without a signed-in account, it is sent blank.
- **Please do not paste anything sensitive.** These boxes are free text, so whatever you type is what we receive. Write about Rafiq, not about anything you would not want a person to read.
- **How long we keep it.** Responses are kept while we are still acting on them, and no longer than **24 months**, after which they are deleted.
- **Removing it.** Email **privacy@rafiqguardian.app** and we will delete your response. Tell us roughly when you sent it, or the email address on it, so we can find the right one.
- **Not asking, not required.** The form is entirely optional, it is never a condition of using Rafiq or of any feature, and ignoring it costs you nothing.

### Notifications

If you subscribe, we register your device's notification token so we can tell you about renewals and billing problems. A token is not an identifier for you as a person; it identifies one installation of the app on one device.

We remove it when you sign out, when you delete your account, and when you use **Reset Rafiq**. If you simply uninstall the app, we are not told — no code of ours can run on a phone Rafiq is no longer installed on. The token stops working at that point, and we delete it the first time we try to use it and Google tells us it is dead.

### Prayer times and your approximate location

Salah preparation is **off until you turn it on**. When you do, Rafiq needs to know roughly where you
are, because prayer times depend on it.

- Rafiq asks Android for your **approximate** location — never precise — and only **while the app is open**. There is no background location, and Rafiq does not track where you go.
- The reading is **rounded to about a kilometre** before it is stored or sent anywhere. The precise reading is discarded immediately and never written down.
- Those rounded coordinates — or the city and country you type instead — are **sent to AlAdhan** (`api.aladhan.com`), a third-party prayer-time service, to fetch your monthly schedule. It says nothing about what you do on your phone.
- If you type a **city** instead of sharing your location, that city and country are also passed to **Android's own geocoding service** to turn them into coordinates. Depending on your device and its Android version, that lookup may be performed on the phone or by Google's servers. Only the place name you typed is sent — never your device's location, and never anything about your activity.
- If you would rather share nothing at all, you can enter your **own fixed times**, and Rafiq will never ask Android for your location and will contact no one for prayer times.
- The schedule is cached on your phone. Rafiq can also calculate your times **entirely on the device**, which is what happens when you have no network.
- Your location is stored **only on this phone**. It is excluded from cloud backup and from phone-to-phone transfer, and it is erased by **Remove saved location**, by deleting your account, and by **Reset Rafiq**.
- A prayer preparation pause is **not** a block. It is not recorded in your block history, it does not affect your streak, and nothing about it is uploaded.

### Blocklist updates

Rafiq downloads a reference list of adult domains and keywords so detection stays accurate as sites and apps change. This is a static list coming **down** to your device — nothing about your activity goes **up** with it.

---

## What Rafiq's Accessibility permission reads (and never keeps)

To detect blocked content and short-video feeds, Rafiq uses Android's Accessibility Service to read on-screen text in real time. This is the most sensitive permission the app uses, so here is exactly how it works:

- Rafiq sees **which app is open**, and reads the **text, interface labels and screen layout** visible in supported browsers, video and social apps, and in the specific Android settings and uninstall screens it watches so it can warn you before your protection is switched off.
- In a browser, that includes the **web address, the text you type into search, and the visible text of the page**.
- In a supported video or social app, it can include **any text on screen** — video titles, captions, comments and similar. Rafiq cannot tell a public feed from a private one inside the same app, so we state the broad truth rather than promise a boundary the Android API cannot enforce. Rafiq does not watch dedicated messaging apps at all: WhatsApp, Signal, Telegram and Facebook Messenger are not on the list.
- Rafiq **ignores password fields**.
- This happens while Accessibility is switched on and you are using other apps, **including when Rafiq itself is not open**. That is what lets it step in at the moment it matters.
- That text is compared against the blocklist **in memory**, and then discarded — usually within a fraction of a second.
- It is **never** written to storage, never sent over the network, and never printed to a log — not even in test builds. It is never sold or shared with anyone.

If a block fires, what is recorded is the block's **category**, the **time**, and **whether you chose to continue past it** — the last of these is what your Journey and your streak are built from. Never the address, the search, or anything that was on the screen.

---

## How we use your data

- **To run the app** — sign you in, sync your data if you subscribe, deliver blocklist updates, and enforce your blocks and limits.
- **To improve the app** — see which features are used and where people get stuck, so we can fix and prioritise.
- **To keep you informed** — streak reminders, trial-expiry notices, and renewal alerts (all optional).
- **To fix crashes** — diagnose and resolve stability problems.
- **To handle billing** — determine free vs. premium access and manage your subscription.
- **To measure our own advertising** — know which advert on Meta or X led to an install, so we spend on the ones that reach people who need Rafiq (see **Advertising measurement** above).

We do **not** sell your data, build advertising profiles of you, or use anything Rafiq reads from your screen for advertising. **There are no adverts inside Rafiq** — nothing in the app is there to sell you someone else's product. What we do measure is our **own** adverts, elsewhere, as described above.

---

## Who we share data with

We do not sell your data. We share it only with the service providers that make the app work:

- **Google Firebase** — sign-in, cloud storage for subscribers, analytics, crash reporting, notifications, and blocklist delivery. See Google's privacy policy at policies.google.com/privacy.
- **RevenueCat** — subscription and entitlement management, sitting on top of Google Play. See revenuecat.com/privacy.
- **Google Play** — payment processing for subscriptions. See policies.google.com/privacy.
- **Google Forms and Google Sheets** — and **only if you fill in the in-app feedback form**. They receive the rating you gave, whatever you wrote in the two answer boxes, and your account's email address. They receive nothing else, and nothing about your activity. See policies.google.com/privacy.
- **AppsFlyer** — advertising measurement. It receives your advertising ID, that Rafiq was installed and opened, and the four events listed under **Advertising measurement**. It never receives anything Rafiq read from your screen. This is the same in the EEA, the UK and Switzerland. See appsflyer.com/legal/services-privacy-policy.
- **Meta and X** — the attribution result only: that an install or one of those four events came from one of our campaigns. They receive nothing about your activity in Rafiq. See meta.com/privacy and x.com/en/privacy.
- **AlAdhan** (`api.aladhan.com`) — prayer-time schedules, and **only if you turn on Salah preparation**. It receives your approximate (rounded) coordinates, or the city and country you typed. It receives nothing else, and nothing about your activity. See aladhan.com.
- **Android's geocoding service** — and **only if you set up Salah preparation by typing a city**. It receives the city and country you typed, so they can be turned into coordinates. On many devices this is Google's service; on some it is handled on the phone. It receives nothing else. See policies.google.com/privacy.

There are no other third parties, no data brokers, and no advertising network that receives anything about what you do inside Rafiq.

---

## Where your data is stored, and for how long

Your cloud data is processed on Google's infrastructure in the United States. If you are outside the US, using Rafiq involves transferring your data there.

- **On your device** — block history, usage, streaks, settings, and your encrypted PIN stay until you clear the app's data or uninstall. Older block history is trimmed automatically over time.
- **In the cloud (subscribers)** — your profile, entitlement, streaks, and settings persist until you ask us to delete them.
- **Analytics and crash reports** — retained by Google under their standard policies (roughly 14 months for analytics, 90 days for crashes), then deleted automatically.
- **Notification token** — removed when you sign out, delete your account, or reset Rafiq; and deleted automatically the first time we try to use one that a device no longer holds.
- **Feedback you sent us** — kept while we are acting on it and no longer than 24 months, then deleted. Email us to have yours removed sooner.
- **Your approximate location (Salah)** — kept on your device only, until you remove it, delete your account, or reset Rafiq. Never backed up, never transferred to a new phone.

---

## Your choices and rights

- **See or export your data** — email privacy@rafiqguardian.app and we will help.
- **Correct your data** — update your Google account details, or change your settings and limits in the app.
- **Delete your data** — use Delete account in Settings to remove your account and local Rafiq data. Uninstalling also removes data on your device. Attribution records held by AppsFlyer are **not** covered by in-app deletion; email us and we will have them deleted. Both deletion routes, and the full list of what is deleted and what is kept, are set out at https://rafiq.app/delete-account/.
- **Advertising measurement** — you can object by emailing us. Wherever you are, Android's **Settings → Privacy → Ads** lets you reset or delete your advertising ID.
- **Revoke permissions** — you can turn off Accessibility, overlay, usage-access, or notifications at any time in Android Settings. Blocking stops when Accessibility is off, and Rafiq will simply invite you to turn it back on.

Depending on where you live — for example under the GDPR in the EU/EEA, or under India's data-protection law — you may have additional rights to access, correct, delete, restrict, or object to the processing of your data, and to lodge a complaint with your local authority. To exercise any of these, email privacy@rafiqguardian.app with your request and a way to verify your identity. We will respond within 30 days.

---

## Children

Rafiq is intended for people aged 15 and older. We do not knowingly collect data from anyone younger. If you believe a child has provided us data, email privacy@rafiqguardian.app and we will delete it.

---

## Changes to this policy

We may update this policy as the app evolves or as the law requires. When we do, we will change the "Last updated" date above, and for meaningful changes we will let you know inside the app. Continuing to use Rafiq after an update means you accept the revised policy.

---

## Contact

Questions, requests, or complaints: **privacy@rafiqguardian.app**

We will always try to resolve things with you directly first.
