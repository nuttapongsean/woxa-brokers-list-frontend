import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Woxa',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-up">
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Contact</h1>
      <p className="font-bold uppercase text-xs text-ink-dim tracking-widest mb-10">Woxa Financial Technologies</p>

      <div className="space-y-10 text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">General Enquiries</h2>
          <p>Email: <span className="text-accent">hello@woxa.io</span></p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">Broker Listings</h2>
          <p>For questions about submitting or updating a broker profile, contact our listings team at <span className="text-accent">listings@woxa.io</span>.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">Data & Privacy</h2>
          <p>For data access requests or privacy concerns, reach our Data Protection Officer at <span className="text-accent">privacy@woxa.io</span>.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">Office</h2>
          <p>1 Raffles Place, #20-61<br />One Raffles Place Tower 1<br />Singapore 048616</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">Business Hours</h2>
          <p>Monday – Friday, 09:00 – 18:00 SGT<br />Closed on Singapore public holidays.</p>
        </section>
      </div>
    </div>
  );
}
