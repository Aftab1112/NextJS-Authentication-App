import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Logout Error : ", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occured",
      },
      { status: 500 }
    );
  }
};
