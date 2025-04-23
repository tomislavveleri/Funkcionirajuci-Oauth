import db from "@/lib/db/db";
import { auth } from "@/lib/auth";
export async function POST(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  const data = await req.json();
  const newResult = await db.result.create({
    data: {
      selectedBike: data.selectedBike,
      selectedTrack: data.selectedTrack,
      selectedSetup: data.selectedSetup,
      trackTime: data.trackTime,
      trackConditions: data.trackConditions,
      userId: session.user.id,
    },
  });
  return Response.json(newResult);
}

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }

  const results = await db.result.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return Response.json(results);
}
