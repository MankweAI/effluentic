"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first and primary spoke page
    router.replace("/spokes/how-to-treat-high-fat-wastewater");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-brand-steel">Redirecting...</p>
    </div>
  );
}
