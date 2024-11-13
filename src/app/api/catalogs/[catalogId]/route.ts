import { NextRequest } from "next/server";
import { getCatalogById } from "../models";
import { getUserIdCookie } from "~/utils/server-helper";
import { NxResponse } from "~/utils/nx-response";

type ContextParams = {
  params: {
    catalogId: string;
  };
};

export async function GET(_request: NextRequest, ctx: ContextParams) {
  const userId = getUserIdCookie();
  const { catalogId } = ctx.params;

  const data = await getCatalogById(catalogId, userId);
  return NxResponse.success<any>(
    `${catalogId} catalog data fetched successfully.`,
    data,
    200
  );
}
