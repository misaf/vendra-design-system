/** A product's availability: in stock, few left, back soon (on `date`, ISO, when known) or sold out. */
export type Stock =
  | {status: 'in'}
  | {status: 'low'; count: number}
  | {status: 'soon'; date: string | null}
  | {status: 'out'};
