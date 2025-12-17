// preload.js
const { ipcRenderer } = require('electron')

const darkModeFilter = `
  html {
    background-color: white !important;
    filter: invert(0.92) hue-rotate(180deg) !important;
  }
  img, video, iframe, [style*="background-image"] {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  /* Make emojis grayscale */
  .emoji, #electron-dark-toggle {
    filter: grayscale(100%) brightness(0.7) opacity(20%) !important;
  }
`

const toggleButtonHTML = `
<button id="electron-dark-toggle" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 1;
  filter: grayscale(100%) brightness(0.7) opacity(20%);
  transition: transform 0.2s;
">🌙</button>
`

window.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style')
  style.id = 'electron-force-dark'
  document.head.appendChild(style)

  const div = document.createElement('div')
  div.innerHTML = toggleButtonHTML
  document.body.appendChild(div)
  const toggleBtn = document.getElementById('electron-dark-toggle')

  // Clean text once
  document.querySelectorAll('h2.header').forEach(header => {
    header.textContent = header.textContent.replace(/\s*\(.*?\)\s*/g, '')
  })

  // System theme detection
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
  let isDark = darkThemeMq.matches

  const applyDarkMode = (darkState) => {
    isDark = darkState
    style.innerHTML = isDark ? darkModeFilter : ''
    toggleBtn.textContent = isDark ? '☀️' : '🌙'
    toggleBtn.style.transform = isDark ? 'rotate(180deg)' : 'rotate(0deg)'
    ipcRenderer.send('dark-mode-toggled', isDark)
  }

  applyDarkMode(isDark)

  toggleBtn.addEventListener('click', () => {
    applyDarkMode(!isDark)
  })

  darkThemeMq.addEventListener('change', (e) => {
    applyDarkMode(e.matches)
  })
})
