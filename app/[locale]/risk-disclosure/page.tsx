import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Risk Disclosure | Woxa',
  robots: { index: false },
};

export default function RiskDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-display text-3xl font-bold text-ink">Risk Disclosure</h1>
      </div>
      <p className="font-bold uppercase text-xs text-ink-dim uppercase tracking-widest mb-10">Important — Please read carefully</p>

      <div className="space-y-10 text-sm text-ink-muted leading-relaxed">
        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">Market Risk</h2>
          <p>Prices of financial instruments can fluctuate rapidly and unpredictably. CFDs, bonds, equities, and crypto assets are all subject to market volatility. Leverage amplifies both gains and losses.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">Liquidity Risk</h2>
          <p>Some instruments or markets may become illiquid during periods of extreme volatility, making it difficult to execute orders at desired prices or exit positions.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">Counterparty Risk</h2>
          <p>Broker insolvency or operational failure may result in loss of funds. Always verify that any broker you engage with holds appropriate regulatory authorization in your jurisdiction.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">Regulatory Risk</h2>
          <p>Regulatory changes in any jurisdiction can affect the availability or legality of certain financial products. It is your responsibility to ensure compliance with local laws.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-ink mb-3">No Investment Advice</h2>
          <p>Nothing on this platform constitutes investment advice, a solicitation, or a recommendation to buy or sell any financial instrument. Consult a licensed financial adviser before making investment decisions.</p>
        </section>
      </div>
    </div>
  );
}
