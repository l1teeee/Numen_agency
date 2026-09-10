/**
 * The Numen N, in the official geometry. These are the same three shapes as
 * public/favicon.svg, so the navbar mark, the footer mark and the browser tab
 * icon are one drawing rather than three lookalikes.
 */
export function NumenMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <rect x="5.5" y="5.5" width="4" height="21" />
      <polygon points="9.5,5.5 13.5,5.5 22.5,26.5 18.5,26.5" />
      <rect x="22.5" y="5.5" width="4" height="21" />
    </svg>
  )
}
