import type { EventCardConcept } from "./event-card-concepts";

const BRAND_NAME = "Chairman.Official";
const BRAND_SITE = "chairman.official";
const BRAND_PHONE = "+254 769 182 575";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapLines(text: string, maxChars: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (trial.length <= maxChars) {
      current = trial;
      continue;
    }

    if (current) {
      lines.push(current);
    }

    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function renderLantern(x: number, y: number, scale: number, accent: string) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <line x1="0" y1="-92" x2="0" y2="-12" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.9" />
      <path d="M-26 -10h52l-6 12H-20z" fill="${accent}" opacity="0.84" />
      <rect x="-24" y="2" width="48" height="94" rx="18" fill="url(#lanternGlow)" stroke="${accent}" stroke-width="3" />
      <rect x="-15" y="16" width="30" height="58" rx="12" fill="#fff9df" opacity="0.92" />
      <path d="M-14 2 C-8 -22 8 -22 14 2" fill="none" stroke="${accent}" stroke-width="3" />
      <path d="M-12 96 C-5 114 5 114 12 96" fill="none" stroke="${accent}" stroke-width="3" />
      <circle cx="0" cy="112" r="5" fill="${accent}" />
      <ellipse cx="0" cy="54" rx="34" ry="56" fill="${accent}" opacity="0.14" />
    </g>
  `;
}

function renderOrnament(x: number, y: number, color: string) {
  return `
    <g transform="translate(${x} ${y})">
      <path d="M0 -20L8 -8L20 0L8 8L0 20L-8 8L-20 0L-8 -8Z" fill="${color}" opacity="0.82" />
      <circle cx="0" cy="0" r="6" fill="#ffffff" opacity="0.88" />
    </g>
  `;
}

function renderBrandMark(primary: string) {
  return `
    <g transform="translate(934 900)">
      <circle cx="62" cy="62" r="54" fill="#ffffff" opacity="0.14" />
      <circle cx="62" cy="62" r="44" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.84" />
      <path d="M36 86V36h38" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
      <path d="M46 86c16-5 31-15 48-31" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
      <circle cx="62" cy="62" r="60" fill="none" stroke="${primary}" stroke-width="2" opacity="0.18" />
    </g>
  `;
}

function renderBackdrop(primary: string) {
  return `
    <g opacity="0.08">
      <rect x="178" y="218" width="724" height="442" rx="36" fill="#ffffff" />
      <path d="M214 624h652v44H214z" fill="${primary}" />
      <path d="M244 614V314h84v300zm120 0V280h102v334zm154 0V332h82v282zm126 0V292h96v322zm142 0V342h70v272z" fill="${primary}" />
      <path d="M160 724c74-58 152-88 236-88 60 0 114 16 144 42 42-26 94-42 154-42 92 0 176 34 246 98v72H160z" fill="${primary}" />
    </g>
    <g opacity="0.14">
      <path d="M132 808l34-70 34 70zM220 808l34-84 34 84zM308 808l34-64 34 64zM396 808l34-94 34 94zM484 808l34-70 34 70zM572 808l34-82 34 82zM660 808l34-66 34 66zM748 808l34-88 34 88zM836 808l34-68 34 68z" fill="${primary}" />
    </g>
  `;
}

function renderCrescent(accent: string, primary: string) {
  return `
    <g transform="translate(304 164)">
      <ellipse cx="274" cy="322" rx="172" ry="34" fill="#0a2140" opacity="0.12" />
      <path d="M285 18C201 44 139 117 124 212c-19 128 69 248 197 267 59 9 118-6 167-37-46 69-122 112-208 112-139 0-252-113-252-252 0-140 109-255 257-284z" fill="${accent}" />
      <path d="M270 38C205 59 159 109 147 179c-18 104 52 204 156 222 43 8 87 0 124-18-34 44-87 72-145 72-101 0-183-82-183-183 0-115 82-213 171-234z" fill="#fffdf6" />
      <path d="M298 90c-18 6-34 19-48 39 17 6 31 16 44 32 13-16 28-26 45-32-17-6-31-19-41-39zm-104 74c-14 5-26 15-34 28 15 4 28 13 37 27 9-14 21-23 36-27-15-5-28-15-39-28zm151 92c-13 5-23 13-31 26 13 4 24 12 32 24 8-12 19-20 32-24-13-5-23-14-33-26z" fill="${primary}" opacity="0.78" />
      <path d="M182 132c18 18 34 29 54 37M162 186c28 20 56 31 91 37M164 244c26 18 52 28 84 33M180 300c19 13 40 21 65 26" fill="none" stroke="${primary}" stroke-width="6" stroke-linecap="round" opacity="0.2" />
      <g opacity="0.3">
        <circle cx="212" cy="148" r="5" fill="${primary}" />
        <circle cx="252" cy="174" r="4.5" fill="${primary}" />
        <circle cx="224" cy="226" r="4.5" fill="${primary}" />
        <circle cx="266" cy="254" r="5" fill="${primary}" />
      </g>
      <path d="M218 328c36 16 86 16 128 0" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.4" />
    </g>
  `;
}

function renderTree(accent: string, primary: string) {
  return `
    <g transform="translate(328 192)">
      <ellipse cx="232" cy="332" rx="184" ry="42" fill="#0a2140" opacity="0.14" />
      <polygon points="232,18 354,168 304,168 404,294 342,294 444,454 22,454 122,294 60,294 162,168 112,168" fill="${primary}" opacity="0.98" />
      <rect x="202" y="454" width="60" height="112" rx="14" fill="${accent}" opacity="0.88" />
      <path d="M232 0l14 30 32 4-24 20 8 32-30-18-30 18 8-32-24-20 32-4z" fill="#fff9de" />
      <circle cx="168" cy="152" r="20" fill="#fff7de" />
      <circle cx="290" cy="198" r="18" fill="${accent}" />
      <circle cx="132" cy="260" r="17" fill="${accent}" />
      <circle cx="320" cy="282" r="19" fill="#fff7de" />
      <circle cx="192" cy="350" r="16" fill="#fff7de" />
      <circle cx="282" cy="364" r="18" fill="${accent}" />
    </g>
  `;
}

function renderBalloons(accent: string, primary: string) {
  return `
    <g transform="translate(288 188)">
      <ellipse cx="164" cy="182" rx="98" ry="130" fill="${primary}" />
      <ellipse cx="352" cy="132" rx="86" ry="118" fill="${accent}" />
      <ellipse cx="520" cy="204" rx="92" ry="124" fill="${primary}" opacity="0.9" />
      <ellipse cx="136" cy="140" rx="24" ry="42" fill="#ffffff" opacity="0.22" />
      <ellipse cx="332" cy="90" rx="22" ry="38" fill="#ffffff" opacity="0.24" />
      <ellipse cx="496" cy="164" rx="24" ry="42" fill="#ffffff" opacity="0.2" />
      <path d="M164 306 C170 352 186 398 212 458" stroke="${primary}" stroke-width="5" fill="none" />
      <path d="M352 248 C348 300 324 360 292 454" stroke="${accent}" stroke-width="5" fill="none" />
      <path d="M520 324 C510 370 474 410 412 472" stroke="${primary}" stroke-width="5" fill="none" />
      <circle cx="232" cy="478" r="7" fill="${accent}" />
      <circle cx="292" cy="458" r="6" fill="${primary}" />
      <circle cx="398" cy="486" r="7" fill="${accent}" />
    </g>
  `;
}

function renderIcon(event: EventCardConcept) {
  switch (event.icon) {
    case "crescent":
      return renderCrescent(event.accent, event.primary);
    case "tree":
      return renderTree(event.accent, event.primary);
    case "balloons":
      return renderBalloons(event.accent, event.primary);
    default:
      return "";
  }
}

function renderTopDecor(event: EventCardConcept) {
  if (event.icon === "crescent") {
    return `
      ${renderLantern(102, 84, 1.02, event.accent)}
      ${renderLantern(246, 36, 0.82, event.accent)}
      ${renderLantern(552, 118, 0.94, event.accent)}
      ${renderLantern(842, 38, 0.86, event.accent)}
      ${renderLantern(968, 84, 1.02, event.accent)}
    `;
  }

  if (event.icon === "tree") {
    return `
      <g opacity="0.9">
        ${renderOrnament(132, 96, event.accent)}
        ${renderOrnament(944, 96, event.accent)}
        ${renderOrnament(214, 154, event.accent)}
        ${renderOrnament(862, 154, event.accent)}
      </g>
    `;
  }

  return `
    <g opacity="0.86">
      <circle cx="132" cy="98" r="28" fill="${event.accent}" />
      <circle cx="186" cy="66" r="18" fill="${event.primary}" />
      <circle cx="946" cy="104" r="28" fill="${event.accent}" />
      <circle cx="894" cy="70" r="18" fill="${event.primary}" />
      <line x1="132" y1="126" x2="148" y2="174" stroke="${event.accent}" stroke-width="3" />
      <line x1="946" y1="132" x2="930" y2="178" stroke="${event.accent}" stroke-width="3" />
    </g>
  `;
}

function renderMessageLines(message: string, startY: number) {
  return wrapLines(message, 42)
    .slice(0, 3)
    .map(
      (line, index) => `<text x="540" y="${startY + index * 36}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="24" font-weight="500" fill="#38587a" letter-spacing="0.15">${escapeXml(line)}</text>`,
    )
    .join("");
}

