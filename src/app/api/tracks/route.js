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

  const getTracks = await db.track.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return Response.json(getTracks);
}
export async function PUT(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  const data = await req.json();

  const updatedTrack = await db.track.update({
    where: { idTrack: data.idTrack },
    data: {
      trackName: data.trackName,
      trackDescription: data.trackDescription,
      trackGrade: data.trackGrade,
    },
  });
  return Response.json(updatedTrack);
}

export async function DELETE(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const data = await req.json();
    const { idTrack } = data;

    if (!idTrack) {
      return new Response("Missing idTrack", { status: 400 });
    }

    const deletedTrack = await db.track.delete({
      where: {
        idTrack: idTrack,
        // If your table uses compound unique keys, you can include:
        // userId: session.user.id,
      },
    });
    return Response.json(deletedTrack);
  } catch (err) {
    console.error("Delete error:", err);
    return new Response("Track not found or you do not have permission", {
      status: 403,
    });
  }
}
