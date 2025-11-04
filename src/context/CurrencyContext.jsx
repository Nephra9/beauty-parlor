import React, { createContext, useContext, useMemo, useState } from "react";

const CurrencyContext = createContext({ code: "INR", format: (v)=>String(v), setCode: ()=>{} });

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState("INR");
  const format = (value) => new Intl.NumberFormat(code === "INR" ? "en-IN" : "en-US", { style: "currency", currency: code }).format(value);
  const value = useMemo(() => ({ code, setCode, format }), [code]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() { return useContext(CurrencyContext); }


