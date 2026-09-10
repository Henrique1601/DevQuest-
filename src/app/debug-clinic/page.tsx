import { DebugClinicApp } from "@/components/debug-clinic/DebugClinicApp";

export const metadata = {
  title: "Debug Clinic: Erros Clássicos & Soluções | DevQuest",
  description: "Diagnostique erros clássicos de JavaScript, React, Node.js, TypeScript e Git com comparativo visual do código corrigido.",
};

export default function DebugClinicPage() {
  return (
    <div className="pt-20">
      <DebugClinicApp />
    </div>
  );
}
