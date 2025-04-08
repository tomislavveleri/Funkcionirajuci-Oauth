import { executeAction } from "../executeAction";
import { schema } from "./schema";
import db from "./db";

//Kreiranje sign up pomocu kredencijala
const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = schema.parse({ email, password });
      await db.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          password: validatedData.password,
        },
      });
    },
  });
};
export { signUp };
