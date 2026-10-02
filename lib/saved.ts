"use client";

import { useSyncExternalStore } from "react";

const KEY = "hfh-saved";
const EVENT = "hfh-saved-change";
const EMPTY: string[] = [];

let cache: { raw: string | null; value: string[] } = { raw: null, value: EMPTY };

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY; // storage blocked (private mode, cookies off)
  }
  if (raw === cache.raw) return cache.value;
  let value = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : EMPTY;
    if (Array.isArray(parsed)) value = parsed.filter((v): v is string => typeof v === "string");
  } catch {}
  cache = { raw, value };
  return value;
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Guide hrefs the reader has bookmarked on this device (localStorage, no account). */
export function useSaved(): string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function toggleSaved(href: string) {
  const current = read();
  const next = current.includes(href) ? current.filter((h) => h !== href) : [...current, href];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(EVENT));
}
