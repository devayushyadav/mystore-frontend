"use server"; // Indicate that this module will be used as a server action in Next.js

import { revalidatePath } from "next/cache"; // Import the function to revalidate a cached path

/**
 * Server action to revalidate a specific path.
 * This can be used to refresh the data displayed on a page when an action is performed,
 * such as deleting a product, to ensure the latest data is fetched on the next request.
 *
 * @param {string} path - The path that needs to be revalidated in the cache.
 */
export const revalidateResponse = (path: string) => {
  revalidatePath(path); // Call the revalidatePath function to refresh the cache for the specified path
};
