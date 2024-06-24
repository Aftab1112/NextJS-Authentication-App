import { connectToMongoDB } from "@/database/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToMongoDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "User dosen't exists",
        },
        { status: 404 }
      );
    }

    const userId = (user._id as string).toString();
    await sendEmail({ email, emailType: "RESET", userId });

    return NextResponse.json(
      {
        message: "Email sent",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST request : ", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error sending email",
      },
      { status: 500 }
    );
  }
};
