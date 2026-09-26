import emailjs from '@emailjs/browser';

export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  recipientEmail: string;
}

const STORAGE_KEY = 'mustafa_emailjs_config';

export function getEmailJsConfig(): EmailJsConfig {
  // Check local storage first (allows direct UI customization)
  const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.publicKey || parsed.serviceId || parsed.templateId) {
        return {
          serviceId: parsed.serviceId || import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
          templateId: parsed.templateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
          publicKey: parsed.publicKey || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
          recipientEmail: parsed.recipientEmail || import.meta.env.VITE_RECIPIENT_EMAIL || 'mustafanasiri345@gmail.com'
        };
      }
    } catch {
      // Fallback
    }
  }

  // Fallback to environment variables
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    recipientEmail: import.meta.env.VITE_RECIPIENT_EMAIL || 'mustafanasiri345@gmail.com'
  };
}

export function saveEmailJsConfig(config: EmailJsConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}

export function isEmailJsConfigured(): boolean {
  const config = getEmailJsConfig();
  return Boolean(
    config.publicKey &&
    config.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
    config.serviceId &&
    config.serviceId !== 'service_default' &&
    config.templateId &&
    config.templateId !== 'template_contact'
  );
}

export interface SendEmailPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  statusText?: string;
  error?: string;
  isSimulated?: boolean;
}

export async function sendContactEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
  const config = getEmailJsConfig();

  // If fully configured with real keys, execute real EmailJS dispatch
  if (isEmailJsConfigured()) {
    try {
      const templateParams = {
        // Broad parameter compatibility with standard EmailJS templates
        name: payload.name,
        user_name: payload.name,
        from_name: payload.name,
        email: payload.email,
        user_email: payload.email,
        from_email: payload.email,
        reply_to: payload.email,
        phone: payload.phone,
        user_phone: payload.phone,
        message: payload.message,
        to_email: config.recipientEmail || 'mustafanasiri345@gmail.com',
        to_name: 'Muhammad Mustafa Nasiri',
        submission_time: new Date().toLocaleString(),
      };

      const response = await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        config.publicKey
      );

      return {
        success: response.status === 200,
        statusText: response.text || 'Email sent successfully via EmailJS!'
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        error: errorMsg || 'Failed to dispatch email via EmailJS.'
      };
    }
  }

  // If not yet configured, simulate delivery with real delay and prompt the user with setup instructions
  await new Promise((resolve) => setTimeout(resolve, 850));

  return {
    success: true,
    isSimulated: true,
    statusText: `Message dispatched in test mode to ${config.recipientEmail}. Configure your EmailJS keys to enable live SMTP delivery.`
  };
}
