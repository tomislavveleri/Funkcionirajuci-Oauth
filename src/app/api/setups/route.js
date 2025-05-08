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
export async function PUT(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  const data = await req.json();

  const updatedSetup = await db.setup.update({
    where: { idSetup: data.idSetup },
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
    },
  });
  return Response.json(updatedSetup);
}

export async function DELETE(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const data = await req.json();
    const { idSetup } = data;

    if (!idSetup) {
      return new Response("Missing idTrack", { status: 400 });
    }

    const deletedSetup = await db.setup.delete({
      where: {
        idSetup: idSetup,
        // If your table uses compound unique keys, you can include:
        // userId: session.user.id,
      },
    });
    return Response.json(deletedSetup);
  } catch (err) {
    console.error("Delete error:", err);
    return new Response("Track not found or you do not have permission", {
      status: 403,
    });
  }
}
