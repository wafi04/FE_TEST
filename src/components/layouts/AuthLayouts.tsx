import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingOverlay } from "../ui/skeleton/LoadingOverlay";
import { LayoutProps } from "../../types/types.utils";
import { pageTransition, pageVariants } from "../../utils/layout.settings";
import { Navbar } from "./Navbar";
import { useAuth } from "../../hooks/auth/Auth-Provider";

export function MainLayout({
  children,
  className = "",
  requireAuth = true,
  title = "Aplikasi",
}: LayoutProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    document.title = title;

    if (requireAuth && !isLoading && !isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, isLoading, navigate, requireAuth, title]);

  if (requireAuth && isLoading) {
    return <LoadingOverlay />;
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`
          min-h-screen 
          overflow-hidden
          w-full 
          flex 
          flex-col 
          bg-background 
          text-foreground 
          ${className}
        `}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// parent component yang memrlukan authentication
export function ProtectedLayout({
  children,
  ...props
}: Omit<LayoutProps, "requireAuth">) {
  const { user } = useAuth();
  return (
    <MainLayout requireAuth={true} {...props}>
      <Navbar user={user} />
      {children}
    </MainLayout>
  );
}

// component  yang endpointnya untuk public
export function PublicLayout({
  children,
  ...props
}: Omit<LayoutProps, "requireAuth">) {
  return (
    <MainLayout requireAuth={false} {...props}>
      {children}
    </MainLayout>
  );
}
