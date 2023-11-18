// Import required modules
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error: https://gitlab.com/autokent/pdf-parse/-/issues/30
import pdf from "pdf-parse/lib/pdf-parse";

export async function POST(req: NextRequest) {
  try {
    const file = (await req.formData()).get("file");
    if (!file || typeof file === "string") {
      throw new Error("Wrong file");
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const { text } = (await pdf(buffer)) as { text: string };

    // Define an array of subscription names
    const subscriptionNames = ['Kansas', 'Panda', 'Braums', 'Netflix', 'Prime', 'HBO']; // Add more subscription names as needed

    // Create a regular expression to match the price (in dollars and cents format)
    const priceRegex = /(?:\$\d+\.\d{2})|(?:-(\d+\.\d{2}))/i;
    const dateRegex = /\b(\d{2}\/\d{2})\b/;
    const year = new Date().getFullYear(); 


    // Prepare an object to store subscription details
    const subscriptions: Record<string, { formattedDate: string; price: number }> = {};
    // Loop through each subscription name
    for (const subscriptionName of subscriptionNames) {
      const searchRegex = new RegExp(`${dateRegex.source}[^-]*${subscriptionName}[^-]*(${priceRegex.source})`, 'i');

      const match = text.match(searchRegex);

      if (match) {
        let date = match[1];
        date = date.replace(/\//g, '-');
        date = date + '-' + year;
        const formattedDate = new Date(date).toISOString().split("T")[0];
        const price = match[2] || match[3];
        subscriptions[subscriptionName] = { formattedDate , price: parseFloat(price) * -1 };
      }
    }

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while processing the PDF: " },
      { status: 500 }
    );
  }
}
