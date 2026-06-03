"use client";

import { useEffect } from "react";

export function DataPreloader() {
  useEffect(() => {
    fetch("/api/projects").catch(() => {});
    fetch("/api/blog").catch(() => {});
  }, []);

  return null;
}
