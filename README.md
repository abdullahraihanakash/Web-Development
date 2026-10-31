# Complete Note: সব Handler টেস্ট করার গাইড (Postman)

**Base URL:** `http://localhost:3000`
**Body পাঠানোর সময়:** Body → raw → JSON
**Token header-এর নাম:** `token` (ছোট হাতের)

---

## টেস্ট করার সঠিক ক্রম

```
1. POST   /user      → user তৈরি
2. POST   /token     → login, token id কপি
3. GET    /user      → user দেখা
4. PUT    /user      → user update
5. POST   /check     → check তৈরি, check id কপি
6. GET    /check     → check দেখা
7. PUT    /check     → check update
8. DELETE /check     → check মোছা
9. PUT    /token     → token এর মেয়াদ বাড়ানো
10. DELETE /user     → user মোছা
11. DELETE /token    → logout
```

---

## 0. Sample ও NotFound

### Sample

| Field | Value |
|---|---|
| Method | `GET` (যেকোনো valid method) |
| URL | `http://localhost:3000/sample` |

**Response (200):**

```json
{ "message": "This is a sample url" }
```

### Not Found

| Field | Value |
|---|---|
| URL | `http://localhost:3000/abc` (যেটা route-এ নেই) |

**Response (404):**

```json
{ "message": "Your request url was not found!" }
```

> `/user`, `/token`, `/check`-এ `get/post/put/delete` ছাড়া অন্য method দিলে **405** আসবে।

---

# USER (`/user`)

## 1. User তৈরি (POST)

| Field | Value |
|---|---|
| Method | `POST` |
| URL | `http://localhost:3000/user` |
| Headers | কিছু লাগবে না |

**Body:**

```json
{
  "firstName": "Akash",
  "lastName": "Raihan",
  "phone": "01712345678",
  "password": "mypassword",
  "tosAgreement": true
}
```

**Rules:**

- `firstName`, `lastName`, `password`: খালি হতে পারবে না
- `phone`: ঠিক **১১ অক্ষর**
- `tosAgreement`: boolean হতে হবে

**Expected Response (200):**

```json
{ "message": "User was created successfully!" }
```

**যাচাই:** `data/users/01712345678.json` তৈরি হয়েছে এবং password **hash করা**।

| Status | কারণ |
|---|---|
| 400 | কোনো field ভুল/খালি, অথবা `User already exists!` |
| 500 | ফাইল তৈরি করা যায়নি |

---

## 2. User দেখা (GET)

| Field | Value |
|---|---|
| Method | `GET` |
| URL | `http://localhost:3000/user?phone=01712345678` |
| Headers | `token` = বৈধ টোকেন |

**Expected Response (200):** (password **থাকবে না**)

```json
{
  "firstName": "Akash",
  "lastName": "Raihan",
  "phone": "01712345678",
  "tosAgreement": true
}
```

| Status | কারণ |
|---|---|
| 403 | token ভুল/expired, বা অন্য user-এর token |
| 404 | phone ১১ অক্ষরের না, বা user নেই |

---

## 3. User Update (PUT)

| Field | Value |
|---|---|
| Method | `PUT` |
| URL | `http://localhost:3000/user` |
| Headers | `token` = বৈধ টোকেন |

**Body:** (`phone` আবশ্যক, বাকি তিনটার **অন্তত একটা** দিতে হবে)

```json
{
  "phone": "01712345678",
  "firstName": "NewName"
}
```

**Expected Response (200):**

```json
{ "message": "User was updated successfully!" }
```

**যাচাই:** `data/users/<phone>.json`-এ নতুন value এসেছে। `password` দিলে নতুন hash হবে।

| Status | কারণ |
|---|---|
| 400 | phone ভুল / কোনো update field নেই / user পাওয়া যায়নি |
| 403 | token সমস্যা |
| 500 | server সমস্যা |

---

## 4. User মোছা (DELETE)

| Field | Value |
|---|---|
| Method | `DELETE` |
| URL | `http://localhost:3000/user?phone=01712345678` |
| Headers | `token` = বৈধ টোকেন |

(phone body থেকেও দেওয়া যায়, কিন্তু query string আগে চেক হয়।)

