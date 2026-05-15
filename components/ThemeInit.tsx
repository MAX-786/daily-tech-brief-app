// Renders an inline <script> before any React hydration so the correct
// theme class is on <html> before first paint — no flash.
export default function ThemeInit() {
  const script = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var resolved = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add(resolved);
    // Patch: also remove the opposite class just in case
    document.documentElement.classList.remove(resolved === 'dark' ? 'light' : 'dark');
  } catch(e) {}
})();
`.trim();

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
