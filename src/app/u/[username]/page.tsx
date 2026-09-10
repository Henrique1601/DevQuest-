import React from "react";
import { Metadata } from "next";
import { PublicPortfolioView } from "@/components/profile/PublicPortfolioView";

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PublicProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  return {
    title: `Portfólio de @${decodedUsername} | DevQuest Pro`,
    description: `Confira o perfil técnico, heatmap de contribuições, desafios resolvidos e projetos de @${decodedUsername} no DevQuest Pro.`,
  };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  return <PublicPortfolioView username={decodedUsername} />;
}