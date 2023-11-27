import { NextResponse } from "next/server";
import transporter from "@/config/nodemailer";

interface Params {
  params: { id: string };
}

export async function POST(request: Request, { params }: Params) {
  const { observaciones, correo } = await request.json();
  console.log({ observaciones, correo });

  const mailOptions = {
    from: `Contractación INDER ${process.env.EMAIL}`,
    to: `${correo}`,
    subject: "Revisar documentos de contractación del INDER",
    html: `
    <div>
      <p>${observaciones}</p>
    </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
