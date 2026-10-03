/**
 * Firestore Security Rules Specification Tests ("Dirty Dozen" Payloads)
 * Verifies that all 12 adversarial payloads against /reviews/{reviewId} are denied
 * while legitimate public pending creation, public approved reads, and verified
 * admin (mustafanasiri345@gmail.com) moderation actions are permitted.
 */
export interface SecurityTestCase {
  id: number;
  name: string;
  actor: 'anonymous' | 'other_google_user' | 'unverified_admin_email' | 'verified_admin';
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED' | 'ALLOWED';
}

export const DIRTY_DOZEN_TESTS: SecurityTestCase[] = [
  {
    id: 1,
    name: 'Pre-Approved Creation Attack',
    actor: 'anonymous',
    operation: 'create',
    path: '/reviews/rev_01',
    payload: {
      name: 'Attacker',
      rating: 5,
      message: 'Attempting to self-approve review.',
      status: 'approved',
      createdAt: 'REQUEST_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 2,
    name: 'Shadow Field Injection on Create',
    actor: 'anonymous',
    operation: 'create',
    path: '/reviews/rev_02',
    payload: {
      name: 'Attacker',
      rating: 5,
      message: 'Injecting shadow field.',
      status: 'pending',
      createdAt: 'REQUEST_TIME',
      isAdmin: true
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 3,
    name: 'Spoofed Admin Email with email_verified == false',
    actor: 'unverified_admin_email',
    operation: 'list',
    path: '/reviews',
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 4,
    name: 'Unauthorized Google Account Moderation Attempt',
    actor: 'other_google_user',
    operation: 'update',
    path: '/reviews/rev_pending_1',
    payload: {
      status: 'approved',
      updatedAt: 'REQUEST_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 5,
    name: 'Public Pending List Scrape',
    actor: 'anonymous',
    operation: 'list',
    path: '/reviews?status=pending',
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'Public Pending Document Get',
    actor: 'anonymous',
    operation: 'get',
    path: '/reviews/rev_pending_1',
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 7,
    name: 'Rating Out-of-Bounds Attack',
    actor: 'anonymous',
    operation: 'create',
    path: '/reviews/rev_07',
    payload: {
      name: 'Visitor',
      rating: 99,
      message: 'Invalid star rating.',
      status: 'pending',
      createdAt: 'REQUEST_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 8,
    name: 'Message Overflow Attack (> 1500 chars)',
    actor: 'anonymous',
    operation: 'create',
    path: '/reviews/rev_08',
    payload: {
      name: 'Visitor',
      rating: 5,
      message: 'A'.repeat(2000),
      status: 'pending',
      createdAt: 'REQUEST_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 9,
    name: 'Client Timestamp Forgery',
    actor: 'anonymous',
    operation: 'create',
    path: '/reviews/rev_09',
    payload: {
      name: 'Visitor',
      rating: 5,
      message: 'Forged timestamp value.',
      status: 'pending',
      createdAt: '2020-01-01T00:00:00Z'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 10,
    name: 'Public Delete Attempt',
    actor: 'anonymous',
    operation: 'delete',
    path: '/reviews/rev_approved_1',
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 11,
    name: 'Public Status Mutation Attempt',
    actor: 'anonymous',
    operation: 'update',
    path: '/reviews/rev_pending_1',
    payload: {
      status: 'approved',
      updatedAt: 'REQUEST_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Admin Content Tampering on Update',
    actor: 'verified_admin',
    operation: 'update',
    path: '/reviews/rev_pending_1',
    payload: {
      message: 'Modified reviewer text',
      status: 'approved',
      updatedAt: 'REQUEST_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  }
];