function renderSocialIcon(kind: "instagram" | "x" | "linkedin", x: number, y: number) {
  if (kind === "instagram") {
    return `
      <g transform="translate(${x} ${y})">
        <circle cx="14" cy="14" r="13" fill="#ffffff" />
        <rect x="6.2" y="6.2" width="15.6" height="15.6" rx="4.8" fill="none" stroke="#0A3D62" stroke-width="2" />
        <circle cx="14" cy="14" r="3.5" fill="none" stroke="#0A3D62" stroke-width="2" />
        <circle cx="18.8" cy="9.2" r="1.4" fill="#0A3D62" />
      </g>
    `;
  }

  if (kind === "linkedin") {
    return `
      <g transform="translate(${x} ${y})">
        <circle cx="14" cy="14" r="13" fill="#ffffff" />
        <circle cx="9" cy="8.8" r="1.8" fill="#0A3D62" />
        <rect x="7.2" y="11.6" width="3.4" height="9" fill="#0A3D62" />
        <path d="M14 20.6v-9h3.5v1.4c1.1-1.2 2.4-1.8 4.2-1.8 2.9 0 4.3 1.8 4.3 5.2v4.2h-3.7V17c0-1.5-.6-2.4-1.8-2.4-1.3 0-2.1 0.9-2.1 2.5v3.5z" fill="#0A3D62" />
      </g>
    `;
  }

  return `
      <g transform="translate(${x} ${y})">
        <circle cx="14" cy="14" r="13" fill="#ffffff" />
        <path d="M7.5 7.8l5 6.1-5.2 6.3h2.6l4-4.7 3.8 4.7h2.8l-5.3-6.5 5-5.9h-2.5l-3.6 4.2-3.4-4.2z" fill="#0A3D62" />
      </g>
    `;
}

