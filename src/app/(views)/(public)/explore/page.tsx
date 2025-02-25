import fetchApi from "~/utils/fetch";

import { CatalogExplorer } from "./catalog-explorer";

export const dynamic = "force-dynamic";
export const revalidate = 60 * 5; // Cache the page for 5 minutes, unless revalidated on updates

export default async function ExplorePage() {
  const catalogs = await fetchApi("/catalogs/valid");
  const archives = await fetchApi("/archives/valid");
  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold tracking-tight">Explore</h1>
      <CatalogExplorer validArchives={archives} validCatalogs={catalogs} />
    </div>
  );
}
