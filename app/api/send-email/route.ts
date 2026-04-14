import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "Glowgavin Overseas Pvt Ltd",
          email: "krgarav@gmail.com",
        },
        to: [
          {
            email: "krgarav@gmail.com",
          },
        ],
        subject: "New Contact Form Message",
        htmlContent: `
          <div style="margin:0; padding:0; background-color:#f8f8f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
            
            <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #eee;">
              
              <!-- Header -->
              <div style="padding:24px 28px; border-bottom:1px solid #f0f0f0;">
                <h2 style="margin:0; font-size:20px; font-weight:600; color:#111;">
                  New Contact Inquiry
                </h2>
                <p style="margin:6px 0 0; font-size:13px; color:#777;">
                  Received from your website
                </p>
              </div>

              <!-- Content -->
              <div style="padding:28px;">
                
                <!-- Info Grid -->
                <table style="width:100%; border-collapse:collapse; font-size:14px;">
                  <tr>
                    <td style="padding:10px 0; color:#888; width:120px;">Name</td>
                    <td style="padding:10px 0; color:#111; font-weight:500;">${body.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#888;">Email</td>
                    <td style="padding:10px 0; color:#111;">${body.email}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#888;">Phone</td>
                    <td style="padding:10px 0; color:#111;">${body.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#888;">Type</td>
                    <td style="padding:10px 0; color:#111;">${body.inquiryType}</td>
                  </tr>
                </table>

                <!-- Divider -->
                <div style="height:1px; background:#eee; margin:20px 0;"></div>

                <!-- Message -->
                <div>
                  <p style="margin:0 0 10px; font-size:13px; color:#888; letter-spacing:0.05em;">
                    MESSAGE
                  </p>
                  <div style="background:#fafafa; border:1px solid #eee; border-radius:8px; padding:16px; color:#222; line-height:1.6;">
                    ${body.message}
                  </div>
                </div>

                <!-- CTA -->
                <div style="margin-top:24px;">
                  <a href="mailto:${body.email}" 
                    style="display:inline-block; padding:12px 20px; background:#111; color:#fff; text-decoration:none; border-radius:6px; font-size:13px; letter-spacing:0.05em;">
                    Reply to Customer
                  </a>
                </div>

              </div>

              <!-- Footer -->
              <div style="padding:18px 28px; background:#fafafa; font-size:12px; color:#999; text-align:center;">
                © ${new Date().getFullYear()} Glowgavin Overseas Pvt Ltd • Contact Form Notification
              </div>

            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