function renderContactItem(icon: string, text: string, x: number, width: number) {
  return `
    <g transform="translate(${x} 944)">
      <circle cx="14" cy="14" r="13" fill="#ffffff" />
      ${icon}
      <text x="34" y="20" font-family="Poppins, Arial, sans-serif" font-size="16" font-weight="700" fill="#0A3D62">${escapeXml(text)}</text>
      <rect x="0" y="0" width="${width}" height="28" rx="14" fill="none" stroke="#d3ad4b" stroke-opacity="0.15" />
    </g>
  `;
}

function renderFooter(event: EventCardConcept) {
  return `
    <rect x="0" y="932" width="1080" height="56" fill="${event.accent}" />
    ${renderContactItem('<path d="M10.2 8.2c0.9-0.7 2-0.4 2.5 0.6l1.4 2.4c0.4 0.8 0.3 1.7-0.4 2.2l-1 0.8c0.8 1.5 1.9 2.6 3.4 3.4l0.8-1c0.6-0.7 1.5-0.8 2.2-0.4l2.4 1.4c1 0.6 1.2 1.7 0.6 2.5l-0.8 1.1c-0.7 1-1.9 1.4-3 1.1-2.4-0.7-4.6-2.1-6.5-3.9-1.8-1.8-3.2-4-3.9-6.5-0.3-1.1 0.1-2.3 1.1-3z" fill="#0A3D62" />', BRAND_PHONE, 24, 246)}
    ${renderContactItem('<path d="M8.8 10.2c1.7-1 3.1-1.6 5.2-1.6s3.5 0.6 5.2 1.6l-1.2 1.9c-1.5-0.8-2.5-1.2-4-1.2s-2.5 0.4-4 1.2zm0 3.9c1.7-1 3.1-1.6 5.2-1.6s3.5 0.6 5.2 1.6l-1.2 1.9c-1.5-0.8-2.5-1.2-4-1.2s-2.5 0.4-4 1.2z" fill="#0A3D62" />', BRAND_SITE, 300, 256)}
    ${renderSocialIcon("instagram", 598, 944)}
    ${renderSocialIcon("x", 638, 944)}
    ${renderSocialIcon("linkedin", 678, 944)}
    <rect x="0" y="988" width="1080" height="92" fill="#182645" />
    <text x="56" y="1042" font-family="Montserrat, Arial, sans-serif" font-size="28" font-weight="700" fill="#ffffff">${escapeXml(BRAND_NAME)}</text>
    <text x="312" y="1042" font-family="Poppins, Arial, sans-serif" font-size="19" fill="#dce4ef">${escapeXml(event.signature)}</text>
    <circle cx="650" cy="1033" r="4" fill="#ffffff" opacity="0.85" />
    <text x="674" y="1042" font-family="Poppins, Arial, sans-serif" font-size="20" fill="#ffffff">${escapeXml(BRAND_SITE)}</text>
    ${renderBrandMark(event.primary)}
  `;
}

