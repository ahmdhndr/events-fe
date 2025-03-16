import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  client: {}, // Specify env variables schema here. Usually start with `NEXT_PUBLIC` to expose to the client.
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});
