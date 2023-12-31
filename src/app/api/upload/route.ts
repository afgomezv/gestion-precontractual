import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const file: File | null = data.get("file") as unknown as File;
  const cedula: string | null = data.get("cedula") as unknown as string;

  if (!file && !cedula) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const folderName = path.join(
    process.cwd(),
    "public/pdfs",
    path.basename(cedula, path.extname(file.name))
  );
  await mkdir(folderName, { recursive: true });

  const filePath = path.join(folderName, file.name);
  await writeFile(filePath, buffer);
  console.log(`open ${filePath} to see the uploaded file`);

  return NextResponse.json({ success: true });
}
