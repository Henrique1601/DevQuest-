import { SnippetVault } from "@/components/snippets/SnippetVault";

export const metadata = {
  title: "Snippet Vault: Códigos & Helpers de Produção | DevQuest",
  description: "Biblioteca de Custom Hooks React, utilitários, validadores de CPF/CNPJ e helpers de banco de dados prontos para uso em produção.",
};

export default function SnippetsPage() {
  return (
    <div className="pt-20">
      <SnippetVault />
    </div>
  );
}
