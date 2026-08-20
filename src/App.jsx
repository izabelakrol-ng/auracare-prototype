import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search as SearchIcon,
  MapPin,
  ChevronDown,
  Star,
  Clock,
  Check,
  Minus,
  X,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Smartphone,
  Wallet,
  ShieldCheck,
  Sparkles,
  Heart,
  User,
  Users,
  Info,
  CheckCircle2,
  Loader2,
  CalendarPlus,
  LayoutDashboard,
  Droplets,
  Leaf,
  Activity,
  Snowflake,
  Waves,
} from "lucide-react";

/* =============================================================================
   AuraCare · a HealthTech booking prototype
   Built STRICTLY on the Silk Design System (@silk/components).

   Silk ships brand skins as design-token "modes" (default · bazaar · netguru…).
   AuraCare is implemented the same way: every Silk *semantic token name*
   (--color-surface-interactive-strong, --color-text-primary, --radius-m, the
   text-* composite typography utilities, shadow-*-top-light …) is preserved
   1:1, and only the token VALUES are remapped to the AuraCare palette:

     · Deep Emerald  → interactive / accent (primary actions, headers)
     · Muted Cream   → surface / page background tokens
     · Soft Slate    → neutral borders + text tokens
     · Mint / Gold   → semantic (success) + attention (badge) tokens

   Components below mirror the exact anatomy, variant/size prop maps and
   state matrix (default·hover·active·focus·disabled·loading·error·success)
   of the real Silk source, so this file is a faithful Silk DS prototype that
   still runs standalone in a Claude Artifact.
============================================================================= */

/* ---------------------------------------------------------------- cn helper */
const cn = (...a) => a.flat(Infinity).filter(Boolean).join(" ");

/* ------------------------------------------------- Silk tokens → AuraCare */
const SILK_TOKENS = `
:root {
  /* ── Shape · radius ─────────────────────────── */
  --radius-none: 0px;  --radius-xs: 2px;  --radius-s: 4px;
  --radius-m: 8px;     --radius-l: 12px;  --radius-xl: 16px; --radius-full: 999px;

  /* ── Elevation · shadows ────────────────────── */
  --shadow-soft: rgba(31,54,45,0.10);
  --shadow-small-top-light: 0px 1px 3px rgba(31,54,45,0.06);
  --shadow-medium-top-light: 0px 8px 24px rgba(31,54,45,0.12);
  --shadow-large-top-light: 0px 16px 32px rgba(31,54,45,0.10), 0px 2px 12px rgba(31,54,45,0.08);

  /* ── Color · text (Soft Slate, warm) ────────── */
  --color-text-title: #17251f;
  --color-text-primary: #26302a;
  --color-text-secondary: #4e574f;
  --color-text-tertiary: #6e766c;
  --color-text-label: #26302a;
  --color-text-placeholder: #8a9189;
  --color-text-inverted: #ffffff;
  --color-text-interactive: #1b2c26;
  --color-text-hover-interactive: #14211c;
  --color-text-active-interactive: #0e1713;
  --color-text-interactive-on-accent: #ffffff;
  --color-text-hover-interactive-on-accent: #e4eae7;
  --color-text-active-interactive-on-accent: #d0dad5;
  --color-text-disabled-interactive: #b9c1ba;
  --color-text-disabled-primary: #949c93;
  --color-text-disabled-secondary: #aab1a9;
  --color-text-disabled-tertiary: #c2c8c0;
  --color-text-disabled-label: #949c93;

  /* ── Color · surface (Muted Cream + white cards) */
  --color-surface-page: #ffffff;
  --color-surface-base: #ffffff;
  --color-surface-inverted: #ffffff;
  --color-surface-neutral-stronger: #1b2c26;
  --color-surface-neutral-strong: #94998f;
  --color-surface-neutral-medium: #e7ece9;
  --color-surface-neutral-soft: #f4f6f5;
  --color-surface-interactive-strong: #1b2c26;
  --color-surface-interactive-medium: #d9e3de;
  --color-surface-interactive-soft: #eef2f0;
  --color-surface-overlay-strong: rgba(20,35,29,0.55);
  --color-surface-overlay-soft: rgba(20,35,29,0.16);
  --color-surface-hover-base: #f4f7f5;
  --color-surface-hover-neutral-stronger: #14211c;
  --color-surface-hover-neutral-medium: #dbe2df;
  --color-surface-hover-neutral-soft: #e7ece9;
  --color-surface-hover-interactive-strong: #14211c;
  --color-surface-hover-interactive-medium: #c7d5ce;
  --color-surface-hover-interactive-soft: #e2ebe7;
  --color-surface-active-base: #eef2f0;
  --color-surface-active-neutral-stronger: #0e1713;
  --color-surface-active-neutral-medium: #c9d3ce;
  --color-surface-active-neutral-soft: #dbe2df;
  --color-surface-active-interactive-strong: #0e1713;
  --color-surface-active-interactive-medium: #b4c7be;
  --color-surface-active-interactive-soft: #d9e3de;
  --color-surface-disabled-base: #eef0ef;
  --color-surface-disabled-strong-stronger: #c4ccc8;
  --color-surface-disabled-medium-soft-softer: #eef0ef;

  /* ── Color · border (Soft Slate, warm) ──────── */
  --color-border-interactive-strong: #1b2c26;
  --color-border-interactive-medium: #7f958d;
  --color-border-neutral-strong: #a7a093;
  --color-border-neutral-medium: #c9c2b4;
  --color-border-neutral-soft: #e4ddd0;
  --color-border-neutral-softer: #efe9dd;
  --color-border-inverted: #ffffff;
  --color-border-hover-neutral-strong: #8a8375;
  --color-border-hover-neutral-medium: #a7a093;
  --color-border-hover-neutral-soft: #c9c2b4;
  --color-border-hover-neutral-softer: #e4ddd0;
  --color-border-hover-interactive-strong: #14211c;
  --color-border-hover-interactive-medium: #4a5f57;
  --color-border-active-neutral-strong: #6e766c;
  --color-border-active-neutral-medium: #8a8375;
  --color-border-active-neutral-soft: #a7a093;
  --color-border-active-neutral-softer: #c9c2b4;
  --color-border-active-interactive-strong: #14211c;
  --color-border-active-interactive-medium: #1b2c26;
  --color-border-disabled-medium-soft-softer: #e4ddd0;
  --color-border-disabled-strong-stronger: #c8c1b3;

  /* ── Color · semantic · success (Mint) ──────── */
  --color-semantic-success-strong: #0e9c7e;
  --color-semantic-success-medium: #b7e7da;
  --color-semantic-success-soft: #f0faf6;
  --color-semantic-success-hover-strong: #0b8069;
  --color-semantic-success-hover-medium: #9eddcb;
  --color-semantic-success-hover-soft: #e1f5f0;
  --color-semantic-success-active-strong: #096853;
  --color-semantic-success-active-medium: #6fcbb4;
  --color-semantic-success-active-soft: #b7e7da;

  /* ── Color · semantic · warning (Gold) ──────── */
  --color-semantic-warning-strong: #a9791a;
  --color-semantic-warning-medium: #f2dead;
  --color-semantic-warning-soft: #fbf6ea;
  --color-semantic-warning-hover-strong: #8f6510;
  --color-semantic-warning-hover-medium: #eed594;
  --color-semantic-warning-hover-soft: #f7efdb;
  --color-semantic-warning-active-strong: #6e4e0c;
  --color-semantic-warning-active-medium: #e4c169;
  --color-semantic-warning-active-soft: #f2dead;

  /* ── Color · semantic · error ───────────────── */
  --color-semantic-error-strong: #c0392b;
  --color-semantic-error-medium: #f5c6c0;
  --color-semantic-error-soft: #fbf4f2;
  --color-semantic-error-hover-strong: #a63224;
  --color-semantic-error-hover-medium: #efaaa2;
  --color-semantic-error-active-strong: #8c2a1e;
  --color-semantic-error-active-medium: #e6867b;
  --color-semantic-error-active-soft: #f5c6c0;

  --color-core-white: #ffffff;
  --color-core-black: #000000;
  --color-focus-ring: #17251f;
  --color-focus-offset: #ffffff;
}

/* ── Composite typography utilities (Silk text-* tokens) ───────────────── */
.text-display { font-weight:600; font-size:4.5rem; line-height:120%; letter-spacing:0px; }
.text-h1 { font-weight:600; font-size:3rem;   line-height:120%; letter-spacing:0px; }
.text-h2 { font-weight:600; font-size:2rem;   line-height:140%; letter-spacing:0px; }
.text-h3 { font-weight:600; font-size:1.5rem; line-height:140%; letter-spacing:0px; }
.text-h4 { font-weight:600; font-size:1.25rem;line-height:140%; letter-spacing:0px; }
.text-h5 { font-weight:600; font-size:1rem;   line-height:150%; letter-spacing:0px; }
.text-h6 { font-weight:600; font-size:0.875rem;line-height:150%; letter-spacing:0px; }
.text-l1-soft{font-size:1.25rem;font-weight:400;line-height:140%;letter-spacing:0px;}
.text-l1-medium{font-size:1.25rem;font-weight:500;line-height:140%;letter-spacing:0px;}
.text-l1-strong{font-size:1.25rem;font-weight:600;line-height:140%;letter-spacing:0px;}
.text-l2-soft{font-size:1rem;font-weight:400;line-height:140%;letter-spacing:0.15px;}
.text-l2-medium{font-size:1rem;font-weight:500;line-height:140%;letter-spacing:0.15px;}
.text-l2-strong{font-size:1rem;font-weight:600;line-height:140%;letter-spacing:0.15px;}
.text-l3-soft{font-size:0.875rem;font-weight:400;line-height:140%;letter-spacing:0px;}
.text-l3-medium{font-size:0.875rem;font-weight:500;line-height:140%;letter-spacing:0px;}
.text-l3-strong{font-size:0.875rem;font-weight:600;line-height:140%;letter-spacing:0px;}
.text-l4-soft{font-size:0.75rem;font-weight:400;line-height:140%;letter-spacing:0.25px;}
.text-l4-medium{font-size:0.75rem;font-weight:500;line-height:140%;letter-spacing:0.25px;}
.text-l4-strong{font-size:0.75rem;font-weight:600;line-height:140%;letter-spacing:0.25px;}
.text-l5-medium{font-size:0.625rem;font-weight:500;line-height:120%;letter-spacing:0px;}
.text-p2-soft{font-size:1rem;font-weight:400;line-height:150%;letter-spacing:0.15px;}
.text-p3-soft{font-size:0.875rem;font-weight:400;line-height:160%;letter-spacing:0px;}
.text-button-s{font-size:0.875rem;font-weight:600;line-height:140%;letter-spacing:0.25px;}
.text-button-m{font-size:1rem;font-weight:600;line-height:100%;letter-spacing:0.25px;}
.text-button-l{font-size:1rem;font-weight:600;line-height:100%;letter-spacing:0.25px;}

.shadow-small-top-light{box-shadow:var(--shadow-small-top-light);}
.shadow-medium-top-light{box-shadow:var(--shadow-medium-top-light);}
.shadow-large-top-light{box-shadow:var(--shadow-large-top-light);}

.aura-root, .aura-root * { font-family: 'Inter var', Inter, ui-sans-serif, system-ui, sans-serif; }
.aura-scroll::-webkit-scrollbar{width:8px;height:8px;}
.aura-scroll::-webkit-scrollbar-thumb{background:var(--color-border-neutral-medium);border-radius:999px;}
@keyframes aura-pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
@keyframes aura-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.aura-pop{animation:aura-pop .45s cubic-bezier(.2,.8,.3,1) both;}
.aura-rise{animation:aura-rise .4s ease both;}
`;

