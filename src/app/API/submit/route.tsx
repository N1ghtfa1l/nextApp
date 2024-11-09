import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  console.log('Data received:', data);

  return NextResponse.json({ success: true }, { status: 200 });
}
