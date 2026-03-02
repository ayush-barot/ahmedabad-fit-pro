import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const ScarcityBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-8 text-center"
    >
      <Badge variant="outline" className="border-destructive/40 text-destructive px-4 py-2 text-sm animate-pulse">
        <AlertTriangle className="w-4 h-4 mr-2" />
        ⚡ Limited to 10 Clients Per Area — Spots Filling Fast!
      </Badge>
    </motion.div>
  );
};

export default ScarcityBadge;