/* ============================================================================
   SILK PRIMITIVES  (faithful re-implementations)
============================================================================ */

/* ---- Button ---- variant: fill|outline|ghost|subtle|text · color · size */
const BTN_BASE =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-m)] transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-focus-offset)] disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
const BTN_SIZE = {
  s: "text-button-s h-8 px-3",
  m: "text-button-m h-10 px-3",
  l: "text-button-l h-12 px-4",
  xl: "text-button-l h-14 px-5",
};
const BTN_VARIANT = {
  "fill-accent":
    "bg-[var(--color-surface-interactive-strong)] text-[var(--color-text-interactive-on-accent)] hover:bg-[var(--color-surface-hover-interactive-strong)] active:bg-[var(--color-surface-active-interactive-strong)] disabled:bg-[var(--color-surface-disabled-strong-stronger)] disabled:text-[var(--color-text-inverted)]",
  "fill-neutral":
    "bg-[var(--color-surface-neutral-stronger)] text-[var(--color-text-inverted)] hover:bg-[var(--color-surface-hover-neutral-stronger)] active:bg-[var(--color-surface-active-neutral-stronger)] disabled:bg-[var(--color-surface-disabled-strong-stronger)]",
  "fill-success":
    "bg-[var(--color-semantic-success-strong)] text-[var(--color-text-inverted)] hover:bg-[var(--color-semantic-success-hover-strong)] active:bg-[var(--color-semantic-success-active-strong)]",
  "fill-destructive":
    "bg-[var(--color-semantic-error-strong)] text-[var(--color-text-inverted)] hover:bg-[var(--color-semantic-error-hover-strong)]",
  "outline-accent":
    "border bg-transparent border-[var(--color-border-interactive-strong)] text-[var(--color-text-interactive)] hover:border-[var(--color-border-hover-interactive-strong)] hover:text-[var(--color-text-hover-interactive)] hover:bg-[var(--color-surface-hover-interactive-soft)] active:bg-[var(--color-surface-active-interactive-soft)] disabled:border-[var(--color-border-disabled-strong-stronger)] disabled:text-[var(--color-text-disabled-interactive)]",
  "outline-neutral":
    "border bg-transparent border-[var(--color-border-neutral-strong)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover-neutral-strong)] hover:bg-[var(--color-surface-hover-neutral-soft)] active:text-[var(--color-text-primary)] disabled:border-[var(--color-border-disabled-strong-stronger)] disabled:text-[var(--color-text-disabled-secondary)]",
  "ghost-accent":
    "bg-transparent text-[var(--color-text-interactive)] hover:bg-[var(--color-surface-hover-interactive-soft)] active:bg-[var(--color-surface-active-interactive-soft)] disabled:text-[var(--color-text-disabled-interactive)]",
  "ghost-neutral":
    "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover-neutral-soft)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-surface-active-neutral-soft)] disabled:text-[var(--color-text-disabled-secondary)]",
  "subtle-accent":
    "bg-[var(--color-surface-interactive-medium)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover-interactive-medium)] active:bg-[var(--color-surface-active-interactive-medium)] disabled:bg-[var(--color-surface-disabled-medium-soft-softer)] disabled:text-[var(--color-text-disabled-primary)]",
  "subtle-neutral":
    "bg-[var(--color-surface-neutral-soft)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover-neutral-soft)] active:bg-[var(--color-surface-active-neutral-soft)]",
  "text-accent":
    "bg-transparent px-0 text-[var(--color-text-interactive)] hover:text-[var(--color-text-hover-interactive)] disabled:text-[var(--color-text-disabled-interactive)]",
  "text-neutral":
    "bg-transparent px-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
  "text-destructive":
    "bg-transparent px-0 text-[var(--color-semantic-error-strong)] hover:text-[var(--color-semantic-error-hover-strong)] disabled:text-[var(--color-text-disabled-secondary)]",
};
function Button({
  variant = "fill",
  color = "accent",
  size = "m",
  prefix,
  suffix,
  loading = false,
  disabled,
  className,
  children,
  ...props
}) {
  const key = `${variant}-${color}`;
  return (
    <button
      disabled={disabled || loading}
      className={cn(BTN_BASE, BTN_SIZE[size], BTN_VARIANT[key] || BTN_VARIANT["fill-accent"], className)}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {prefix && <span className="inline-flex items-center">{prefix}</span>}
          {children}
          {suffix && <span className="inline-flex items-center">{suffix}</span>}
        </>
      )}
    </button>
  );
}

