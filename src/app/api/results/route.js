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
export async function PUT(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  try {
    const data = await req.json();
    const updateResult = await db.result.update({
      where: { id: data.id },
      data: {
        selectedBike: data.selectedBike,
        selectedTrack: data.selectedTrack,
        selectedSetup: data.selectedSetup,
        trackTime: data.trackTime,
        trackConditions: data.trackConditions,
        userId: session.user.id,
      },
    });
    return Response.json(updateResult);
  } catch (err) {
    console.error("Update problem", { status: 403 });
  }
}

export async function DELETE(req) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  try {
    const data = await req.json();
    const { id } = data;
    if (!id) {
      return new Response("No result with that id", { status: 400 });
    }
    const deletedResult = await db.result.delete({
      where: {
        id: id,
      },
    });

    return Response.json(deletedResult);
  } catch (err) {
    console.error("Delete problem", err);
    return new Response("probljem", { status: 403 });
  }
}
