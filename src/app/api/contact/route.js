// This file should be placed in your Next.js project at /app/api/contact/route.js

import { NextResponse } from 'next/server';

// Discord API constants
const DISCORD_API_URL = 'https://discord.com/api/v10';
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_RECIPIENT_ID = process.env.DISCORD_RECIPIENT_ID; // 503152077824851968

export async function POST(req) {
  try {
    // Parse the incoming form data
    const formData = await req.json();
    const { fullname, email, subject, body } = formData;
    
    // Validate required fields
    if (!fullname || !email || !subject || !body) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields' 
      }, { status: 400 });
    }
    
    // Create message content for Discord
    const messageContent = `
**New Contact Form Submission**

**Name:** ${fullname}
**Email:** ${email}
**Subject:** ${subject}

**Message:**
${body}

*Submitted on: ${new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'})}*
    `;
    
    // First create a DM channel with the user
    const dmChannelResponse = await fetch(`${DISCORD_API_URL}/users/@me/channels`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient_id: DISCORD_RECIPIENT_ID
      })
    });
    
    if (!dmChannelResponse.ok) {
      throw new Error(`Failed to create DM channel: ${dmChannelResponse.status}`);
    }
    
    const dmChannel = await dmChannelResponse.json();
    
    // Then send a message to that channel
    const messageResponse = await fetch(`${DISCORD_API_URL}/channels/${dmChannel.id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: messageContent
      })
    });
    
    if (!messageResponse.ok) {
      throw new Error(`Failed to send message: ${messageResponse.status}`);
    }
    
    // Return success response to the frontend
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    });
    
  } catch (error) {
    console.error('Error sending message to Discord:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending message' 
    }, { status: 500 });
  }
}