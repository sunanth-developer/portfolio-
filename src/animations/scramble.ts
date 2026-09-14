const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function scrambleTo(
  target: string,
  onFrame: (value: string) => void,
  duration = 700,
) {
  const start = performance.now()
  let frame = 0

  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration)
    const locked = Math.floor(progress * target.length)
    const next = target
      .split('')
      .map((char, index) => {
        if (char === ' ' || char === '.' || index < locked) return char
        return glyphs[Math.floor(Math.random() * glyphs.length)] ?? char
      })
      .join('')

    onFrame(next)
    frame += 1
    if (progress < 1 && frame < 80) requestAnimationFrame(tick)
    else onFrame(target)
  }

  requestAnimationFrame(tick)
}
