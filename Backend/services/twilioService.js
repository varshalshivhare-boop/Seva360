const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

let client = null;

if (accountSid && authToken && accountSid.startsWith('AC')) {
  try {
    client = twilio(accountSid, authToken);
    console.log('[Twilio Service]: Initialized successfully');
  } catch (err) {
    console.warn('[Twilio Service]: Initialization error:', err.message);
  }
} else {
  console.log('[Twilio Service]: Twilio credentials missing in .env - Running in simulation mode');
}

/**
 * Send SMS notification to user
 * @param {string} to - Recipient phone number
 * @param {string} messageBody - Text message content
 */
const sendSMS = async (to, messageBody) => {
  if (client && fromPhone) {
    try {
      const response = await client.messages.create({
        body: messageBody,
        from: fromPhone,
        to: to,
      });
      console.log(`[Twilio SMS Sent]: SID ${response.sid} to ${to}`);
      return { success: true, sid: response.sid };
    } catch (error) {
      console.error(`[Twilio SMS Failed]: ${error.message}`);
      return { success: false, error: error.message };
    }
  } else {
    console.log(`[Twilio SMS Simulation] To: ${to} | Message: "${messageBody}"`);
    return { success: true, simulated: true };
  }
};

/**
 * Send WhatsApp notification to user via Twilio
 * @param {string} to - Recipient phone number (without whatsapp: prefix)
 * @param {string} messageBody - Text message content (used as fallback)
 * @param {object} options - Optional: { contentSid, contentVariables }
 */
const sendWhatsApp = async (to, messageBody, options = {}) => {
  const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM || `whatsapp:${fromPhone}`;
  const contentSid = options.contentSid || process.env.TWILIO_WHATSAPP_CONTENT_SID;

  if (client && fromPhone) {
    try {
      const msgPayload = {
        from: whatsappFrom,
        to: `whatsapp:${to}`,
      };

      // Use Content Template if available, otherwise plain body
      if (contentSid) {
        msgPayload.contentSid = contentSid;
        if (options.contentVariables) {
          msgPayload.contentVariables = JSON.stringify(options.contentVariables);
        }
      } else {
        msgPayload.body = messageBody;
      }

      const response = await client.messages.create(msgPayload);
      console.log(`[Twilio WhatsApp Sent]: SID ${response.sid} to ${to}`);
      return { success: true, sid: response.sid };
    } catch (error) {
      console.error(`[Twilio WhatsApp Failed]: ${error.message}`);
      return { success: false, error: error.message };
    }
  } else {
    console.log(`[Twilio WhatsApp Simulation] To: ${to} | Message: "${messageBody}"`);
    return { success: true, simulated: true };
  }
};

module.exports = {
  sendSMS,
  sendWhatsApp,
};
