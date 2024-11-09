import { AllCity } from '../utils';
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(AllCity);
}
