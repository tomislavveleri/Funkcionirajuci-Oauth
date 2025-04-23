import db from "@/lib/db/db";
import { auth } from "@/lib/auth";
export async function POST(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  const data = await req.json();
  const newTrack = await db.track.create({
    data: {
      trackName: data.trackName,
      trackDescription: data.trackDescription,
      trackGrade: data.trackGrade,
      userId: session.user.id,
    },
  });
  return Response.json(newTrack);
}

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }

  const tracks = await db.track.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return Response.json(tracks);
}
