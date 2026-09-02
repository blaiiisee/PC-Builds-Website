const socials = ["Facebook", "TikTok"];

export function SocialsPage() {
  return (
    <main className="page text-page">
      <p className="eyebrow">Socials</p>
      <h1>Follow the next build.</h1>

      <div className="social-list">
        {socials.map((social) => (
          <div className="social-row" key={social}>
            <span>{social}</span>
            <span className="coming-soon">Coming soon</span>
          </div>
        ))}
      </div>
    </main>
  );
}
