import db from "@/lib/db/db";
import { auth } from "@/lib/auth";
export async function POST(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  const data = await req.json();
  const newSetup = await db.setup.create({
    data: {
      setupName: data.setupName,
      frontTyrePressure: data.frontTyrePressure,
      forkPressure: data.forkPressure,
      hsrf: data.hsrf,
      lsrf: data.lsrf,
      hscf: data.hscf,
      lscf: data.lscf,
      tokenNumberf: data.tokenNumberf,
      sagf: data.sagf,
      rearTyrePressure: data.rearTyrePressure,
      shockPressure: data.shockPressure,
      hsrr: data.hsrr,
      lsrr: data.lsrr,
      hscr: data.hscr,
      lscr: data.lscr,
      tokenNumberr: data.tokenNumberr,
      sagr: data.sagr,
      userId: session.user.id,
    },
  });
  return Response.json(newSetup);
}

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }

  const setups = await db.setup.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return Response.json(setups);
}
