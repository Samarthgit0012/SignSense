import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-2 text-base text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2 focus:ring-offset-(--color-background) disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"

export { Input }
