import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_DATASET,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_STUDIO_VERSION,
  token: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_TOKEN,
});
