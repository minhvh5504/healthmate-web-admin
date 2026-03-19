export type OtpPurpose = 'register' | 'forgot_password';

export type OtpSessionInfo = {
  phone: string;
  purpose: OtpPurpose;
  tempData?: {
    username?: string;
    email?: string;
    password?: string;
    token?: string;
  };
  timestamp?: number;
};

const OTP_STORAGE_KEY = 'otp_session';
const OTP_EXPIRY_TIME = 15 * 60 * 1000; // 15m

export const otpStorage = {
  set: (info: OtpSessionInfo) => {
    const data = {
      ...info,
      timestamp: Date.now(),
    };
    localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(data));
  },

  get: (): OtpSessionInfo | null => {
    const stored = localStorage.getItem(OTP_STORAGE_KEY);
    if (!stored) return null;

    try {
      const data: OtpSessionInfo = JSON.parse(stored);

      if (data.timestamp && Date.now() - data.timestamp > OTP_EXPIRY_TIME) {
        otpStorage.clear();
        return null;
      }

      return data;
    } catch {
      return null;
    }
  },

  update: (updates: Partial<OtpSessionInfo>) => {
    const current = otpStorage.get();
    if (current) {
      otpStorage.set({ ...current, ...updates });
    }
  },

  clear: () => {
    localStorage.removeItem(OTP_STORAGE_KEY);
  },

  exists: (): boolean => {
    return otpStorage.get() !== null;
  },
};