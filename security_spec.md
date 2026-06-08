# Security Specification

## 1. Data Invariants

* **Identity Bound Users:** Every document modified in `/users/{userId}` must verify that `{userId} == request.auth.uid` to prevent users from altering or hijacking other users' profiles.
* **Service Authorship:** Users can only create or edit documents in `/services` if they have `request.auth.uid == incoming().authorId`.
* **Private Conversations:** Access to conversations (under `/conversations/{conversationId}`) is strictly restricted to authenticated users whose `uid` is in the `participants` array to prevent cross-account wiretapping.
* **Immutable Creation Fields:** System fields like `createdAt` and user identifying fields like `authorId`, `clientId`, or `freelanceId` are immutable during updates.
* **Strict Size and Types:** Every string field must be bound by size constraints to deny potential resource exhaustion vectors.
* **Email Verification:** Users must be authenticated with verified email to register, write, or publish services (`request.auth.token.email_verified == true`).

---

## 2. The "Dirty Dozen" Malicious Payloads

The following malicious scenarios must yield a `PERMISSION_DENIED` result on the server-side to guarantee system integrity:

### 1. Identity Spoofing - Modify other user's profile
```json
// Target: /users/target_user_abc
{
  "displayName": "Hacker Nickname",
  "role": "freelance",
  "email": "malicious@attacker.com"
}
```

### 2. Escalation of Privilege on Join - Self-assign admin rights
```json
// Target: /users/attacker_uid
{
  "uid": "attacker_uid",
  "displayName": "Sneaky Joe",
  "role": "admin",
  "email": "joe@attacker.com"
}
```

### 3. Service Arbitrary Creation - Publish service as another user
```json
// Target: /services/malicious_service_123
{
  "title": "Phishing Assistance",
  "category": "Code",
  "price": "50€",
  "délai": "1 day",
  "auteur": "Safe Freelancer",
  "authorId": "other_innocent_user_uid"
}
```

### 4. Wiretapping - Read other conversation thread
```json
// Request: get(/conversations/clients_and_expert_chat) as user_who_is_not_participant
```

### 5. Conversation Spoofing - Fabricate chats between victims
```json
// Target: /conversations/fake_thread
{
  "participants": ["victim_a", "victim_b"],
  "lastMessageText": "Fake agreement",
  "updatedAt": "request.time"
}
```

### 6. Message Forgery - Impersonate sender in another conversation
```json
// Target: /conversations/valid_thread_id/messages/msg_999
{
  "text": "Send money immediately to hacker@banking.com",
  "senderId": "victim_a",
  "senderName": "Victim User",
  "timestamp": "request.time"
}
```

### 7. Resource Poisoning - Overlong description field
```json
// Target: /services/service_xyz
{
  "title": "Very long title designed to crash things" + "A".repeat(5000),
  "category": "Code",
  "price": "200€",
  "délai": "1 day",
  "authorId": "attacker_uid",
  "auteur": "Attacker"
}
```

### 8. Immutable Theft - Edit createdAt after creation
```json
// Target: /services/valid_service_id
// Existing: { "createdAt": Timestamp(A) }
// Update payload:
{
  "createdAt": "Timestamp(B)",
  "title": "Some update"
}
```

### 9. Self-Approved Status - Modify project milestone arbitrarily
```json
// Target: /projects/cmd_123
// Payload:
{
  "status": "completed",
  "lastUpdate": "Hacker completed everything"
}
```

### 10. Spam Security Logs - Write arbitrary logs as another IP/User
```json
// Target: /security_logs/log_999
{
  "userId": "other_user_id",
  "date": "Now",
  "event": "Fake security alert",
  "status": "Sécurisé",
  "ip": "255.255.255.255"
}
```

### 11. False Rating - Inject non-numeric rating score to system
```json
// Target: /services/user_service
{
  "rating": "five-stars"
}
```

### 12. Denial of Wallet - Inject non-alphanumeric special keys inside IDs
```json
// Target: /services/$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
```

---

## 3. Test Runner Schema (firestore.rules.test.ts)

A code setup using `@firebase/rules-unit-testing` or manual assertions can verify these cases as described by the secure Zero-Trust policy.
Our final rule set guarantees full validation of these rules under dry builds and automated deployment test cases.
