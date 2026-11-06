// Types for tenant-theme.js, published as @vendra/design-system/theme.
export type Hex = `#${string}`;
export interface TenantSpec {
  description?: string;
  /** Four #RRGGBB brand colours; every shade is derived from them in OKLCH. */
  colours: {accent: Hex; neutral: Hex; ink: Hex; footer: Hex};
  character: {
    headings: 'serif' | 'sans' | 'vazir';
    case: 'none' | 'uppercase';
    accentWord: 'italic' | 'upright';
    controls: 'pill' | 'square';
    frame: 'arch' | 'soft' | 'square';
  };
  /** Hand-set generated shades, e.g. {"--peony-600": "#A0304B"}. */
  overrides?: Record<string, Hex>;
  /**
   * The tenant's own brand font, placed ahead of the character.headings preset (which stays as
   * the fallback stack for the script the files leave out and while they load).
   */
  font?: TenantFont;
}
/** A self-hosted brand font: one WOFF2 file per script. */
export interface TenantFont {
  /** The CSS family name: letters, digits, spaces and hyphens; not a built-in font's name. */
  family: string;
  /** Under which licence the files are served (kept with the spec, not written to CSS). */
  licence: string;
  /** WOFF2 paths under assets/, relative to the deployment root; at least one script. */
  files: {latin?: string; arabic?: string};
  /** One weight ('400', the default) or a variable font's range ('300 700'). */
  weight?: string;
  /** Also use the font for body text (default: headings only). */
  body?: boolean;
}
/** OKLCH shade controls; lightness overrides shift when both are supplied. */
export interface ShadeStep {
  lightness?: number;
  shift?: number;
  chroma?: number;
  maxChroma?: number;
}
/** A brand colour's base token and the controls for its generated shade tokens. */
export interface ThemeRamp {
  base: `--${string}`;
  steps: Record<`--${string}`, ShadeStep>;
}
/** The four brand ramps used by tokens() and the theme builder. */
export declare const RAMPS: Record<keyof TenantSpec['colours'], ThemeRamp>;
/** Generate one shade from a six-digit hex base using the theme's OKLCH controls. */
export declare function shade(base: Hex | string, step: ShadeStep): string;
export interface ContrastCheck {
  label: string;
  ratio: number;
  /** Required ratio: 4.5 for text, 3 for edges and focus rings. */
  min: number;
  pass: boolean;
}
/** The default Vendra Florist theme as a spec. */
export declare const VENDRA: TenantSpec;
export declare const CHOICES: {[K in keyof TenantSpec['character']]: TenantSpec['character'][K][]};
export declare const FONTS: Record<TenantSpec['character']['headings'], string>;
/** Throws on an invalid spec; returns it otherwise. */
export declare function validate(spec: unknown, label?: string): TenantSpec;
/**
 * validate()'s rules as a JSON Schema (draft 2020-12), also published as
 * @vendra/design-system/theme.schema.json. Contrast is not covered: use checks().
 */
export declare function schema(): Record<string, unknown>;
/** The seven contrast checks every tenant must pass. */
export declare function checks(spec: TenantSpec): ContrastCheck[];
/** Every custom property the theme sets, grouped like the CSS. */
export declare function tokens(spec: TenantSpec): {
  ramps: Record<string, string>;
  semantic: Record<string, string>;
  character: Record<string, string>;
  all: Record<string, string>;
};
export declare function contrast(a: Hex | string, b: Hex | string): number;
export declare function oklch(hex: string): [number, number, number];
export declare function fromOklch(lch: [number, number, number]): string;
/**
 * The tenant's CSS for a trusted spec (the build uses this): the brand font's @font-face rules, if
 * any, then the [data-tenant] block. assetBase leads to the deployment root from where the CSS is
 * served; the default fits the build's packages/design-system/tokens/tenants/<slug>.css.
 */
export declare function css(slug: string, spec: TenantSpec, options?: {assetBase?: string}): string;
/** The brand font's @font-face rules (font-display: swap, one unicode-range per script). */
export declare function fontFaces(spec: TenantSpec, assetBase?: string): string;
/** The brand-font file to preload on a page in `lang` ('en' → latin, 'fa' → arabic): [url] or []. */
export declare function fontPreloads(spec: TenantSpec, lang: string, assetBase?: string): string[];
/**
 * The [data-tenant="<slug>"] CSS block for a spec loaded at runtime (e.g. from the database).
 * Throws on an unsafe slug, an invalid spec or failing contrast unless allowFailing is set.
 */
export declare function tenantCss(
  slug: string,
  spec: TenantSpec,
  options?: {
    allowFailing?: boolean;
    /** Prefix for brand-font file paths: '/' (default), a path ending in '/' or an https:// origin. */
    assetBase?: string;
  }
): string;
/** One W3C design token (DTCG). */
export interface DesignToken {
  $type?:
    | 'color'
    | 'dimension'
    | 'duration'
    | 'cubicBezier'
    | 'fontFamily'
    | 'fontWeight'
    | 'number'
    | 'shadow';
  $value: unknown;
}
/**
 * A custom-property map as W3C design tokens (DTCG JSON), for Style Dictionary and other tools
 * that write Swift, Kotlin, Android XML or CSS. '--peony-500' → peony.500, '--white' →
 * white.default, var(--x) → the alias {x…}. For a tenant, merge designTokens(tokens(spec).all)
 * over @vendra/design-system/tokens.json (its aliases point at tokens there).
 */
export declare function designTokens(
  vars: Record<string, string>
): Record<string, Record<string, DesignToken>>;
/** Flat hex palette for HTML email. */
export declare function email(spec: TenantSpec): Record<string, string | null>;
