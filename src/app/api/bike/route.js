import db from "@/lib/db/db";
import { auth } from "@/lib/auth";
export async function POST(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  const data = await req.json();
  const newBike = await db.bike.create({
    data: {
      bikeName: data.bikeName,
      model: data.model,
      modelYear: data.modelYear,
      bikeInfo: data.bikeInfo,
      userId: session.user.id,
    },
  });
  return Response.json(newBike);
}

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }

  const bikes = await db.bike.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return Response.json(bikes);
}
export async function PUT(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const data = await req.json();
    const updatedBike = await db.bike.update({
      where: { idBike: data.idBike },
      data: {
        model: data.model,
        modelYear: data.modelYear,
        bikeInfo: data.bikeInfo,
        userId: data.userId,
        bikeName: data.bikeName,
      },
    });
    return Response.json(updatedBike);
  } catch (err) {
    console.error("Update error", err);
    return new Response("Bike not found or you do not have permission", {
      status: 403,
    });
  }
}

export async function DELETE(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  try {
    const data = await req.json();
    const { idBike } = data;

    if (!idBike) {
      return new Response("Bike id does not exist", { status: 400 });
    }

    const deletedBike = await db.bike.delete({
      where: { idBike: idBike },
    });

    return Response.json(deletedBike);
  } catch (err) {
    console.error("Delete error", err);
    return new Response("Bike not found or you do not have permission", {
      status: 403,
    });
  }
}
