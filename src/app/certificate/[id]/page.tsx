import { Metadata } from "next";
import { CertificateView } from "@/components/certificate/CertificateView";

interface CertificatePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Certificado Oficial #${resolvedParams.id} | DevQuest`,
    description: "Certificado verificável de conclusão de trilha e aprovação em testes técnicos no DevQuest.",
  };
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const resolvedParams = await params;

  return (
    <div className="pt-20">
      <CertificateView certificateId={resolvedParams.id} />
    </div>
  );
}
