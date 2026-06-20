import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { signSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/lib/session';

export async function POST() {
  const token = await signSession();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_MAX_AGE,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
