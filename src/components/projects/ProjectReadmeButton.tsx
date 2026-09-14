"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Project } from "@/types/project";
import { ProjectReadmeModal } from "./ProjectReadmeModal";

export function ProjectReadmeButton({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/50"
      >
        <FileText className="w-4 h-4 text-cyan-400" />
        <span>Gerar README para GitHub</span>
      </Button>

      <ProjectReadmeModal
        project={project}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
