export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://your-vercel-app-url.vercel.app",
          "X-Title": "SPENDWISE AI"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a professional financial advisor AI."
            },
            {
              role: "user",
              content: `
              Financial Summary:
              Income: ${body.income}
              Expenses: ${body.expense}
              Transactions: ${JSON.stringify(body.transactions)}

              Give short smart financial advice.
              `
            }
          ]
        })
      }
    );

    const data = await response.json();

    return Response.json({
      insight: data.choices[0].message.content
    });

  } catch (error) {
    return Response.json({
      insight: "Unable to generate insight right now."
    });
  }
}