**Expected Response (200):**

```json
{ "message": "User was successfully deleted!" }
```

**যাচাই:** `data/users/<phone>.json` চলে গেছে।

> ⚠️ User **পুরোপুরি মুছে যায়** (trash-এ যায় না)। তার token ও check ফাইল পড়ে থাকে।

| Status | কারণ |
|---|---|
| 400 | phone ভুল |
| 403 | token সমস্যা |
| 404 | user নেই |
| 500 | server সমস্যা |

---

# TOKEN (`/token`)

## 5. Login / Token তৈরি (POST)

| Field | Value |
|---|---|
| Method | `POST` |
| URL | `http://localhost:3000/token` |
| Headers | কিছু লাগবে না |

**Body:**

```json
{
  "phone": "01712345678",
  "password": "mypassword"
}
```

**Expected Response (200):**

```json
{
  "phone": "01712345678",
  "id": "xxxxxxxxxxxxxxxxxxxx",
  "expires": 1767225600000
}
```

**`id` কপি করে রাখুন**, এটাই বাকি সব request-এর `token` header।

**যাচাই:** `data/tokens/<id>.json` তৈরি হয়েছে। মেয়াদ **১ ঘণ্টা**।

| Status | কারণ |
|---|---|
| 400 | phone/password ভুল format, বা `Password is not valid!` |
| 404 | `User not found!` |
| 500 | server সমস্যা |

---

## 6. Token দেখা (GET)

| Field | Value |
|---|---|
| Method | `GET` |
| URL | `http://localhost:3000/token?id=<token_id>` |
| Headers | কিছু লাগবে না |

**Expected Response (200):** token object (`phone`, `id`, `expires`)

| Status | কারণ |
|---|---|
| 404 | id ২০ অক্ষরের না, বা token নেই |

---

## 7. Token-এর মেয়াদ বাড়ানো (PUT)

| Field | Value |
|---|---|
| Method | `PUT` |
| URL | `http://localhost:3000/token` |
| Headers | কিছু লাগবে না |

**Body:**

```json
{
  "id": "<token_id>",
  "extend": true
}
```

**Expected Response (200):**

```json
{ "message": "Token was extended successfully!" }
```

**যাচাই:** `data/tokens/<id>.json`-এ `expires` নতুন (এখন + ১ ঘণ্টা) হয়েছে।

| Status | কারণ |
|---|---|
| 400 | `extend` `true` না, id ভুল, বা `Token already expired!` |
| 404 | token নেই |
| 500 | server সমস্যা |

> মেয়াদ শেষ হয়ে গেলে আর বাড়ানো যায় না, নতুন login করতে হবে।

---

## 8. Logout / Token মোছা (DELETE)

| Field | Value |
|---|---|
| Method | `DELETE` |
| URL | `http://localhost:3000/token?id=<token_id>` |
| Headers | কিছু লাগবে না |

**Expected Response (200):**

```json
{ "message": "Token was successfully deleted!" }
```

**যাচাই:** `data/tokens/<id>.json` চলে গেছে।

| Status | কারণ |
|---|---|
| 400 | id ২০ অক্ষরের না |
| 404 | token নেই |
| 500 | server সমস্যা |

---

# CHECK (`/check`)

## 9. Check তৈরি (POST)

| Field | Value |
|---|---|
| Method | `POST` |
| URL | `http://localhost:3000/check` |
| Headers | `token` = বৈধ টোকেন |

**Body:**

```json
{
  "protocol": "http",
  "url": "google.com",
  "method": "get",
  "successCodes": [200, 201],
  "timeOutSeconds": 3
}
```

**Rules:**

- `protocol`: `http` বা `https`
- `url`: খালি না
- `method`: `get`, `post`, `put`, `delete`
- `successCodes`: array
- `timeOutSeconds`: পূর্ণসংখ্যা, **১ থেকে ৫**

**Expected Response (200):** check object (`id`, `userPhone`, `protocol`, `url`, `method`, `successCodes`, `timeOutSeconds`)

**যাচাই:**

- `data/checks/<check_id>.json` তৈরি হয়েছে
- `data/users/<phone>.json`-এর `_check` অ্যারেতে id যোগ হয়েছে

