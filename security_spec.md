# Security Specification — Nasiri Production Review Moderation System

## 1. Data Invariants

1. **Public Read Isolation**: Public visitors (unauthenticated or non-admin users) may ONLY read (`get` or `list`) documents in `/reviews/{reviewId}` where `resource.data.status == 'approved'`. Pending and rejected reviews are strictly private to the administrator.
2. **Public Creation Constraint**: Anyone may submit a new review to `/reviews/{reviewId}`, provided:
   - `reviewId` is a valid alphanumeric/hyphen/underscore ID (`<= 128` chars).
   - The payload contains ONLY `['name', 'rating', 'message', 'status', 'createdAt']`.
   - `status` is strictly `'pending'` (visitors can never create pre-approved reviews).
   - `name` is a non-empty string (`1..100` chars).
   - `rating` is an integer in `[1, 2, 3, 4, 5]`.
   - `message` is a string (`8..1500` chars).
   - `createdAt` equals `request.time` (server timestamp).
3. **Admin Exclusive Moderation**: Only the verified Google account `mustafanasiri345@gmail.com` (`request.auth.token.email_verified == true`) may:
   - Read (`get` / `list`) pending or rejected reviews.
   - Update review `status` (`'approved'`, `'rejected'`, `'pending'`) and `updatedAt`.
   - Delete a review document.
4. **Immutable Review Content**: Even during admin status updates, original submission fields (`name`, `rating`, `message`, `createdAt`) are immutable (`incoming().field == existing().field`).

## 2. The "Dirty Dozen" Payloads

1. **Pre-Approved Creation Attack**: Public visitor attempts `create` with `status: "approved"`.
2. **Shadow Field Injection on Create**: Public visitor attempts `create` with extra field `isAdmin: true`.
3. **Spoofed Admin Email (Unverified)**: Attacker authenticates with `email: "mustafanasiri345@gmail.com"` but `email_verified: false` and attempts to read pending reviews.
4. **Unauthorized Google Account Moderation**: Another verified Google user (`other@gmail.com`) attempts to `update` a pending review to `status: "approved"`.
5. **Public Pending List Scrape**: Unauthenticated visitor attempts `list` on `/reviews` without `where('status', '==', 'approved')`.
6. **Public Pending Document Get**: Unauthenticated visitor attempts `get` on `/reviews/pendingRev1` where `status == 'pending'`.
7. **Rating Out-of-Bounds Attack**: Public visitor attempts `create` with `rating: 99` or `rating: 0`.
8. **Message Overflow (Denial of Wallet)**: Public visitor attempts `create` with a 5,000-character `message`.
9. **Client Timestamp Forgery**: Public visitor attempts `create` with a forged past/future `createdAt` timestamp instead of `request.time`.
10. **Public Delete Attempt**: Public visitor attempts `delete` on an existing review.
11. **Public Status Mutation**: Public visitor attempts `update` on a pending review to set `status: "approved"`.
12. **Admin Content Tampering on Update**: Admin updates `status` while also mutating `message` or `rating` (violating immutability of original review content).
