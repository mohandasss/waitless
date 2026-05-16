/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			sm: '0.5rem',
  			DEFAULT: '1rem',
  			md: '1.5rem',
  			lg: '2rem',
  			xl: '3rem',
  			full: '9999px',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
        
        // Custom Design System Colors
        surface: 'hsl(var(--surface))',
        'surface-dim': 'hsl(var(--surface-dim))',
        'surface-bright': 'hsl(var(--surface-bright))',
        'surface-container-lowest': 'hsl(var(--surface-container-lowest))',
        'surface-container-low': 'hsl(var(--surface-container-low))',
        'surface-container': 'hsl(var(--surface-container))',
        'surface-container-high': 'hsl(var(--surface-container-high))',
        'surface-container-highest': 'hsl(var(--surface-container-highest))',
        'on-surface': 'hsl(var(--on-surface))',
        'on-surface-variant': 'hsl(var(--on-surface-variant))',
        'inverse-surface': 'hsl(var(--inverse-surface))',
        'inverse-on-surface': 'hsl(var(--inverse-on-surface))',
        outline: 'hsl(var(--outline))',
        'outline-variant': 'hsl(var(--outline-variant))',
        'surface-tint': 'hsl(var(--surface-tint))',
        'primary-container': 'hsl(var(--primary-container))',
        'on-primary-container': 'hsl(var(--on-primary-container))',
        'inverse-primary': 'hsl(var(--inverse-primary))',
        'secondary-container': 'hsl(var(--secondary-container))',
        'on-secondary-container': 'hsl(var(--on-secondary-container))',
        tertiary: 'hsl(var(--tertiary))',
        'on-tertiary': 'hsl(var(--on-tertiary))',
        'tertiary-container': 'hsl(var(--tertiary-container))',
        'on-tertiary-container': 'hsl(var(--on-tertiary-container))',
        'error-container': 'hsl(var(--error-container))',
        'on-error-container': 'hsl(var(--on-error-container))',
        'primary-fixed': 'hsl(var(--primary-fixed))',
        'primary-fixed-dim': 'hsl(var(--primary-fixed-dim))',
        'on-primary-fixed': 'hsl(var(--on-primary-fixed))',
        'on-primary-fixed-variant': 'hsl(var(--on-primary-fixed-variant))',
        'secondary-fixed': 'hsl(var(--secondary-fixed))',
        'secondary-fixed-dim': 'hsl(var(--secondary-fixed-dim))',
        'on-secondary-fixed': 'hsl(var(--on-secondary-fixed))',
        'on-secondary-fixed-variant': 'hsl(var(--on-secondary-fixed-variant))',
        'tertiary-fixed': 'hsl(var(--tertiary-fixed))',
        'tertiary-fixed-dim': 'hsl(var(--tertiary-fixed-dim))',
        'on-tertiary-fixed': 'hsl(var(--on-tertiary-fixed))',
        'on-tertiary-fixed-variant': 'hsl(var(--on-tertiary-fixed-variant))',
        'surface-variant': 'hsl(var(--surface-variant))',
  		},
      spacing: {
        'unit': '8px',
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'container-padding': '24px',
        'gutter': '16px',
      },
      fontSize: {
        'headline-lg': ['28px', { lineHeight: '34px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg-mobile': ['24px', { lineHeight: '30px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'card-title': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'wait-time': ['16px', { lineHeight: '20px', fontWeight: '500' }],
        'body-cta': ['16px', { lineHeight: '20px', fontWeight: '600' }],
        'meta-label': ['14px', { lineHeight: '18px', fontWeight: '400' }],
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}