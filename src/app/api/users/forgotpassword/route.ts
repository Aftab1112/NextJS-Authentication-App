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
        { status: 500 }
      );
    }

    const userId = (user._id as string).toString();
    await sendEmail({ email, emailType: "RESET", userId });

    return NextResponse.json(
      {
        message: "Email sent",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Error sending email",
        },
        {
          status: 500,
        }
      );
    }
  }
};
