// @ts-check

/** @typedef {'unauthorized' | 'forbidden' | 'not-found' | 'validation' | 'conflict' | 'rate-limited' | 'http' | 'network' | 'timeout' | 'invalid-response'} ErrorKind */

export class VendraApiError extends Error {
  /**
   * @param {ErrorKind} kind
   * @param {number | null} [status]
   * @param {Array<{field: string, message: string}>} [issues]
   */
  constructor(kind, status = null, issues = []) {
    super(`Vendra API: ${kind}${status === null ? '' : ` (${status})`}`);
    this.name = 'VendraApiError';
    this.kind = kind;
    this.status = status;
    this.issues = issues;
  }
}

/** @param {unknown} value @returns {value is Record<string, unknown>} */
export function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {number} status @param {unknown} body */
export function responseError(status, body) {
  /** @type {Partial<Record<number, ErrorKind>>} */
  const kinds = {
    400: 'validation',
    401: 'unauthorized',
    403: 'forbidden',
    404: 'not-found',
    409: 'conflict',
    422: 'validation',
    429: 'rate-limited'
  };
  const kind = kinds[status] ?? 'http';
  const violations =
    kind === 'validation' && isRecord(body) ? (body.violations ?? body['hydra:violations']) : null;
  const issues = Array.isArray(violations)
    ? violations.flatMap(issue =>
        isRecord(issue) &&
        typeof issue.propertyPath === 'string' &&
        typeof issue.message === 'string'
          ? [{field: issue.propertyPath, message: issue.message}]
          : []
      )
    : [];

  return new VendraApiError(kind, status, issues);
}
