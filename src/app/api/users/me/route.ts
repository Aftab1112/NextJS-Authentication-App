import { connectToMongoDB } from "@/database/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToMongoDB();

export const GET = async (request: NextRequest) => {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Fetch User Error : ", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
};
