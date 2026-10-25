/** Shares the navbar's horizontal box so section columns align with the hero. */
export function ColumnLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-y-0 inset-x-5 mx-auto max-w-[1408px] sm:inset-x-8 lg:inset-x-12">
        <div className="absolute inset-y-0 left-0 w-px bg-black/[0.07] dark:bg-white/[0.08]" />
        <div className="absolute inset-y-0 right-0 w-px bg-black/[0.07] dark:bg-white/[0.08]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-black/[0.07] dark:bg-white/[0.08] sm:block" />
        <div className="absolute inset-y-0 left-1/4 hidden w-px bg-black/[0.07] dark:bg-white/[0.08] lg:block" />
        <div className="absolute inset-y-0 left-3/4 hidden w-px bg-black/[0.07] dark:bg-white/[0.08] lg:block" />
      </div>
    </div>
  )
}
