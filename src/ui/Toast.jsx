import React from "react";
import { Toaster, toast } from "sonner";

export function ToastProvider() {
  return <Toaster richColors position="top-right" />;
}

export const notify = {
  success: (m) => toast.success(m),
  error: (m) => toast.error(m),
  info: (m) => toast(m),
};


