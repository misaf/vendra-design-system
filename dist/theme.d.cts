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
}
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
/** The seven contrast checks every tenant must pass. */
export declare function checks(spec: TenantSpec): ContrastCheck[];
/** Every custom property the theme sets, grouped like the CSS. */
export declare function tokens(spec: TenantSpec): {ramps: Record<string, string>; semantic: Record<string, string>; character: Record<string, string>; all: Record<string, string>};
export declare function contrast(a: Hex | string, b: Hex | string): number;
export declare function oklch(hex: string): [number, number, number];
export declare function fromOklch(lch: [number, number, number]): string;
/** The [data-tenant] CSS block for a trusted spec (the build uses this). */
export declare function css(slug: string, spec: TenantSpec): string;
/**
 * The [data-tenant="<slug>"] CSS block for a spec loaded at runtime (e.g. from the database).
 * Throws on an unsafe slug, an invalid spec or failing contrast unless allowFailing is set.
 */
export declare function tenantCss(slug: string, spec: TenantSpec, options?: {allowFailing?: boolean}): string;
/** Flat hex palette for HTML email. */
export declare function email(spec: TenantSpec): Record<string, string | null>;
