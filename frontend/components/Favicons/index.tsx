export default function Favicons({ theme }: { theme: string }) {
  if (theme === "theme-light") {
    return (
      <>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/rebel-alliance-96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/rebel-alliance-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/rebel-alliance-16.png"
        />
      </>
    );
  }

  if (theme === "theme-dark") {
    return (
      <>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/galactic-empire-96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/galactic-empire-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/galactic-empire-16.png"
        />
      </>
    );
  }
}
