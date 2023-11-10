import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  useCdn: false,
  apiVersion: process.env.SANITY_STUDIO_VERSION,
  token: process.env.SANITY_STUDIO_API_TOKEN,
});