/* ---- IconButton ---- */
const IB_SIZE = { s: "size-8 rounded-[var(--radius-m)] [&_svg]:size-4", m: "size-10 rounded-[var(--radius-l)] [&_svg]:size-5", l: "size-12 rounded-[var(--radius-l)] [&_svg]:size-6" };
function IconButton({ variant = "ghost", color = "neutral", size = "m", className, children, ...props }) {
  return (
    <button
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:shrink-0",
        IB_SIZE[size],
        BTN_VARIANT[`${variant}-${color}`] || BTN_VARIANT["ghost-neutral"],
        "px-0",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---- Badge ---- variant: default|accent|positive|attention|critical · type */
const BADGE_BASE =
  "text-l4-strong w-fit inline-flex items-center justify-center gap-1 rounded-full px-2 py-0.5 whitespace-nowrap select-none border";
const BADGE_VARIANT = {
  "default-strong": "bg-[var(--color-surface-neutral-stronger)] border-[var(--color-surface-neutral-stronger)] text-[var(--color-text-inverted)]",
  "default-soft": "bg-[var(--color-surface-neutral-medium)] border-[var(--color-surface-neutral-medium)] text-[var(--color-text-title)]",
  "accent-strong": "bg-[var(--color-surface-interactive-strong)] border-[var(--color-surface-interactive-strong)] text-[var(--color-text-interactive-on-accent)]",
  "accent-soft": "bg-[var(--color-surface-interactive-medium)] border-[var(--color-surface-interactive-medium)] text-[var(--color-text-interactive)]",
  "positive-strong": "bg-[var(--color-semantic-success-strong)] border-[var(--color-semantic-success-strong)] text-[var(--color-text-inverted)]",
  "positive-soft": "bg-[var(--color-semantic-success-medium)] border-[var(--color-semantic-success-medium)] text-[var(--color-text-title)]",
  "attention-strong": "bg-[var(--color-semantic-warning-strong)] border-[var(--color-semantic-warning-strong)] text-[var(--color-text-inverted)]",
  "attention-soft": "bg-[var(--color-semantic-warning-medium)] border-[var(--color-semantic-warning-medium)] text-[var(--color-text-title)]",
  "critical-soft": "bg-[var(--color-semantic-error-medium)] border-[var(--color-semantic-error-medium)] text-[var(--color-text-title)]",
};
function Badge({ variant = "default", type = "strong", className, children, ...props }) {
  return (
    <span className={cn(BADGE_BASE, BADGE_VARIANT[`${variant}-${type}`], className)} {...props}>
      {children}
    </span>
  );
}

/* ---- Avatar ---- */
const AV_SIZE = { s: "size-6 text-l5-medium", m: "size-8 text-l4-medium", l: "size-10 text-l3-medium", xl: "size-12 text-l2-medium" };
function Avatar({ size = "l", src, fallback, status, className }) {
  const [err, setErr] = useState(false);
  const statusColor = {
    positive: "bg-[var(--color-semantic-success-strong)]",
    interactive: "bg-[var(--color-surface-interactive-strong)]",
    negative: "bg-[var(--color-semantic-error-strong)]",
  }[status];
  return (
    <span className={cn("relative flex shrink-0 items-center justify-center overflow-visible rounded-full border border-[var(--color-border-neutral-soft)] bg-[var(--color-surface-neutral-medium)]", AV_SIZE[size], className)}>
      {src && !err ? (
        <img src={src} onError={() => setErr(true)} className="size-full rounded-full object-cover" alt="" />
      ) : (
        <span className="text-[var(--color-text-secondary)]">{fallback}</span>
      )}
      {status && <span className={cn("absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2 ring-[var(--color-core-white)]", statusColor)} />}
    </span>
  );
}

/* ---- ServiceImage ---- Unsplash photo with graceful icon fallback */
function ServiceImage({ service, className, iconClassName }) {
  const [err, setErr] = useState(false);
  const Icon = service.icon;
  if (err || !service.image) {
    return (
      <div className={cn("flex items-center justify-center bg-[var(--color-surface-interactive-soft)]", className)}>
        <Icon className={cn("text-[var(--color-surface-interactive-strong)]", iconClassName)} strokeWidth={1.5} />
      </div>
    );
  }
  return (
    <img
      src={service.image}
      alt={service.name}
      loading="lazy"
      onError={() => setErr(true)}
      className={cn("bg-[var(--color-surface-interactive-soft)] object-cover", className)}
    />
  );
}

/* ---- Card ---- */
function Card({ hasShadow = false, isInteractive = false, className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-m)] bg-[var(--color-surface-base)] border border-[var(--color-border-neutral-softer)] transition-colors",
        hasShadow ? "shadow-small-top-light" : "",
        isInteractive &&
          "cursor-pointer hover:border-[var(--color-border-hover-neutral-softer)] hover:shadow-medium-top-light active:border-[var(--color-border-active-neutral-softer)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ---- Divider ---- */
const Divider = ({ variant = "horizontal", className }) => (
  <div className={cn("bg-[var(--color-border-neutral-soft)]", variant === "vertical" ? "h-full w-px" : "h-px w-full", className)} />
);

/* ---- TextField ---- size · prefix · suffix · aria-invalid */
function TextField({ prefix, suffix, size = "m", invalid = false, className, ...props }) {
  const sizeCls = { s: "min-h-8 px-3", m: "min-h-10 px-3", l: "min-h-12 px-3", xl: "min-h-14 px-4" }[size];
  return (
    <div
      className={cn(
        "group flex w-full cursor-text items-center gap-2 rounded-[var(--radius-m)] border bg-[var(--color-surface-base)] transition-colors",
        sizeCls,
        invalid
          ? "border-[var(--color-semantic-error-strong)] ring-1 ring-inset ring-[var(--color-semantic-error-strong)]"
          : "border-[var(--color-border-neutral-strong)] hover:border-[var(--color-border-hover-neutral-strong)] focus-within:border-[var(--color-border-active-interactive-strong)] focus-within:ring-1 focus-within:ring-inset focus-within:ring-[var(--color-border-active-interactive-strong)]",
        className,
      )}
    >
      {prefix && <span className="shrink-0 text-[var(--color-text-tertiary)] [&_svg]:size-5">{prefix}</span>}
      <input
        className="text-l2-soft h-full flex-1 border-none bg-transparent text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-placeholder)]"
        {...props}
      />
      {suffix && <span className="shrink-0 text-[var(--color-text-secondary)] [&_svg]:size-5">{suffix}</span>}
    </div>
  );
}

/* ---- Select ---- (Silk Select trigger + popover content anatomy) */
function Select({ value, onChange, options, placeholder, prefix, size = "m", className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const sizeCls = { s: "h-8", m: "h-10", l: "h-12", xl: "h-14" }[size];
  const selected = options.find((o) => o.value === value);
  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        data-state={open ? "open" : "closed"}
        className={cn(
          "group flex w-full items-center justify-between gap-2 rounded-[var(--radius-m)] border bg-[var(--color-surface-base)] px-3 text-l2-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
          sizeCls,
          open
            ? "border-[var(--color-border-active-interactive-strong)] ring-1 ring-[var(--color-border-active-interactive-strong)] bg-[var(--color-surface-hover-base)]"
            : "border-[var(--color-border-neutral-strong)] hover:border-[var(--color-border-hover-neutral-strong)] hover:bg-[var(--color-surface-hover-base)]",
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          {prefix && <span className="shrink-0 text-[var(--color-text-secondary)] [&_svg]:size-5">{prefix}</span>}
          <span className={cn("truncate", selected ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-placeholder)]")}>
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <ChevronDown className={cn("size-5 shrink-0 text-[var(--color-text-secondary)] transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="aura-rise absolute z-50 mt-1 max-h-72 w-full overflow-auto aura-scroll rounded-[var(--radius-m)] border border-[var(--color-border-neutral-medium)] bg-[var(--color-surface-base)] p-1.5 shadow-medium-top-light">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-[var(--radius-s)] px-2.5 py-2 text-l3-medium transition-colors",
                  active
                    ? "bg-[var(--color-surface-interactive-soft)] text-[var(--color-text-interactive)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover-neutral-soft)] hover:text-[var(--color-text-primary)]",
                )}
              >
                <span>{o.label}</span>
                {active && <Check className="size-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---- Checkbox ---- (Silk data-state driven) */
function Checkbox({ checked, onCheckedChange, disabled, invalid, className }) {
  const on = checked === true || checked === "indeterminate";
  return (
    <button
      role="checkbox"
      aria-checked={checked === "indeterminate" ? "mixed" : checked}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "group grid size-5 shrink-0 place-content-center rounded-[var(--radius-xs)] border-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none",
        on
          ? invalid
            ? "border-[var(--color-semantic-error-strong)] bg-[var(--color-semantic-error-strong)] text-white"
            : "border-[var(--color-surface-interactive-strong)] bg-[var(--color-surface-interactive-strong)] text-[var(--color-text-interactive-on-accent)] hover:bg-[var(--color-surface-hover-interactive-strong)]"
          : invalid
            ? "border-[var(--color-semantic-error-strong)]"
            : "border-[var(--color-border-neutral-strong)] hover:border-[var(--color-border-hover-neutral-strong)] hover:bg-[var(--color-surface-hover-base)]",
        disabled && "border-[var(--color-surface-disabled-strong-stronger)] bg-[var(--color-surface-disabled-base)]",
        className,
      )}
    >
      {checked === "indeterminate" ? <Minus className="size-4" /> : checked ? <Check className="size-4" /> : null}
    </button>
  );
}

/* ---- Switch ---- */
function Switch({ checked, onCheckedChange, disabled }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "group relative inline-flex h-8 w-[52px] shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed",
        checked
          ? "border-[var(--color-surface-interactive-strong)] bg-[var(--color-surface-interactive-strong)]"
          : "border-[var(--color-border-neutral-strong)] bg-[var(--color-surface-neutral-medium)]",
        disabled && "opacity-50",
      )}
    >
      <span
        className={cn(
          "pointer-events-none flex size-6 items-center justify-center rounded-full shadow-md transition-transform",
          checked ? "translate-x-[22px] bg-[var(--color-surface-base)]" : "translate-x-0.5 bg-[var(--color-surface-neutral-strong)]",
        )}
      >
        {checked ? (
          <Check className="size-3 text-[var(--color-text-interactive)]" />
        ) : (
          <X className="size-3 text-[var(--color-surface-base)]" />
        )}
      </span>
    </button>
  );
}

/* ---- RadioCard ---- (Silk radio-card: radio | content | badge) */
function RadioCard({ selected, onSelect, title, description, badge, icon, disabled }) {
  return (
    <button
      onClick={() => !disabled && onSelect()}
      disabled={disabled}
      className={cn(
        "group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 rounded-[var(--radius-m)] border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
        selected
          ? "border-[var(--color-border-interactive-strong)] bg-[var(--color-surface-interactive-soft)] hover:border-[var(--color-border-hover-interactive-strong)]"
          : "border-[var(--color-border-neutral-soft)] bg-[var(--color-surface-base)] hover:border-[var(--color-border-hover-neutral-soft)] hover:bg-[var(--color-surface-hover-base)]",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span
        className={cn(
          "grid size-5 place-content-center rounded-full border-[1.5px] transition-colors",
          selected ? "border-[var(--color-border-interactive-strong)]" : "border-[var(--color-border-neutral-strong)]",
        )}
      >
        {selected && <span className="size-2.5 rounded-full bg-[var(--color-surface-interactive-strong)]" />}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="flex items-center gap-2 text-l2-medium text-[var(--color-text-primary)]">
          {icon}
          {title}
        </span>
        {description && <span className="text-l4-soft text-[var(--color-text-tertiary)]">{description}</span>}
      </span>
      {badge && <Badge variant="accent" type={selected ? "strong" : "soft"}>{badge}</Badge>}
    </button>
  );
}

/* ---- ProgressBar ---- */
function ProgressBar({ value = 0, showLabel = false }) {
  const pct = Math.min(Math.max(value, 0), 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-neutral-medium)]">
        <div className="h-full rounded-full bg-[var(--color-surface-interactive-strong)] transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="text-l4-medium text-[var(--color-text-secondary)]">{Math.round(pct)}%</span>}
    </div>
  );
}

/* ---- Stepper ---- (Silk multi-step form guideline) */
function Stepper({ current, steps }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-content-center rounded-full border-2 text-l3-strong transition-colors",
                  done
                    ? "border-[var(--color-surface-interactive-strong)] bg-[var(--color-surface-interactive-strong)] text-[var(--color-text-interactive-on-accent)]"
                    : active
                      ? "border-[var(--color-border-interactive-strong)] bg-[var(--color-surface-interactive-soft)] text-[var(--color-text-interactive)]"
                      : "border-[var(--color-border-neutral-medium)] bg-[var(--color-surface-base)] text-[var(--color-text-tertiary)]",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={cn("text-l3-medium hidden sm:block", active || done ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)]")}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className={cn("h-0.5 w-6 flex-1 rounded-full sm:w-12", done ? "bg-[var(--color-surface-interactive-strong)]" : "bg-[var(--color-border-neutral-medium)]")} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ---- Alert ---- variant · style (soft|medium|strong) */
const ALERT_ICON = {
  success: CheckCircle2,
  warning: Info,
  error: X,
  neutral: Info,
  accent: Sparkles,
};
const ALERT_ACCENT = {
  success: "var(--color-semantic-success-strong)",
  warning: "var(--color-semantic-warning-strong)",
  error: "var(--color-semantic-error-strong)",
  neutral: "var(--color-surface-neutral-stronger)",
  accent: "var(--color-surface-interactive-strong)",
};
const ALERT_SOFTBG = {
  success: "var(--color-semantic-success-soft)",
  warning: "var(--color-semantic-warning-soft)",
  error: "var(--color-semantic-error-soft)",
  neutral: "var(--color-surface-neutral-soft)",
  accent: "var(--color-surface-interactive-soft)",
};
function Alert({ variant = "neutral", style = "soft", title, children, onClose, hideIcon = false, className }) {
  const Icon = ALERT_ICON[variant];
  const strong = style === "strong";
  const medium = style === "medium";
  return (
    <div className={cn("relative flex overflow-hidden rounded-[var(--radius-m)]", className)} style={{ background: strong ? ALERT_ACCENT[variant] : medium ? ALERT_SOFTBG[variant] : "var(--color-surface-base)" }}>
      {medium && <div className="w-1.5 shrink-0 self-stretch" style={{ background: ALERT_ACCENT[variant] }} />}
      <div className="flex flex-1 items-start gap-3 px-4 py-3">
        {!hideIcon && (
          <span className="grid size-6 shrink-0 place-content-center rounded-full [&_svg]:size-4" style={{ background: strong ? "var(--color-surface-base)" : ALERT_ACCENT[variant], color: strong ? ALERT_ACCENT[variant] : "#fff" }}>
            <Icon />
          </span>
        )}
        <div className="flex flex-1 flex-col gap-0.5">
          {title && <div className="text-l2-medium" style={{ color: strong ? "#fff" : "var(--color-text-title)" }}>{title}</div>}
          {children && <div className="text-l3-soft" style={{ color: strong ? "#fff" : "var(--color-text-primary)" }}>{children}</div>}
        </div>
        {onClose && (
          <button onClick={onClose} className="shrink-0 rounded-[var(--radius-s)] p-1 transition-colors hover:bg-black/5" style={{ color: strong ? "#fff" : "var(--color-text-secondary)" }}>
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---- Tabs ---- (underline, Silk anatomy) */
function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex flex-row border-b border-[var(--color-border-neutral-soft)]">
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn(
              "relative -mb-px inline-flex h-10 items-center gap-2 border-b-2 px-6 text-l3-medium whitespace-nowrap transition-colors",
              active
                ? "text-l3-strong border-[var(--color-border-interactive-strong)] text-[var(--color-text-interactive)]"
                : "border-transparent text-[var(--color-text-tertiary)] hover:border-[var(--color-border-hover-neutral-soft)] hover:text-[var(--color-text-secondary)]",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---- SegmentedControl ---- */
function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="inline-flex w-fit items-stretch gap-0 rounded-[var(--radius-m)] bg-[var(--color-surface-interactive-soft)] p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex h-9 items-center justify-center gap-2 rounded-[var(--radius-s)] px-4 text-l3-medium whitespace-nowrap transition-colors",
              active
                ? "bg-[var(--color-surface-interactive-strong)] text-[var(--color-text-interactive-on-accent)]"
                : "bg-transparent text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover-neutral-soft)]",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---- ChoiceChip / TimeSlot ---- (Silk choice-chip interactive pattern) */
function TimeSlot({ label, selected, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-[var(--radius-m)] border px-3 text-l3-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
        disabled
          ? "cursor-not-allowed border-[var(--color-border-neutral-softer)] bg-[var(--color-surface-disabled-base)] text-[var(--color-text-disabled-secondary)] line-through"
          : selected
            ? "border-[var(--color-border-interactive-strong)] bg-[var(--color-surface-interactive-strong)] text-[var(--color-text-interactive-on-accent)]"
            : "border-[var(--color-border-neutral-strong)] bg-[var(--color-surface-base)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover-interactive-strong)] hover:bg-[var(--color-surface-hover-interactive-soft)]",
      )}
    >
      {label}
    </button>
  );
}

/* ============================================================================
   DATA
============================================================================ */
// Photos: Unsplash (https://unsplash.com) — served via images.unsplash.com CDN.
const IMG = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;
const SERVICES = [
  { id: "skin-glow", name: "Skin Glow Therapy", category: "Facial", icon: Sparkles, image: IMG("1570172619644-dfd03ed5d881"), duration: 60, price: 180, bestseller: true, rating: 4.9, reviews: 214, blurb: "A medical-grade radiance facial combining enzyme resurfacing and LED light for luminous, hydrated skin.", practitioner: { name: "Dr. Amara Sowunmi", role: "Aesthetic Dermatologist", fallback: "AS" } },
  { id: "iv-nutrient", name: "IV Nutrient Infusion", category: "IV Therapy", icon: Droplets, image: IMG("1579154204601-01588f351e67"), duration: 45, price: 220, bestseller: false, rating: 4.8, reviews: 168, blurb: "Physician-formulated vitamin and mineral drip to restore energy, immunity and cellular hydration.", practitioner: { name: "Dr. Lena Fischer", role: "Integrative Physician", fallback: "LF" } },
  { id: "deep-tissue", name: "Deep Tissue Recovery", category: "Massage", icon: Waves, image: IMG("1544161515-4ab6ce6db874"), duration: 90, price: 160, bestseller: false, rating: 4.9, reviews: 302, blurb: "Targeted myofascial release for tension, mobility and post-training recovery.", practitioner: { name: "Marco Ruiz", role: "Clinical Massage Therapist", fallback: "MR" } },
  { id: "cryo", name: "Cryo Renewal Session", category: "Wellness", icon: Snowflake, image: IMG("1540555700478-4be289fbecef"), duration: 30, price: 95, bestseller: true, rating: 4.7, reviews: 129, blurb: "Whole-body cryotherapy to reduce inflammation, boost circulation and sharpen focus.", practitioner: { name: "Priya Nair", role: "Wellness Specialist", fallback: "PN" } },
  { id: "hormone", name: "Hormone Balance Panel", category: "Diagnostics", icon: Activity, image: IMG("1576091160399-112ba8d25d1d"), duration: 20, price: 140, bestseller: false, rating: 4.8, reviews: 87, blurb: "Comprehensive blood panel with a physician review to map and optimise hormonal health.", practitioner: { name: "Dr. Elias Brandt", role: "Endocrinology Lead", fallback: "EB" } },
  { id: "lymphatic", name: "Lymphatic Drainage", category: "Massage", icon: Leaf, image: IMG("1519823551278-64ac92734fb1"), duration: 75, price: 135, bestseller: false, rating: 4.9, reviews: 191, blurb: "Gentle rhythmic technique to reduce fluid retention, de-puff and support detoxification.", practitioner: { name: "Sofia Almeida", role: "Lymphatic Therapist", fallback: "SA" } },
];
const CATEGORIES = ["All", "Facial", "IV Therapy", "Massage", "Wellness", "Diagnostics"];
const LOCATIONS = [
  { value: "mayfair", label: "Mayfair Clinic" },
  { value: "chelsea", label: "Chelsea Studio" },
  { value: "kensington", label: "Kensington Spa" },
];
const TIME_SLOTS = [
  { time: "09:00", disabled: false },
  { time: "10:30", disabled: false },
  { time: "12:00", disabled: true },
  { time: "13:30", disabled: false },
  { time: "15:00", disabled: false },
  { time: "16:30", disabled: false },
  { time: "18:00", disabled: true },
  { time: "19:30", disabled: false },
];
const SURVEY = [
  { id: "pregnant", label: "Pregnant or breastfeeding", desc: "Some treatments require adjustment." },
  { id: "medication", label: "Currently taking medication", desc: "Include prescriptions and supplements." },
  { id: "allergies", label: "Known allergies", desc: "e.g. latex, specific actives or foods." },
  { id: "conditions", label: "Existing medical conditions", desc: "Cardiovascular, skin or metabolic." },
];
const ADDONS = [
  { id: "collagen", label: "Collagen boost add-on", desc: "Peptide infusion for firmer skin", price: 35 },
  { id: "aromatherapy", label: "Aromatherapy", desc: "Bespoke essential-oil blend", price: 15 },
  { id: "consultation", label: "Extended consultation", desc: "+15 min with your practitioner", price: 25 },
];
const money = (n) => `£${n.toFixed(0)}`;

/* ============================================================================
   APP
============================================================================ */
export default function AuraCareApp() {
  const [view, setView] = useState("catalog"); // catalog|detail|step1|step2|confirm|dashboard
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("mayfair");
  const [service, setService] = useState(null);

  // detail / slot picker
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [hold, setHold] = useState(0); // seconds remaining on hold timer

  // step 1
  const [bookingFor, setBookingFor] = useState("myself");
  const [survey, setSurvey] = useState({});
  const [consent, setConsent] = useState(false);
  const [addons, setAddons] = useState({});
  const [triedNext, setTriedNext] = useState(false);

  // step 2
  const [payment, setPayment] = useState("card");
  const [paying, setPaying] = useState(false);

  // confirmation
  const [bookingId, setBookingId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [dashTab, setDashTab] = useState("upcoming");

  /* hold countdown */
  useEffect(() => {
    if (hold <= 0) return;
    const t = setInterval(() => setHold((h) => (h <= 1 ? 0 : h - 1)), 1000);
    return () => clearInterval(t);
  }, [hold]);

  const filtered = useMemo(
    () =>
      SERVICES.filter(
        (s) =>
          (category === "All" || s.category === category) &&
          (s.name.toLowerCase().includes(query.toLowerCase()) || s.category.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, category],
  );

  const addonsTotal = ADDONS.reduce((sum, a) => (addons[a.id] ? sum + a.price : sum), 0);
  const surveyComplete = SURVEY.every((q) => survey[q.id] !== undefined);
  const step1Valid = consent && surveyComplete;
  const deposit = service ? Math.round((service.price + addonsTotal) * 0.2) : 0;

  const openService = (s) => {
    setService(s);
    setSelectedDate(null);
    setSelectedSlot(null);
    setHold(0);
    setMonthOffset(0);
    setView("detail");
    window.scrollTo(0, 0);
  };
  const pickSlot = (slot) => {
    setSelectedSlot(slot);
    setHold(600); // 10-minute hold
  };
  const goStep1 = () => {
    setTriedNext(false);
    setView("step1");
    window.scrollTo(0, 0);
  };
  const confirmPay = () => {
    setPaying(true);
    setTimeout(() => {
      const id = "AC-" + Math.floor(100000 + Math.random() * 899999);
      setBookingId(id);
      setAppointments((prev) => [
        {
          id,
          service,
          date: selectedDate,
          slot: selectedSlot,
          location: LOCATIONS.find((l) => l.value === location)?.label,
          addons: ADDONS.filter((a) => addons[a.id]),
        },
        ...prev,
      ]);
      setPaying(false);
      setView("confirm");
      window.scrollTo(0, 0);
    }, 2100);
  };
  const resetBooking = () => {
    setService(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setHold(0);
    setBookingFor("myself");
    setSurvey({});
    setConsent(false);
    setAddons({});
    setPayment("card");
  };

  return (
    <div className="aura-root min-h-screen bg-[var(--color-surface-page)] text-[var(--color-text-primary)]">
      <style dangerouslySetInnerHTML={{ __html: SILK_TOKENS }} />

      <TopNav view={view} onHome={() => { resetBooking(); setView("catalog"); }} onDash={() => setView("dashboard")} apptCount={appointments.length} />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        {view === "catalog" && (
          <CatalogView
            query={query} setQuery={setQuery}
            category={category} setCategory={setCategory}
            location={location} setLocation={setLocation}
            services={filtered} onOpen={openService}
          />
        )}
        {view === "detail" && service && (
          <DetailView
            service={service}
            location={LOCATIONS.find((l) => l.value === location)?.label}
            monthOffset={monthOffset} setMonthOffset={setMonthOffset}
            selectedDate={selectedDate} setSelectedDate={(d) => { setSelectedDate(d); setSelectedSlot(null); setHold(0); }}
            selectedSlot={selectedSlot} onPickSlot={pickSlot}
            hold={hold}
            onBack={() => setView("catalog")}
            onContinue={goStep1}
          />
        )}
        {view === "step1" && service && (
          <Step1View
            service={service} hold={hold}
            bookingFor={bookingFor} setBookingFor={setBookingFor}
            survey={survey} setSurvey={setSurvey}
            consent={consent} setConsent={setConsent}
            addons={addons} setAddons={setAddons}
            triedNext={triedNext}
            onBack={() => setView("detail")}
            onNext={() => { if (step1Valid) { setView("step2"); window.scrollTo(0, 0); } else setTriedNext(true); }}
          />
        )}
        {view === "step2" && service && (
          <Step2View
            service={service} addons={ADDONS.filter((a) => addons[a.id])} addonsTotal={addonsTotal}
            deposit={deposit} selectedDate={selectedDate} selectedSlot={selectedSlot}
            location={LOCATIONS.find((l) => l.value === location)?.label}
            payment={payment} setPayment={setPayment}
            paying={paying} hold={hold}
            onBack={() => setView("step1")}
            onConfirm={confirmPay}
          />
        )}
        {view === "confirm" && service && (
          <ConfirmView
            bookingId={bookingId} service={service}
            selectedDate={selectedDate} selectedSlot={selectedSlot}
            location={LOCATIONS.find((l) => l.value === location)?.label}
            onDashboard={() => setView("dashboard")}
          />
        )}
        {view === "dashboard" && (
          <DashboardView
            appointments={appointments} tab={dashTab} setTab={setDashTab}
            onBook={() => { resetBooking(); setView("catalog"); }}
            onCancel={(id) => setAppointments((p) => p.filter((a) => a.id !== id))}
          />
        )}
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------- Top nav */
function TopNav({ onHome, onDash, apptCount }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border-neutral-soft)] bg-[var(--color-surface-interactive-strong)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button onClick={onHome} className="flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-content-center rounded-[var(--radius-m)] bg-white/15 text-white">
            <Sparkles className="size-5" />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="text-l1-strong text-white">AuraCare</span>
            <span className="text-l5-medium text-[var(--color-text-active-interactive-on-accent)]">Boutique HealthTech</span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={onDash} className="relative inline-flex h-10 items-center gap-2 rounded-[var(--radius-m)] px-3 text-l3-medium text-white transition-colors hover:bg-white/10">
            <LayoutDashboard className="size-4" />
            <span className="hidden sm:block">Dashboard</span>
            {apptCount > 0 && (
              <span className="grid size-5 place-content-center rounded-full bg-[var(--color-semantic-warning-strong)] text-l5-medium text-white">{apptCount}</span>
            )}
          </button>
          <Avatar size="m" fallback="JD" status="positive" />
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------- STEP 1: Catalog view */
function CatalogView({ query, setQuery, category, setCategory, location, setLocation, services, onOpen }) {
  return (
    <div className="aura-rise flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-l4-strong uppercase tracking-wide text-[var(--color-text-interactive)]">Catalog &amp; discovery</span>
        <h1 className="text-h2 text-[var(--color-text-title)]">Restorative treatments, curated for you</h1>
        <p className="text-p2-soft max-w-2xl text-[var(--color-text-secondary)]">Book physician-led therapies at our boutique clinics. Serene spaces, measurable results.</p>
      </div>

      {/* Search + filters */}
      <Card hasShadow className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1">
            <TextField prefix={<SearchIcon />} placeholder="Search treatments, e.g. facial, IV, massage…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:flex lg:w-auto">
            <Select className="lg:w-52" value={category === "All" ? "All" : category} onChange={setCategory} placeholder="Category" options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
            <Select className="lg:w-52" prefix={<MapPin />} value={location} onChange={setLocation} placeholder="Location" options={LOCATIONS} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "inline-flex h-8 items-center rounded-full border px-3 text-l4-medium transition-colors",
                category === c
                  ? "border-[var(--color-border-interactive-strong)] bg-[var(--color-surface-interactive-strong)] text-[var(--color-text-interactive-on-accent)]"
                  : "border-[var(--color-border-neutral-strong)] bg-[var(--color-surface-base)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover-neutral-strong)] hover:bg-[var(--color-surface-hover-base)]",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <span className="text-l3-medium text-[var(--color-text-secondary)]">{services.length} treatments available</span>
      </div>

      {/* Grid of service cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} onOpen={() => onOpen(s)} />
        ))}
        {services.length === 0 && (
          <Card className="col-span-full p-10 text-center">
            <p className="text-l2-medium text-[var(--color-text-secondary)]">No treatments match your search.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ service, onOpen }) {
  return (
    <Card hasShadow isInteractive onClick={onOpen} className="flex flex-col overflow-hidden">
      {/* Media */}
      <div className="relative h-40 overflow-hidden">
        <ServiceImage service={service} className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" iconClassName="size-12" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {service.bestseller && <Badge variant="attention" type="strong">Bestseller</Badge>}
        </div>
        <div className="absolute right-3 top-3">
          <Badge variant="positive" type="soft">
            <Clock className="size-3" /> {service.duration} min
          </Badge>
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-l4-medium text-[var(--color-text-tertiary)]">{service.category}</span>
            <h3 className="text-h5 text-[var(--color-text-title)]">{service.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-l3-medium text-[var(--color-text-secondary)]">
            <Star className="size-4 fill-[var(--color-semantic-warning-strong)] text-[var(--color-semantic-warning-strong)]" />
            {service.rating}
          </div>
        </div>
        <p className="text-p3-soft line-clamp-2 text-[var(--color-text-secondary)]">{service.blurb}</p>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <Avatar size="s" fallback={service.practitioner.fallback} status="positive" />
          <div className="flex flex-col leading-tight">
            <span className="text-l4-medium text-[var(--color-text-primary)]">{service.practitioner.name}</span>
            <span className="text-l5-medium text-[var(--color-text-tertiary)]">{service.practitioner.role}</span>
          </div>
        </div>

        <Divider className="my-1" />
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-h4 text-[var(--color-text-title)]">{money(service.price)}</span>
            <span className="text-l4-soft text-[var(--color-text-tertiary)]">/ session</span>
          </div>
          <Button size="s" suffix={<ArrowRight className="size-4" />} onClick={(e) => { e.stopPropagation(); onOpen(); }}>
            Book now
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------ STEP 2: Service detail + slots */
function DetailView({ service, location, monthOffset, setMonthOffset, selectedDate, setSelectedDate, selectedSlot, onPickSlot, hold, onBack, onContinue }) {
  return (
    <div className="aura-rise flex flex-col gap-6">
      <Button variant="text" color="neutral" size="s" prefix={<ArrowLeft className="size-4" />} onClick={onBack}>Back to catalog</Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: content hierarchy */}
        <div className="flex flex-col gap-5">
          <Card hasShadow className="overflow-hidden">
            <div className="relative h-56 overflow-hidden">
              <ServiceImage service={service} className="absolute inset-0 h-full w-full" iconClassName="size-20" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                {service.bestseller && <Badge variant="attention" type="strong">Bestseller</Badge>}
                <Badge variant="positive" type="soft"><Clock className="size-3" /> {service.duration} min</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-1">
                <span className="text-l4-medium text-[var(--color-text-tertiary)]">{service.category} · {location}</span>
                <h1 className="text-h3 text-[var(--color-text-title)]">{service.name}</h1>
                <div className="mt-1 flex items-center gap-2 text-l3-medium text-[var(--color-text-secondary)]">
                  <Star className="size-4 fill-[var(--color-semantic-warning-strong)] text-[var(--color-semantic-warning-strong)]" />
                  {service.rating} <span className="text-[var(--color-text-tertiary)]">({service.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-p2-soft text-[var(--color-text-secondary)]">{service.blurb}</p>
              <Divider />
              <div className="flex items-center gap-3">
                <Avatar size="l" fallback={service.practitioner.fallback} status="positive" />
                <div className="flex flex-col">
                  <span className="text-l2-medium text-[var(--color-text-primary)]">{service.practitioner.name}</span>
                  <span className="text-l4-soft text-[var(--color-text-tertiary)]">{service.practitioner.role}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: date + slot picker */}
        <div className="flex flex-col gap-4">
          <Card hasShadow className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-5 text-[var(--color-text-interactive)]" />
              <h2 className="text-h5 text-[var(--color-text-title)]">Choose a date &amp; time</h2>
            </div>
            <MiniCalendar monthOffset={monthOffset} setMonthOffset={setMonthOffset} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            {selectedDate && (
              <div className="aura-rise flex flex-col gap-3">
                <Divider />
                <span className="text-l3-medium text-[var(--color-text-secondary)]">Available slots · {selectedDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((s) => (
                    <TimeSlot key={s.time} label={s.time} disabled={s.disabled} selected={selectedSlot === s.time} onClick={() => onPickSlot(s.time)} />
                  ))}
                </div>
              </div>
            )}

            {selectedSlot && hold > 0 && (
              <Alert variant="accent" style="medium" title="Slot on hold" hideIcon>
                We're holding <b>{selectedSlot}</b> for you — <b>{Math.floor(hold / 60)}:{String(hold % 60).padStart(2, "0")}</b> remaining. Complete booking to confirm.
              </Alert>
            )}
            {selectedSlot && hold === 0 && (
              <Alert variant="warning" style="medium" title="Hold expired">Please re-select a time slot to continue.</Alert>
            )}

            <Button
              size="l"
              className="w-full"
              disabled={!selectedSlot || hold === 0}
              suffix={<ArrowRight className="size-4" />}
              onClick={onContinue}
            >
              Continue to booking
            </Button>
          </Card>

          <Card className="flex items-center justify-between p-4">
            <span className="text-l3-medium text-[var(--color-text-secondary)]">Session price</span>
            <span className="text-h4 text-[var(--color-text-title)]">{money(service.price)}</span>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MiniCalendar({ monthOffset, setMonthOffset, selectedDate, setSelectedDate }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthName = base.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const firstWeekday = (base.getDay() + 6) % 7; // Mon-first
  const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(base.getFullYear(), base.getMonth(), d));

  const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-l2-medium text-[var(--color-text-primary)]">{monthName}</span>
        <div className="flex gap-1">
          <IconButton size="s" variant="outline" color="neutral" onClick={() => setMonthOffset(Math.max(0, monthOffset - 1))} disabled={monthOffset === 0} aria-label="Previous month"><ChevronLeft /></IconButton>
          <IconButton size="s" variant="outline" color="neutral" onClick={() => setMonthOffset(monthOffset + 1)} aria-label="Next month"><ChevronRight /></IconButton>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <span key={d} className="text-l5-medium py-1 text-[var(--color-text-tertiary)]">{d}</span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const past = date < today;
          const isSun = date.getDay() === 0;
          const disabled = past || isSun;
          const selected = sameDay(date, selectedDate);
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "grid aspect-square place-content-center rounded-[var(--radius-m)] text-l3-medium transition-colors",
                disabled
                  ? "cursor-not-allowed text-[var(--color-text-disabled-tertiary)]"
                  : selected
                    ? "bg-[var(--color-surface-interactive-strong)] text-[var(--color-text-interactive-on-accent)]"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover-interactive-soft)]",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------- STEP 3: Survey + add-ons */
function Step1View({ service, bookingFor, setBookingFor, survey, setSurvey, consent, setConsent, addons, setAddons, triedNext, onBack, onNext }) {
  return (
    <div className="aura-rise flex flex-col gap-6">
      <BookingHeader step={0} title="Health survey & add-ons" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          {/* Booking for — radio group */}
          <Card hasShadow className="flex flex-col gap-4 p-5">
            <h2 className="text-h5 text-[var(--color-text-title)]">Who is this booking for?</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <RadioCard selected={bookingFor === "myself"} onSelect={() => setBookingFor("myself")} title="Myself" description="Use my patient profile" icon={<User className="size-4 text-[var(--color-text-interactive)]" />} />
              <RadioCard selected={bookingFor === "loved-one"} onSelect={() => setBookingFor("loved-one")} title="A loved one" description="Book on someone's behalf" icon={<Users className="size-4 text-[var(--color-text-interactive)]" />} />
            </div>
          </Card>

          {/* Health survey — checkboxes */}
          <Card hasShadow className="flex flex-col gap-1 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-h5 text-[var(--color-text-title)]">Health survey</h2>
              <Badge variant={SURVEY.every((q) => survey[q.id] !== undefined) ? "positive" : "default"} type="soft">
                {SURVEY.filter((q) => survey[q.id] !== undefined).length}/{SURVEY.length} answered
              </Badge>
            </div>
            <p className="text-l4-soft mb-2 text-[var(--color-text-tertiary)]">Please confirm each item so your practitioner can tailor the treatment safely.</p>
            <div className="flex flex-col divide-y divide-[var(--color-border-neutral-soft)]">
              {SURVEY.map((q) => {
                const val = survey[q.id];
                const err = triedNext && val === undefined;
                return (
                  <div key={q.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-l2-medium text-[var(--color-text-primary)]">{q.label}</span>
                      <span className={cn("text-l4-soft", err ? "text-[var(--color-semantic-error-strong)]" : "text-[var(--color-text-tertiary)]")}>{err ? "Please choose Yes or No" : q.desc}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => setSurvey((s) => ({ ...s, [q.id]: false }))}
                        className={cn("inline-flex h-8 items-center rounded-[var(--radius-m)] border px-3 text-l4-medium transition-colors",
                          val === false ? "border-[var(--color-border-interactive-strong)] bg-[var(--color-surface-interactive-strong)] text-white" : "border-[var(--color-border-neutral-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover-base)]")}
                      >No</button>
                      <button
                        onClick={() => setSurvey((s) => ({ ...s, [q.id]: true }))}
                        className={cn("inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-m)] border px-3 text-l4-medium transition-colors",
                          val === true ? "border-[var(--color-border-interactive-strong)] bg-[var(--color-surface-interactive-strong)] text-white" : "border-[var(--color-border-neutral-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover-base)]")}
                      >Yes</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Add-ons — switches */}
          <Card hasShadow className="flex flex-col gap-1 p-5">
            <h2 className="text-h5 text-[var(--color-text-title)]">Enhance your session</h2>
            <p className="text-l4-soft mb-2 text-[var(--color-text-tertiary)]">Optional add-ons, billed with your session.</p>
            <div className="flex flex-col divide-y divide-[var(--color-border-neutral-soft)]">
              {ADDONS.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-4 py-3.5">
                  <div className="flex flex-col">
                    <span className="text-l2-medium text-[var(--color-text-primary)]">{a.label}</span>
                    <span className="text-l4-soft text-[var(--color-text-tertiary)]">{a.desc}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-l3-medium text-[var(--color-text-secondary)]">+{money(a.price)}</span>
                    <Switch checked={!!addons[a.id]} onCheckedChange={(v) => setAddons((s) => ({ ...s, [a.id]: v }))} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Consent */}
          <Card className={cn("flex items-start gap-3 p-4", triedNext && !consent && "border-[var(--color-semantic-error-strong)]")}>
            <Checkbox checked={consent} onCheckedChange={setConsent} invalid={triedNext && !consent} />
            <div className="flex flex-col">
              <span className="text-l3-medium text-[var(--color-text-primary)]">I confirm the information above is accurate.</span>
              <span className={cn("text-l4-soft", triedNext && !consent ? "text-[var(--color-semantic-error-strong)]" : "text-[var(--color-text-tertiary)]")}>Required to proceed to payment.</span>
            </div>
          </Card>
        </div>

        {/* Summary rail */}
        <div className="flex flex-col gap-4">
          <SummaryCard service={service} addons={ADDONS.filter((a) => addons[a.id])} />
          <div className="flex gap-3">
            <Button variant="outline" color="neutral" size="l" className="flex-1" prefix={<ArrowLeft className="size-4" />} onClick={onBack}>Back</Button>
            <Button size="l" className="flex-1" suffix={<ArrowRight className="size-4" />} onClick={onNext}>Continue</Button>
          </div>
          {triedNext && !(consent && SURVEY.every((q) => survey[q.id] !== undefined)) && (
            <Alert variant="error" style="medium" title="A few items need attention">Complete the health survey and confirm the consent checkbox.</Alert>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------- STEP 4: Payment + summary */
function Step2View({ service, addons, addonsTotal, deposit, selectedDate, selectedSlot, location, payment, setPayment, paying, hold, onBack, onConfirm }) {
  const methods = [
    { id: "card", label: "Credit card", desc: "Visa, Mastercard, Amex", icon: CreditCard },
    { id: "apple", label: "Apple Pay", desc: "Fast & secure checkout", icon: Smartphone },
    { id: "blik", label: "BLIK", desc: "Pay with a one-time code", icon: Wallet },
  ];
  return (
    <div className="aura-rise flex flex-col gap-6">
      <BookingHeader step={1} title="Payment & summary" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: payment */}
        <div className="flex flex-col gap-5">
          <Card hasShadow className="flex flex-col gap-4 p-5">
            <h2 className="text-h5 text-[var(--color-text-title)]">Payment method</h2>
            <div className="flex flex-col gap-3">
              {methods.map((m) => (
                <RadioCard
                  key={m.id}
                  selected={payment === m.id}
                  onSelect={() => setPayment(m.id)}
                  title={m.label}
                  description={m.desc}
                  icon={<m.icon className="size-4 text-[var(--color-text-interactive)]" />}
                />
              ))}
            </div>

            {payment === "card" && (
              <div className="aura-rise mt-1 flex flex-col gap-3 rounded-[var(--radius-m)] border border-[var(--color-border-neutral-soft)] bg-[var(--color-surface-neutral-soft)] p-4">
                <label className="text-l4-medium text-[var(--color-text-secondary)]">Card number
                  <div className="mt-1"><TextField placeholder="1234 5678 9012 3456" suffix={<CreditCard />} /></div>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-l4-medium text-[var(--color-text-secondary)]">Expiry<div className="mt-1"><TextField placeholder="MM / YY" /></div></label>
                  <label className="text-l4-medium text-[var(--color-text-secondary)]">CVC<div className="mt-1"><TextField placeholder="123" /></div></label>
                </div>
              </div>
            )}
            {payment === "apple" && <Alert variant="neutral" style="soft" title="Apple Pay">You'll confirm with Face ID / Touch ID at checkout.</Alert>}
            {payment === "blik" && <Alert variant="neutral" style="soft" title="BLIK">Generate a 6-digit code in your banking app to authorise.</Alert>}
          </Card>

          <Alert variant="accent" style="medium" title="Secure deposit">
            Only a <b>20% deposit ({money(deposit)})</b> is charged now. The balance is settled at the clinic after your session.
          </Alert>
        </div>

        {/* Right: sticky summary */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <SummaryCard
            service={service}
            addons={addons}
            when={selectedDate ? `${selectedDate.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} · ${selectedSlot}` : null}
            location={location}
            deposit={deposit}
            showPolicy
          />
          <Button size="xl" className="w-full" loading={paying} prefix={!paying && <ShieldCheck className="size-5" />} onClick={onConfirm}>
            {paying ? "Processing payment…" : `Confirm & pay deposit ${money(deposit)}`}
          </Button>
          <Button variant="text" color="neutral" size="s" className="mx-auto" prefix={<ArrowLeft className="size-4" />} onClick={onBack} disabled={paying}>Back to survey</Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- Reusable summary card */
function SummaryCard({ service, addons, when, location, deposit, showPolicy }) {
  const total = service.price + addons.reduce((s, a) => s + a.price, 0);
  return (
    <Card hasShadow className="flex flex-col gap-4 p-5">
      <h2 className="text-h5 text-[var(--color-text-title)]">Booking summary</h2>
      <div className="flex items-center gap-3">
        <ServiceImage service={service} className="size-12 shrink-0 rounded-[var(--radius-m)]" iconClassName="size-6" />
        <div className="flex flex-col">
          <span className="text-l2-medium text-[var(--color-text-primary)]">{service.name}</span>
          <span className="text-l4-soft text-[var(--color-text-tertiary)]">{service.category} · {service.duration} min</span>
        </div>
      </div>

      {(when || location) && (
        <div className="flex flex-col gap-2 rounded-[var(--radius-m)] bg-[var(--color-surface-neutral-soft)] p-3">
          {when && <div className="flex items-center gap-2 text-l3-medium text-[var(--color-text-primary)]"><CalendarIcon className="size-4 text-[var(--color-text-interactive)]" /> {when}</div>}
          {location && <div className="flex items-center gap-2 text-l3-medium text-[var(--color-text-primary)]"><MapPin className="size-4 text-[var(--color-text-interactive)]" /> {location}</div>}
        </div>
      )}

      <Divider />
      <div className="flex flex-col gap-2">
        <Row label={`${service.name}`} value={money(service.price)} />
        {addons.map((a) => <Row key={a.id} label={a.label} value={`+${money(a.price)}`} sub />)}
      </div>
      <Divider />
      <div className="flex items-center justify-between">
        <span className="text-l2-medium text-[var(--color-text-primary)]">Total</span>
        <span className="text-h4 text-[var(--color-text-title)]">{money(total)}</span>
      </div>
      {deposit !== undefined && (
        <div className="flex items-center justify-between rounded-[var(--radius-m)] bg-[var(--color-surface-interactive-soft)] px-3 py-2">
          <span className="text-l3-medium text-[var(--color-text-interactive)]">Due now (20% deposit)</span>
          <span className="text-l2-strong text-[var(--color-text-interactive)]">{money(deposit)}</span>
        </div>
      )}
      {showPolicy && (
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="positive" type="soft"><Check className="size-3" /> Free cancellation · 24h</Badge>
          <Badge variant="attention" type="soft">Deposit refundable</Badge>
        </div>
      )}
    </Card>
  );
}
const Row = ({ label, value, sub }) => (
  <div className="flex items-center justify-between">
    <span className={cn("text-l3-soft", sub ? "text-[var(--color-text-tertiary)]" : "text-[var(--color-text-secondary)]")}>{label}</span>
    <span className="text-l3-medium text-[var(--color-text-primary)]">{value}</span>
  </div>
);

function BookingHeader({ step, title }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-l4-strong uppercase tracking-wide text-[var(--color-text-interactive)]">Step {step + 1} of 2</span>
          <h1 className="text-h3 text-[var(--color-text-title)]">{title}</h1>
        </div>
      </div>
      <Stepper current={step} steps={["Survey & add-ons", "Payment"]} />
      <ProgressBar value={step === 0 ? 50 : 100} />
    </div>
  );
}

/* --------------------------------------------- STEP 5a: Confirmation */
function ConfirmView({ bookingId, service, selectedDate, selectedSlot, location, onDashboard }) {
  return (
    <div className="aura-rise mx-auto flex max-w-2xl flex-col items-center gap-6 pt-6 text-center">
      <span className="aura-pop grid size-20 place-content-center rounded-full bg-[var(--color-semantic-success-medium)]">
        <span className="grid size-14 place-content-center rounded-full bg-[var(--color-semantic-success-strong)] text-white">
          <Check className="size-8" strokeWidth={3} />
        </span>
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-h2 text-[var(--color-text-title)]">You're all booked</h1>
        <p className="text-p2-soft text-[var(--color-text-secondary)]">A confirmation and calendar invite are on their way to your inbox.</p>
      </div>

      <div className="w-full">
        <Alert variant="success" style="strong" title="Booking confirmed">
          Your deposit is secured and your slot is reserved.
        </Alert>
      </div>

      <Card hasShadow className="w-full p-5 text-left">
        <div className="flex items-center justify-between">
          <span className="text-l4-medium text-[var(--color-text-tertiary)]">Booking ID</span>
          <Badge variant="accent" type="soft">{bookingId}</Badge>
        </div>
        <Divider className="my-4" />
        <div className="flex items-center gap-3">
          <Avatar size="l" fallback={service.practitioner.fallback} status="positive" />
          <div className="flex flex-col">
            <span className="text-l2-medium text-[var(--color-text-primary)]">{service.name}</span>
            <span className="text-l4-soft text-[var(--color-text-tertiary)]">with {service.practitioner.name}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-l3-medium text-[var(--color-text-primary)]"><CalendarIcon className="size-4 text-[var(--color-text-interactive)]" /> {selectedDate?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} · {selectedSlot}</div>
          <div className="flex items-center gap-2 text-l3-medium text-[var(--color-text-primary)]"><MapPin className="size-4 text-[var(--color-text-interactive)]" /> {location}</div>
        </div>
      </Card>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Button variant="outline" color="neutral" size="l" className="flex-1" prefix={<CalendarPlus className="size-4" />}>Add to calendar</Button>
        <Button size="l" className="flex-1" prefix={<LayoutDashboard className="size-4" />} onClick={onDashboard}>View in patient dashboard</Button>
      </div>
    </div>
  );
}

/* --------------------------------------------- STEP 5b: Dashboard */
function DashboardView({ appointments, tab, setTab, onBook, onCancel }) {
  return (
    <div className="aura-rise flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-l4-strong uppercase tracking-wide text-[var(--color-text-interactive)]">Patient dashboard</span>
          <h1 className="text-h2 text-[var(--color-text-title)]">Welcome back, Jordan</h1>
        </div>
        <Button prefix={<Sparkles className="size-4" />} onClick={onBook}>Book a treatment</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Upcoming" value={appointments.length} icon={CalendarIcon} />
        <StatCard label="Completed" value={12} icon={CheckCircle2} />
        <StatCard label="Wellness score" value="87" icon={Activity} />
        <StatCard label="Member since" value="2023" icon={Heart} />
      </div>

      <Tabs value={tab} onChange={setTab} tabs={[{ value: "upcoming", label: "Upcoming appointments" }, { value: "history", label: "History" }]} />

      {tab === "upcoming" && (
        <div className="flex flex-col gap-3">
          {appointments.length === 0 ? (
            <Card className="flex flex-col items-center gap-3 p-10 text-center">
              <span className="grid size-14 place-content-center rounded-full bg-[var(--color-surface-interactive-soft)]"><CalendarIcon className="size-7 text-[var(--color-surface-interactive-strong)]" /></span>
              <p className="text-l2-medium text-[var(--color-text-primary)]">No upcoming appointments</p>
              <p className="text-l3-soft text-[var(--color-text-tertiary)]">Book a treatment to see it here.</p>
              <Button prefix={<Sparkles className="size-4" />} onClick={onBook}>Browse treatments</Button>
            </Card>
          ) : (
            appointments.map((a) => <AppointmentRow key={a.id} appt={a} onCancel={() => onCancel(a.id)} />)
          )}
        </div>
      )}
      {tab === "history" && (
        <Card className="flex flex-col items-center gap-2 p-10 text-center">
          <p className="text-l2-medium text-[var(--color-text-primary)]">12 completed sessions</p>
          <p className="text-l3-soft text-[var(--color-text-tertiary)]">Your treatment history and outcomes appear here.</p>
        </Card>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <Card hasShadow className="flex items-center gap-3 p-4">
      <span className="grid size-10 shrink-0 place-content-center rounded-[var(--radius-m)] bg-[var(--color-surface-interactive-soft)]">
        <Icon className="size-5 text-[var(--color-surface-interactive-strong)]" />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-h4 text-[var(--color-text-title)]">{value}</span>
        <span className="text-l4-soft text-[var(--color-text-tertiary)]">{label}</span>
      </div>
    </Card>
  );
}

function AppointmentRow({ appt, onCancel }) {
  return (
    <Card hasShadow className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <ServiceImage service={appt.service} className="size-14 shrink-0 rounded-[var(--radius-m)]" iconClassName="size-6" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-l2-medium text-[var(--color-text-primary)]">{appt.service.name}</span>
            <Badge variant="accent" type="soft">{appt.id}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-l4-soft text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5"><CalendarIcon className="size-3.5" /> {appt.date?.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · {appt.slot}</span>
            <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {appt.location}</span>
            <span className="flex items-center gap-1.5"><User className="size-3.5" /> {appt.service.practitioner.name}</span>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button variant="outline" color="neutral" size="s">Reschedule</Button>
        <Button variant="text" color="destructive" size="s" onClick={onCancel}>Cancel</Button>
      </div>
    </Card>
  );
}
