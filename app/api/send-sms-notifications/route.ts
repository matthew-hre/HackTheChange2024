// app/api/send-notifications/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import twilio from "twilio";
import OpenAI from "openai";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  const {
    eventId,
    eventTitle,
    eventCause,
    eventDescription,
    eventLocation,
    eventDate,
  } = await request.json();

  const supabase = await createClient();

  // where users have phone numbers and causes
  const { data } = await supabase
    .from("users")
    .select("phone, causes")
    .neq("phone", null);

  if (!data) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }

  const { data: noteCauses } =
    (await supabase.from("causes").select("name, id")) ?? [];

  const subscribers = data?.filter((user) => user.causes.includes(eventCause));

  if (!subscribers.length) {
    return NextResponse.json(
      { success: false, error: "No subscribers found" },
      { status: 404 }
    );
  }

  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Write a one to two sentance summary of the following event information.\n\n\nName: ${eventTitle}\nDescription: ${eventDescription}\nLocation: ${eventLocation}\nDate: ${eventDate}`,
      },
    ],
  });

  const causeName = noteCauses?.find((cause) => cause.id === eventCause)?.name;

  try {
    // Send notifications to each subscriber
    await Promise.all(
      subscribers.map(async (subscriber) => {
        console.log("Sending notification to:", subscriber.phone);
        await client.messages.create({
          body: `📢 A New ${causeName} event is happening near you!\n\n${completion.choices[0].message.content}\n\More at https://bloc.party/e/${eventId}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: subscriber.phone,
        });
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send notifications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
