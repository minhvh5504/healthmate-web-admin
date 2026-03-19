import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL } from '@/constants/api';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    if (!userData.fullName || !userData.phone || !userData.password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Registration failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      redirectTo: '/otp',
      message: data.message || 'Registration successful',
      data: data.data,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
