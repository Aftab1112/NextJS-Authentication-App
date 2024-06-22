import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      encodedToken,
      process.env.JWT_SECRET_KEY!
    ) as CustomJwtPayload;
    return decodedToken.id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.log(error);
    }
  }
};
