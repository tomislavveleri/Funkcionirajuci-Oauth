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
