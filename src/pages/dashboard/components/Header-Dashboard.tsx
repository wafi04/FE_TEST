import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

interface HeaderDashboardProps {
  title: string;
  subTitle: string;
  children?: ReactNode;
}

export function HeaderDashboard({
  subTitle,
  title,
  children,
}: HeaderDashboardProps) {
  return (
    <div className="w-full bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/products">
                  {title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl font-bold text-gray-800 mt-2">{title}</h1>
          <p className="text-muted-foreground">{subTitle}</p>
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
