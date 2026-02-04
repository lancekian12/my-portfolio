"use client";

import { SmoothCursor } from "@/components/ui/smooth-cursor";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function ClientEffects() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <SmoothCursor />}
    </>
  );
}
