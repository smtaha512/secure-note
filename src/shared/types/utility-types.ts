export type SnakeToCamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${SnakeToCamelCase<P3>}`
    : Lowercase<S>;

export type KeysFromSnakeToCamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K] extends Record<
    string,
    unknown
  >
    ? KeysFromSnakeToCamelCase<T[K]>
    : T[K];
};
