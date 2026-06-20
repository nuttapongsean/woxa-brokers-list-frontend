import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Woxa',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-up">
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Privacy Policy</h1>
      <p className="font-bold uppercase text-xs text-ink-dim uppercase tracking-widest mb-10">Last updated: January 2025</p>

      <div className="space-y-10 text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">1. Information We Collect</h2>
          <p>Woxa collects information you provide when creating an account, submitting broker listings, or contacting support. This includes your name, email address, and usage data generated while interacting with our platform.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">2. How We Use Your Information</h2>
          <p>We use collected data to operate and improve the platform, send account-related communications, prevent fraud, and comply with applicable financial regulations. We do not sell personal data to third parties.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">3. Data Retention</h2>
          <p>Account data is retained for the duration of your account and up to 7 years thereafter to meet regulatory obligations. You may request deletion of non-regulated data at any time.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">4. Cookies</h2>
          <p>We use HTTP-only session cookies for authentication. No advertising or cross-site tracking cookies are used. Analytics data is aggregated and anonymized.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">5. Contact</h2>
          <p>For privacy-related inquiries, contact our Data Protection Officer at <span className="text-accent">privacy@woxa.io</span>.</p>
        </section>
      </div>
    </div>
  );
}
