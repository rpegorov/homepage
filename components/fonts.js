// Шрифты бренда craftzman: вариативные woff2-сабсеты (latin + cyrillic),
// лежат в public/fonts — без запросов к Google Fonts.
const Fonts = () => (
  <style jsx global>{`
    @font-face {
      font-family: 'Lora';
      src: url('/fonts/Lora.woff2') format('woff2');
      font-weight: 400 700;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Lora';
      src: url('/fonts/Lora-Italic.woff2') format('woff2');
      font-weight: 400 700;
      font-style: italic;
      font-display: swap;
    }
    @font-face {
      font-family: 'Golos Text';
      src: url('/fonts/GolosText.woff2') format('woff2');
      font-weight: 400 900;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'JetBrains Mono';
      src: url('/fonts/JetBrainsMono.woff2') format('woff2');
      font-weight: 100 800;
      font-style: normal;
      font-display: swap;
    }
  `}</style>
)
export default Fonts
