/** @template T @param {T[] | null | undefined} value @returns {T[]} */
export const asList = value => (Array.isArray(value) ? value : []);