export function renderEventCardSvg(event: EventCardConcept) {
  const titleLines = wrapLines(event.title.toUpperCase(), 15).slice(0, 2);
  const titleFontSize = titleLines.length > 1 ? 56 : 68;
  const titleLineGap = titleLines.length > 1 ? 62 : 74;
  const titleStartY = titleLines.length > 1 ? 714 : 730;
  const messageStartY = titleStartY + titleLines.length * titleLineGap + 34;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080" role="img" aria-label="${escapeXml(event.title)} Chairman.Official event card">
      <defs>
        <linearGradient id="pageBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fffef8" />
          <stop offset="55%" stop-color="${event.background}" />
          <stop offset="100%" stop-color="#efe7d6" />
        </linearGradient>
        <radialGradient id="softHalo" cx="50%" cy="28%" r="66%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="lanternGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fffdf1" />
          <stop offset="100%" stop-color="${event.accent}" stop-opacity="0.42" />
        </linearGradient>
        <pattern id="arabesque" width="140" height="140" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
          <path d="M24 70C24 44 44 24 70 24s46 20 46 46-20 46-46 46S24 96 24 70zm20 0c0 14 12 26 26 26s26-12 26-26-12-26-26-26-26 12-26 26z" fill="${event.primary}" fill-opacity="0.045" />
          <path d="M70 0v30M70 110v30M0 70h30M110 70h30" stroke="${event.primary}" stroke-opacity="0.035" stroke-width="6" />
        </pattern>
      </defs>

      <rect width="1080" height="1080" rx="38" fill="url(#pageBg)" />
      <rect width="1080" height="1080" rx="38" fill="url(#arabesque)" />
      <rect x="86" y="58" width="908" height="844" rx="34" fill="#ffffff" fill-opacity="0.78" />
      <rect x="86" y="58" width="908" height="844" rx="34" fill="url(#softHalo)" />
      ${renderBackdrop(event.primary)}
      ${renderTopDecor(event)}
      ${renderIcon(event)}

      <text x="540" y="660" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="14" fill="${event.primary}">${escapeXml(event.occasion.toUpperCase())}</text>
      ${renderOrnament(236, 650, event.primary)}
      ${renderOrnament(844, 650, event.primary)}
      ${titleLines
        .map(
          (line, index) => `<text x="540" y="${titleStartY + index * titleLineGap}" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="${titleFontSize}" font-weight="800" letter-spacing="10" fill="${event.primary}">${escapeXml(line)}</text>`,
        )
        .join("")}
      ${renderMessageLines(event.message, messageStartY)}

      ${renderFooter(event)}
    </svg>
  `.trim();
}
