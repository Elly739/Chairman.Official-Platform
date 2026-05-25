import type { NextRequest } from "next/server";
import { getEventCardConcept } from "@/lib/event-card-concepts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapLines(value: string, width: number) {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function renderIcon(slug: string, accent: string, primary: string) {
  if (slug === "eid-mubarak") {
    return `
      <g transform="translate(220 145)">
        <circle cx="120" cy="120" r="104" fill="${accent}" opacity="0.18"/>
        <path d="M156 24c-33 11-58 44-58 83 0 39 25 72 58 83-16 9-35 14-55 14-62 0-112-50-112-112S39 0 101 0c20 0 39 5 55 14z" fill="${primary}"/>
        <path d="M152 35c-24 9-42 33-42 61 0 28 18 52 42 61-11 6-24 10-38 10-49 0-88-39-88-88S65-9 114-9c14 0 27 4 38 10z" fill="${accent}"/>
        <g fill="${primary}" opacity="0.96">
          <circle cx="156" cy="17" r="6"/>
          <circle cx="198" cy="59" r="5"/>
          <circle cx="178" cy="138" r="5"/>
          <circle cx="92" cy="180" r="5"/>
          <circle cx="57" cy="104" r="6"/>
        </g>
      </g>
      <g stroke="${accent}" stroke-width="4" stroke-linecap="round">
        <line x1="118" y1="24" x2="118" y2="68" />
        <line x1="748" y1="22" x2="748" y2="72" />
        <line x1="610" y1="10" x2="610" y2="58" />
      </g>
      <g>
        <g transform="translate(92 68)">
          <rect x="-18" y="0" width="36" height="54" rx="12" fill="#fff4d6" stroke="${accent}" stroke-width="4"/>
          <rect x="-9" y="16" width="18" height="24" rx="8" fill="${accent}" opacity="0.35"/>
        </g>
        <g transform="translate(748 72)">
          <rect x="-18" y="0" width="36" height="54" rx="12" fill="#fff4d6" stroke="${accent}" stroke-width="4"/>
          <rect x="-9" y="16" width="18" height="24" rx="8" fill="${accent}" opacity="0.35"/>
        </g>
        <g transform="translate(610 58)">
          <rect x="-18" y="0" width="36" height="54" rx="12" fill="#fff4d6" stroke="${accent}" stroke-width="4"/>
          <rect x="-9" y="16" width="18" height="24" rx="8" fill="${accent}" opacity="0.35"/>
        </g>
      </g>`;
  }

  if (slug === "christmas-message") {
    return `
      <g transform="translate(410 128)">
        <polygon points="120,8 192,120 48,120" fill="#1a6a4a"/>
        <polygon points="120,58 212,194 28,194" fill="#145b3e"/>
        <polygon points="120,128 232,282 8,282" fill="#0f4b34"/>
        <rect x="98" y="282" width="44" height="72" rx="12" fill="#8c5a2b"/>
        <circle cx="120" cy="18" r="14" fill="${accent}"/>
      </g>
      <g fill="${accent}" opacity="0.9">
        <circle cx="170" cy="124" r="8"/>
        <circle cx="242" cy="174" r="7"/>
        <circle cx="580" cy="132" r="7"/>
        <circle cx="652" cy="206" r="8"/>
        <circle cx="720" cy="126" r="6"/>
      </g>`;
  }

  return `
    <g transform="translate(378 128)">
      <ellipse cx="92" cy="78" rx="56" ry="68" fill="#f1d8c1" stroke="${accent}" stroke-width="4"/>
      <ellipse cx="194" cy="46" rx="44" ry="58" fill="#d4e4f6" stroke="${accent}" stroke-width="4"/>
      <ellipse cx="282" cy="84" rx="48" ry="64" fill="#f5e1ec" stroke="${accent}" stroke-width="4"/>
      <line x1="92" y1="146" x2="92" y2="260" stroke="${primary}" stroke-width="6"/>
      <line x1="194" y1="104" x2="194" y2="260" stroke="${primary}" stroke-width="6"/>
      <line x1="282" y1="148" x2="282" y2="260" stroke="${primary}" stroke-width="6"/>
      <path d="M112 262c26-18 46-18 72 0" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
      <path d="M214 262c24-16 42-16 64 0" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
    </g>`;
}

function renderMessageLines(lines: string[]) {
  return lines
    .map((line, index) => `<text x="420" y="${560 + index * 34}" text-anchor="middle">${escapeXml(line)}</text>`)
    .join("");
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { slug } = await params;
  const event = getEventCardConcept(slug);

  if (!event) {
    return Response.json({ message: "Event card not found." }, { status: 404 });
  }

  const shouldDownload = request.nextUrl.searchParams.get("download") === "1";
  const messageLines = wrapLines(event.message, 42).slice(0, 4);

  const svg = `
    <svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1080" height="1080" rx="46" fill="${event.background}"/>
      <rect x="28" y="28" width="1024" height="1024" rx="36" fill="url(#cardBg)" stroke="#d8dfe6" stroke-width="2"/>
      <rect x="78" y="74" width="924" height="842" rx="34" fill="rgba(255,255,255,0.72)" stroke="#f0e7cf" stroke-width="3"/>
      <rect x="78" y="888" width="924" height="128" rx="0" fill="${event.primary}"/>
      <path d="M780 888H1002V1016H640C686 988 724 948 780 888Z" fill="#082c47"/>
      <text x="120" y="970" fill="#ffffff" font-size="38" font-family="Georgia, serif" font-weight="700">Chairman.Official</text>
      <text x="120" y="1008" fill="#d6dde6" font-size="20" font-family="Arial, Helvetica, sans-serif">Thought Leadership. Innovation. Impact.</text>
      <text x="942" y="968" text-anchor="end" fill="#ffffff" font-size="26" font-family="Arial, Helvetica, sans-serif" font-weight="700">chairman.official</text>
      <text x="942" y="1006" text-anchor="end" fill="#d6dde6" font-size="18" font-family="Arial, Helvetica, sans-serif">${escapeXml(event.signature)}</text>
      ${renderIcon(event.slug, event.accent, event.primary)}
      <text x="540" y="454" text-anchor="middle" fill="${event.primary}" font-size="28" letter-spacing="14" font-family="Arial, Helvetica, sans-serif">${escapeXml(event.occasion.toUpperCase())}</text>
      <text x="540" y="518" text-anchor="middle" fill="${event.primary}" font-size="64" font-weight="700" letter-spacing="8" font-family="Georgia, serif">${escapeXml(event.title.toUpperCase())}</text>
      <g fill="${event.primary}" font-size="24" font-family="Arial, Helvetica, sans-serif">
        ${renderMessageLines(messageLines)}
      </g>
      <text x="540" y="724" text-anchor="middle" fill="${event.accent}" font-size="18" letter-spacing="6" font-family="Arial, Helvetica, sans-serif">${escapeXml(event.motif.toUpperCase())}</text>
      <g fill="${event.primary}" opacity="0.08">
        <circle cx="130" cy="276" r="8"/>
        <circle cx="950" cy="226" r="7"/>
        <circle cx="154" cy="780" r="6"/>
        <circle cx="910" cy="768" r="8"/>
      </g>
      <defs>
        <linearGradient id="cardBg" x1="86" y1="58" x2="984" y2="950" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fffdf9"/>
          <stop offset="1" stop-color="#f7f0de"/>
        </linearGradient>
      </defs>
    </svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      ...(shouldDownload
        ? { "Content-Disposition": `attachment; filename="${event.slug}-chairman-official-card.svg"` }
        : {}),
    },
  });
}
