/** Bish's RV Nexus — Tailwind v3 preset (for projects not yet on Tailwind v4).
 *  Pair with shadcn/globals.css variables (copy its :root/.dark blocks into your CSS).
 *  Usage: module.exports = { presets: [require('./shadcn/tailwind.preset.js')], content: [...] }
 *  Spacing: Tailwind's default 4px scale already matches Nexus (--sp-1 = 1 = 4px). */
const v = (name) => `var(--${name})`;
const pair = (name) => ({ DEFAULT: v(name), foreground: v(`${name}-foreground`) });

module.exports = {
  darkMode: ['class'],
  theme: {
    container: { center: true, padding: '1rem', screens: { dt: '1200px' } },
    screens: { tab: '641px', dt: '1024px', wide: '1441px' },
    extend: {
      colors: {
        border: v('border'), input: v('input'), ring: v('ring'),
        background: v('background'), foreground: v('foreground'),
        primary: pair('primary'), secondary: pair('secondary'), muted: pair('muted'),
        accent: pair('accent'), destructive: pair('destructive'),
        card: pair('card'), popover: pair('popover'),
        sidebar: {
          DEFAULT: v('sidebar'), foreground: v('sidebar-foreground'),
          primary: v('sidebar-primary'), 'primary-foreground': v('sidebar-primary-foreground'),
          accent: v('sidebar-accent'), 'accent-foreground': v('sidebar-accent-foreground'),
          border: v('sidebar-border'), ring: v('sidebar-ring'),
        },
        chart: { 1: v('chart-1'), 2: v('chart-2'), 3: v('chart-3'), 4: v('chart-4'), 5: v('chart-5') },
        gold: { DEFAULT: v('gold'), hi: v('gold-hi'), lo: v('gold-lo') },
        olive: v('olive'), cream: v('cream'), ink: v('ink'), scrim: v('scrim'),
        success: { DEFAULT: v('success'), tint: v('success-tint') },
        warning: { DEFAULT: v('warning'), tint: v('warning-tint') },
        danger: { DEFAULT: v('danger'), tint: v('danger-tint') },
        info: { DEFAULT: v('info'), tint: v('info-tint') },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', '"Barlow Condensed"', 'Impact', 'sans-serif'],
        ui: ['"Barlow Condensed"', '"Arial Narrow"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'label-sm': ['11px', { lineHeight: '1.3', letterSpacing: '0.12em' }], // 11px floor (WCAG)
        'label-md': ['11px', { lineHeight: '1.3', letterSpacing: '0.06em' }],
        'label-lg': ['13px', { lineHeight: '1.3', letterSpacing: '0.04em' }],
        'display-sm': ['20px', { lineHeight: '1.1' }],
        'display-md': ['32px', { lineHeight: '1.05' }],
        'display-lg': ['48px', { lineHeight: '1' }],
      },
      borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px' },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        decelerate: 'cubic-bezier(0, 0, 0, 1)',
        accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
      },
      transitionDuration: { fast: '150ms', normal: '250ms', slow: '350ms' },
      containers: { tab: '641px', dt: '1024px' }, // with @tailwindcss/container-queries (RF05)
      minHeight: { target: '44px' }, minWidth: { target: '44px' },     // RF08 / HIG touch targets
      zIndex: { dropdown: '100', sticky: '200', overlay: '300', modal: '400', toast: '500', tooltip: '600' },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries')],
};
