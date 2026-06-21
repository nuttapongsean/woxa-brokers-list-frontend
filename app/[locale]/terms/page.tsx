import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Woxa',
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-up">
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Terms of Service</h1>
      <p className="font-bold uppercase text-xs text-ink-dim uppercase tracking-widest mb-10">Effective: January 2025</p>

      <div className="space-y-10 text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">1. Acceptance</h2>
          <p>By accessing Woxa you agree to these Terms. If you do not agree, do not use the platform. These Terms constitute a binding agreement between you and Woxa Financial Technologies Ltd.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">2. Eligibility</h2>
          <p>You must be at least 18 years of age and legally permitted to access financial information services in your jurisdiction. Woxa is a listing and information platform, not a licensed broker or investment adviser.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">3. Broker Listings</h2>
          <p>Broker profiles are submitted by third parties. Woxa does not verify, endorse, or guarantee the accuracy of listing content. Always conduct independent due diligence before engaging with any listed broker.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">4. Prohibited Use</h2>
          <p>You may not use the platform to distribute misleading financial information, scrape data for commercial resale, or circumvent access controls. Violations may result in immediate account termination.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">5. Limitation of Liability</h2>
          <p>Woxa is provided as is. We are not liable for investment losses, reliance on broker listing data, or service interruptions. Our maximum liability is limited to amounts paid to us in the preceding 12 months.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">6. Governing Law</h2>
          <p>These Terms are governed by the laws of Singapore. Disputes shall be resolved by arbitration under SIAC rules.</p>
        </section>
      </div>
    </div>
  );
}