| Status | কারণ |
|---|---|
| 400 | কোনো field ভুল |
| 401 | token নেই/expired/ভুল |
| 403 | user পাওয়া যায়নি, বা ৫টা limit শেষ |
| 500 | server সমস্যা |

---

## 10. Check দেখা (GET)

| Field | Value |
|---|---|
| Method | `GET` |
| URL | `http://localhost:3000/check?id=<check_id>` |
| Headers | `token` = check-এর মালিকের টোকেন |

**Expected Response (200):** check object

| Status | কারণ |
|---|---|
| 400 | id ২০ অক্ষরের না |
| 401 | token মালিকের না / expired |
| 404 | check নেই |

---

## 11. Check Update (PUT)

| Field | Value |
|---|---|
| Method | `PUT` |
| URL | `http://localhost:3000/check` |
| Headers | `token` = check-এর মালিকের টোকেন |

**Body:** (`id` আবশ্যক, বাকি ৫টার **অন্তত একটা** দিতে হবে)

```json
{
  "id": "<check_id>",
  "url": "facebook.com",
  "timeOutSeconds": 5
}
```

**Expected Response (200):** update হওয়া পুরো check object

**যাচাই:** `data/checks/<check_id>.json`-এ শুধু দেওয়া field বদলেছে।

| Status | কারণ |
|---|---|
| 400 | id ভুল, বা কোনো update field নেই |
| 401 | token সমস্যা |
| 404 | check নেই |
| 500 | server সমস্যা |

---

## 12. Check মোছা (DELETE)

| Field | Value |
|---|---|
| Method | `DELETE` |
| URL | `http://localhost:3000/check?id=<check_id>` |
| Headers | `token` = check-এর মালিকের টোকেন |

**Expected Response (200):**

```json
{ "message": "Check was successfully deleted!" }
```

**যাচাই:**

| কী দেখবেন | কী হওয়ার কথা |
|---|---|
| `data/checks/` | ফাইল **চলে গেছে** |
| `data/trash/checks/` | `<check_id>_<সংখ্যা>.json` **তৈরি হয়েছে** |
| `data/users/<phone>.json` | `_check` অ্যারে থেকে id **সরে গেছে** |

| Status | কারণ |
|---|---|
| 400 | id ভুল |
| 401 | token সমস্যা |
| 404 | check নেই |
| 500 | server সমস্যা |

---

# Quick Cheat Sheet

| Handler | Method | URL | Token লাগে? | Input আসে কোথা থেকে |
|---|---|---|---|---|
| user | POST | `/user` | না | body |
| user | GET | `/user?phone=` | **হ্যাঁ** | query |
| user | PUT | `/user` | **হ্যাঁ** | body |
| user | DELETE | `/user?phone=` | **হ্যাঁ** | query/body |
| token | POST | `/token` | না | body |
| token | GET | `/token?id=` | না | query |
| token | PUT | `/token` | না | body |
| token | DELETE | `/token?id=` | না | query/body |
| check | POST | `/check` | **হ্যাঁ** | body |
| check | GET | `/check?id=` | **হ্যাঁ** | query |
| check | PUT | `/check` | **হ্যাঁ** | body |
| check | DELETE | `/check?id=` | **হ্যাঁ** | query/body |

---

# মনে রাখার বিষয়

- Phone ঠিক **১১ অক্ষর**, id/token ঠিক **২০ অক্ষর**
- Token **১ ঘণ্টা** পর expire হয়, `PUT /token` দিয়ে বাড়ানো যায় (expire হওয়ার আগে)
- প্রতিটি user সর্বোচ্চ **৫টা check** রাখতে পারে
- Password কখনো plain text-এ save হয় না, GET-এ ফেরতও আসে না
- Check delete হলে `trash`-এ যায়, কিন্তু **user ও token delete হলে পুরোপুরি মুছে যায়**
- Token অবশ্যই **ওই user/check-এর মালিকের** হতে হবে
- User-এর route-এ auth failure **403**, check-এর route-এ **401**
- Body পাঠালে Postman-এ `Content-Type: application/json` থাকতে হবে (raw → JSON সিলেক্ট করলে নিজে থেকেই হয়)
