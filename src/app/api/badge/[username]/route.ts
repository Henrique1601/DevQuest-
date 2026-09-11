import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const decodedUser = decodeURIComponent(username);

  const isHenrique =
    decodedUser.toLowerCase().includes("henrique") || decodedUser === "henrique_dev";

  const xp = isHenrique ? "2.850" : "1.420";
  const streak = isHenrique ? "18" : "7";
  const solved = isHenrique ? "47" : "24";
  const league = isHenrique ? "Diamante" : "Ouro";
  const leagueEmoji = isHenrique ? "💎" : "🥇";
  const rank = isHenrique ? "#4" : "#28";

  const svg = `
<svg width="495" height="195" viewBox="0 0 495 195" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080B12" />
      <stop offset="50%" stop-color="#0C1322" />
      <stop offset="100%" stop-color="#080B12" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#8B5CF6" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0.2" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#818CF8" />
    </linearGradient>
    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#06B6D4" flood-opacity="0.3"/>
    </filter>
  </defs>

  <style>
    .title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 800; font-size: 16px; fill: #FFFFFF; }
    .badge-label { font-family: "Courier New", monospace; font-size: 10px; fill: #06B6D4; font-weight: bold; letter-spacing: 1px; }
    .label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; fill: #94A3B8; font-weight: 500; }
    .value { font-family: "Courier New", monospace; font-size: 15px; fill: #F8FAFC; font-weight: 800; }
    .highlight { fill: #38BDF8; }
    .fire { fill: #F59E0B; }
    .gold { fill: #FBBF24; }
  </style>

  <!-- Background Card -->
  <rect x="2" y="2" width="491" height="191" rx="16" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5" />

  <!-- Glow circle in corner -->
  <circle cx="450" cy="30" r="40" fill="#06B6D4" fill-opacity="0.08" filter="url(#glow)" />

  <!-- Header: Logo & Username -->
  <g transform="translate(24, 28)">
    <rect x="0" y="0" width="28" height="28" rx="8" fill="#06B6D4" fill-opacity="0.15" stroke="#06B6D4" stroke-opacity="0.4" />
    <path d="M9 19L14 9L19 19" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="38" y="19" class="title">DevQuest Pro</text>
    <rect x="150" y="4" width="72" height="18" rx="9" fill="#06B6D4" fill-opacity="0.15" stroke="#06B6D4" stroke-opacity="0.3"/>
    <text x="160" y="16" class="badge-label">DEV PRO</text>
    <text x="445" y="18" text-anchor="end" class="label">@${decodedUser}</text>
  </g>

  <!-- Divider line -->
  <line x1="24" y1="72" x2="471" y2="72" stroke="#1E293B" stroke-width="1" />

  <!-- Metric 1: XP & Rank -->
  <g transform="translate(24, 90)">
    <rect x="0" y="0" width="100" height="78" rx="12" fill="#050811" stroke="#1E293B" stroke-width="1"/>
    <text x="14" y="22" class="label">PONTUAÇÃO</text>
    <text x="14" y="46" class="value highlight">${xp}</text>
    <text x="14" y="66" class="label" font-size="10">Rank ${rank}</text>
  </g>

  <!-- Metric 2: Streak -->
  <g transform="translate(138, 90)">
    <rect x="0" y="0" width="100" height="78" rx="12" fill="#050811" stroke="#1E293B" stroke-width="1"/>
    <text x="14" y="22" class="label">OFENSIVA</text>
    <text x="14" y="46" class="value fire">🔥 ${streak}d</text>
    <text x="14" y="66" class="label" font-size="10">Dias seguidos</text>
  </g>

  <!-- Metric 3: League -->
  <g transform="translate(252, 90)">
    <rect x="0" y="0" width="105" height="78" rx="12" fill="#050811" stroke="#1E293B" stroke-width="1"/>
    <text x="14" y="22" class="label">LIGA ATUAL</text>
    <text x="14" y="46" class="value gold">${leagueEmoji} ${league}</text>
    <text x="14" y="66" class="label" font-size="10">Top temporada</text>
  </g>

  <!-- Metric 4: Challenges Solved -->
  <g transform="translate(371, 90)">
    <rect x="0" y="0" width="100" height="78" rx="12" fill="#050811" stroke="#1E293B" stroke-width="1"/>
    <text x="14" y="22" class="label">RESOLVIDOS</text>
    <text x="14" y="46" class="value highlight">${solved}</text>
    <text x="14" y="66" class="label" font-size="10">Desafios</text>
  </g>
</svg>
`.trim();

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}