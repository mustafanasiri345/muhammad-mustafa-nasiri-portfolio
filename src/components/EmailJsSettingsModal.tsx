import { useState } from 'react';
import { X, Check, Key, ShieldCheck, Mail, ExternalLink, RefreshCw, AlertCircle, Copy } from 'lucide-react';
import { getEmailJsConfig, saveEmailJsConfig, isEmailJsConfigured, EmailJsConfig } from '../services/emailService';

interface EmailJsSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export function EmailJsSettingsModal({ isOpen, onClose, onSaved }: EmailJsSettingsModalProps) {
  const [config, setConfig] = useState<EmailJsConfig>(getEmailJsConfig());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmailJsConfig(config);
    setSaveSuccess(true);
    if (onSaved) onSaved();
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1500);
  };

  const templateSnippet = `Hello Muhammad Mustafa,

You received a new inquiry on your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Phone / WhatsApp: {{user_phone}}

Message:
{{message}}

Sent on: {{submission_time}}
Recipient: {{to_email}}`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(templateSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  const configured = isEmailJsConfigured();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-[#0c1220] border border-amber-400/30 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close settings"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              EmailJS Integration Settings
            </h3>
            <p className="text-xs text-slate-400">
              Configure your EmailJS credentials to receive inquiries directly in your inbox.
            </p>
          </div>
        </div>

        {/* Status pill */}
        <div className="mb-6 p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${configured ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            <span className="text-slate-300">
              {configured ? 'EmailJS is Active (Live Delivery)' : 'EmailJS in Test / Placeholder Mode'}
            </span>
          </div>
          <a
            href="https://dashboard.emailjs.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 underline"
          >
            <span>Get Free Keys (EmailJS.com)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Target Recipient Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Destination Email (Where inquiries are delivered)
            </label>
            <input
              type="email"
              value={config.recipientEmail}
              onChange={(e) => setConfig({ ...config, recipientEmail: e.target.value })}
              placeholder="mustafanasiri345@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Your default configured email: <span className="text-amber-300">mustafanasiri345@gmail.com</span>
            </p>
          </div>

          {/* Service ID */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              EmailJS Service ID
            </label>
            <input
              type="text"
              value={config.serviceId}
              onChange={(e) => setConfig({ ...config, serviceId: e.target.value })}
              placeholder="e.g. service_xxxxxxx (from EmailJS Email Services tab)"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          {/* Template ID */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              EmailJS Template ID
            </label>
            <input
              type="text"
              value={config.templateId}
              onChange={(e) => setConfig({ ...config, templateId: e.target.value })}
              placeholder="e.g. template_xxxxxxx (from EmailJS Email Templates tab)"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          {/* Public Key */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              EmailJS Public Key (Account API Key)
            </label>
            <input
              type="text"
              value={config.publicKey}
              onChange={(e) => setConfig({ ...config, publicKey: e.target.value })}
              placeholder="e.g. YOUR_PUBLIC_KEY (from EmailJS Account > API Keys)"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          {/* Save Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg shadow transition-all cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Settings Saved Successfully!</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Save EmailJS Settings</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Template Variables Helper Accordion */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">
              Recommended Email Template Body:
            </span>
            <button
              type="button"
              onClick={handleCopySnippet}
              className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 cursor-pointer"
            >
              {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSnippet ? 'Copied' : 'Copy Template'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-black/60 font-mono text-[10px] text-slate-300 overflow-x-auto border border-white/5 whitespace-pre-wrap">
            {templateSnippet}
          </pre>
          <p className="mt-2 text-[10px] text-slate-500">
            Note: You can also set these permanently in <code className="text-amber-300">.env</code> as <code className="text-amber-300">VITE_EMAILJS_SERVICE_ID</code>, <code className="text-amber-300">VITE_EMAILJS_TEMPLATE_ID</code>, and <code className="text-amber-300">VITE_EMAILJS_PUBLIC_KEY</code>.
          </p>
        </div>

      </div>
    </div>
  );
}
