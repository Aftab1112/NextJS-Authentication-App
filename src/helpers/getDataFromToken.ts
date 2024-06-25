import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    if (!encodedToken) {
      throw new Error("Token not found in cookies");
    }

    const decodedToken = jwt.verify(
      encodedToken,
      process.env.JWT_SECRET_KEY!
    ) as CustomJwtPayload;
    if (!decodedToken?.id) {
      throw new Error("Invalid token format or missing user ID");
    }

    return decodedToken.id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
