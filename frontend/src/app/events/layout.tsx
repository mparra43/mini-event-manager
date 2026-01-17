'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth, useAuth } from "../../context/AuthContext";
import Header from "@/transversal/components/Header";
import { logout as apiLogout } from "../../services/auth.service";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useRequireAuth();
  const router = useRouter();
  const { logout: ctxLogout } = useAuth();
  function handleLogout() {
    try {
      apiLogout();
    } finally {
      ctxLogout();
      router.replace("/");
    }
  }

  if (isLoading) {
    return (
      <div className="">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Mini Event Manager"
        rightButtonLabel="Cerrar sesión"
        rightButtonVariant="secondary"
        onRightButtonClick={handleLogout}
      />
      {children}
    </div>
  );
}
