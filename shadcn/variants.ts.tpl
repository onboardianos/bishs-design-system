/**
 * Bish's RV Nexus — CVA recipes for shadcn/ui components.
 * Drop into components/ui/ and use in place of shadcn's default `buttonVariants`, `badgeVariants`, etc.
 * Every interactive recipe maps to a spec-ready v2 action class (data-bos-class):
 *   commit — filled gold, near-black text, ≤1 per screen
 *   action — gold outline, gold-lo text
 *   nav    — never gold, except gold-lo on the current item (aria-current)
 *   info   — never gold
 */
import { cva, type VariantProps } from 'class-variance-authority';

const focus = 'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';
const motion = 'transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]';

export const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap font-ui font-semibold tracking-[0.03em] ${motion} ${focus} disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0`,
  {
    variants: {
      /** commit = the screen's one job. action = state change. ghost = low emphasis. terminal = ends a visit. */
      variant: {
        commit: 'bg-primary text-primary-foreground hover:bg-gold-hi',
        action: 'border border-gold bg-transparent text-gold-lo hover:bg-gold/10 dark:text-gold-hi',
        ghost: 'bg-transparent text-foreground hover:bg-accent',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        terminal: 'bg-ink text-white border border-white hover:bg-ink/90',
        link: 'text-gold-lo underline underline-offset-2 hover:text-gold dark:text-gold-hi',
      },
      size: {
        sm: 'h-8 px-3 text-xs',            // compact density only
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',         // comfortable density / mobile primary
        icon: 'size-11',                   // 44×44 touch target
      },
      shape: { default: 'rounded-md', pill: 'rounded-full' },
      /** Full-width CTA on mobile (HIG §9 divergence: full-width mobile CTAs). */
      block: { true: 'w-full', false: '' },
    },
    defaultVariants: { variant: 'action', size: 'md', shape: 'default', block: false },
  }
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;
/** Map a button variant to its data-bos-class stamp. */
export const bosClassFor = (variant: ButtonVariants['variant']) =>
  variant === 'commit' ? 'commit' : variant === 'link' ? 'nav' : 'action';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 font-ui text-[11px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap border',
  {
    variants: {
      tone: {
        success: 'bg-success-tint text-success border-success/30',
        warning: 'bg-warning-tint text-warning border-warning/30',
        danger: 'bg-danger-tint text-danger border-danger/30',
        info: 'bg-info-tint text-info border-info/30',
        neutral: 'bg-muted text-muted-foreground border-border',
        brand: 'bg-gold/10 text-gold-lo border-gold/30 dark:text-gold-hi',
      },
      shape: { pill: 'rounded-full px-2.5 py-0.5', chip: 'rounded-sm px-2 py-0.5 bg-transparent' },
    },
    defaultVariants: { tone: 'neutral', shape: 'pill' },
  }
);
export type BadgeVariants = VariantProps<typeof badgeVariants>;

export const inputVariants = cva(
  `flex h-11 w-full rounded-md border border-input bg-card px-3 font-sans text-base text-foreground placeholder:text-muted-foreground ${motion} focus-visible:outline-none focus-visible:border-gold-hi focus-visible:ring-[3px] focus-visible:ring-gold/15 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/15`,
  { variants: { shape: { default: 'rounded-md', pill: 'rounded-full' } }, defaultVariants: { shape: 'default' } }
);

export const cardVariants = cva('rounded-lg border border-border bg-card text-card-foreground overflow-hidden', {
  variants: {
    /** hero = high-salience card: ink fill + gold accent edge. Gold is never a card fill. */
    emphasis: { default: 'shadow-sm dark:shadow-none', hero: 'bg-ink text-white border-l-4 border-l-gold-hi' },
  },
  defaultVariants: { emphasis: 'default' },
});

/** Side panel / drawer / tab bar item. Current item = gold-lo text + indicator bar; never a gold fill. */
export const navItemVariants = cva(
  `relative flex min-h-11 items-center gap-3 rounded-md font-ui font-medium uppercase tracking-[0.03em] ${motion} ${focus}`,
  {
    variants: {
      current: {
        true: 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold before:absolute before:left-0 before:top-2.5 before:bottom-2.5 before:w-[3px] before:rounded before:bg-sidebar-accent-foreground',
        false: 'text-sidebar-foreground hover:bg-sidebar-accent/60',
      },
      collapsed: { true: 'justify-center px-0', false: 'px-3' },
    },
    defaultVariants: { current: false, collapsed: false },
  }
);

export const tabItemVariants = cva(
  'relative flex min-h-14 min-w-0 flex-col items-center justify-end gap-1 pb-1 font-ui text-[11px] font-semibold uppercase tracking-[0.06em]',
  { variants: { current: { true: 'text-gold-lo dark:text-gold-hi font-bold', false: 'text-muted-foreground' } }, defaultVariants: { current: false } }
);

/** Mobile center Action: raised black disc, white ring, tap-hand glyph (assets/icon-action-tap.svg). */
export const actionFabVariants = cva(
  'absolute -top-[30px] left-1/2 -translate-x-1/2 flex size-[62px] items-center justify-center rounded-full bg-ink border-4 border-card shadow-lg'
);
