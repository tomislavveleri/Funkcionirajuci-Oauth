import db from "@/lib/db/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  const users = await db.user.findMany({
    where: {
      id: session.user.id,
    },
  });
  return Response.json(users);
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
      console.error("There is no user with that ID", { status: 403 });
    }

    const deletedUser = await db.user.delete({
      where: { id: session.user.id },
    });

    return Response.json(deletedUser);
  } catch (err) {
    console.error("Delete error:", err);
    return new Response("User not found or you do not have permission", {
      status: 403,
    });
  }
}
export async function PUT(req) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new Response("Unauthorised", { status: 401 });
  }
  try {
    const data = await req.json();

    const { name } = data;
    const { password } = data;

    const updatedName = await db.user.update({
      where: { id: session.user.id },
      data: { name: name, password: password },
    });

    return Response.json(updatedName);
  } catch (err) {
    console.error("Delete error:", err);
    return new Response("User not found or you do not have permission", {
      status: 403,
    });
  }
}
