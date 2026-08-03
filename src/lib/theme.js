export function applyTheme(theme) {
  const root = document.documentElement.style
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.setProperty(`--color-${key}`, value)
  })
  Object.entries(theme.fonts).forEach(([key, value]) => {
    root.setProperty(`--font-${key}`, value)
  })
}
