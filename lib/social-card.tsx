/* eslint-disable @next/next/no-img-element */
import { existsSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { ImageResponse } from "next/og";
import type { Post, SocialCardTemplate } from "@/content/posts";

export type SocialCardPlatform = "instagram" | "x" | "linkedin";

export const SOCIAL_CARD_RENDER_VERSION = "2026-03-27-portrait-fill-v7";

const platformConfig: Record<SocialCardPlatform, { width: number; height: number; label: string }> = {
  instagram: {
    width: 1080,
    height: 1350,
    label: "Instagram Story Card",
  },
  x: {
    width: 1200,
    height: 675,
    label: "X Commentary Card",
  },
  linkedin: {
    width: 1080,
    height: 1080,
    label: "LinkedIn Leadership Card",
  },
};

const assetMimeTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export function getSocialCardConfig(platform: SocialCardPlatform) {
  return platformConfig[platform];
}

function getPlatformQuote(post: Post, platform: SocialCardPlatform) {
  return post.platformCopy?.[platform] ?? post.socialHook;
}

function getTemplate(post: Post): SocialCardTemplate {
  if (post.socialCardTemplate) {
    return post.socialCardTemplate;
  }

  return post.category === "desk" ? "statement" : "campaign";
}

function getInlineAssetDataUri(src?: string) {
  if (!src || !src.startsWith("/")) {
    return undefined;
  }

  const cleanSrc = src.split("?")[0]?.split("#")[0] ?? src;
  const extension = extname(cleanSrc).toLowerCase();
  const mimeType = assetMimeTypes[extension];
  if (!mimeType) {
    return undefined;
  }

  const assetPath = join(process.cwd(), "public", cleanSrc.replace(/^\//, ""));
  if (!existsSync(assetPath)) {
    return undefined;
  }

  const asset = readFileSync(assetPath);
  return `data:${mimeType};base64,${asset.toString("base64")}`;
}

function getPortraitAsset(post: Post) {
  return getInlineAssetDataUri(post.portraitImage) ?? getInlineAssetDataUri(post.coverImage);
}

function renderPortraitZone({
  portraitAsset,
  portraitAlt,
  width,
  height,
  compact = false,
}: {
  portraitAsset?: string;
  portraitAlt: string;
  width: number | string;
  height: number | string;
  compact?: boolean;
}) {
  if (portraitAsset) {
    return (
      <div
        style={{
          display: "flex",
          width,
          height,
          borderRadius: 34,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 28px 60px rgba(3, 22, 36, 0.26)",
          backgroundColor: "#0b2f4a",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={portraitAsset}
          alt={portraitAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: compact ? "center 18%" : "center 24%",
            transform: compact ? "scale(1.02)" : "scale(1.02)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width,
        height,
        borderRadius: 34,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.14)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0 28px 60px rgba(3, 22, 36, 0.22)",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(183,155,53,0.22) 0%, rgba(10,61,98,0.12) 100%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: compact ? 12 : 16,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            width: compact ? 118 : 152,
            height: compact ? 118 : 152,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.16)",
            border: "1px solid rgba(255,255,255,0.18)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: compact ? 46 : 58,
            fontWeight: 700,
            letterSpacing: "0.18em",
          }}
        >
          EO
        </div>
        <div
          style={{
            display: "flex",
            fontSize: compact ? 18 : 20,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.82)",
            textAlign: "center",
            maxWidth: compact ? 180 : 230,
          }}
        >
          Portrait zone ready for upload
        </div>
      </div>
    </div>
  );
}

function renderHeader(label: string) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 30px 18px 30px",
        fontSize: 24,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", letterSpacing: "0.02em", color: "rgba(255,255,255,0.9)" }}>Chairman.Official</div>
      <div style={{ display: "flex", color: "rgba(255,255,255,0.82)" }}>{label}</div>
    </div>
  );
}

function renderFooter() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 30px 24px 30px",
        marginTop: "auto",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        fontSize: 22,
        color: "rgba(255,255,255,0.82)",
      }}
    >
      <div style={{ display: "flex", fontWeight: 600 }}>Thought Leadership. Innovation. Impact.</div>
      <div style={{ display: "flex" }}>chairman.official</div>
    </div>
  );
}

function renderCampaignTemplate(post: Post, config: { width: number; height: number; label: string }, quote: string) {
  const isWide = config.width > config.height;
  const titleSize = config.width > config.height ? 64 : 78;
  const quoteSize = config.width > config.height ? 30 : 36;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0A3D62",
        color: "white",
        fontFamily: "sans-serif",
        padding: 34,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "2px solid rgba(255,255,255,0.12)",
          background: "linear-gradient(145deg, #0a3d62 0%, #0e4f7e 58%, #12314d 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -80,
            width: 360,
            height: 360,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -160,
            bottom: -160,
            width: 440,
            height: 440,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.06)",
            display: "flex",
          }}
        />

        {renderHeader(config.label)}

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: isWide ? "row" : "column",
            padding: "12px 30px 0 30px",
            gap: 28,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: isWide ? 240 : 250,
              minWidth: isWide ? 240 : 250,
              height: isWide ? "100%" : 250,
              alignItems: isWide ? "flex-end" : "center",
              justifyContent: "center",
            }}
          >
            {renderPortraitZone({
              portraitAsset: undefined,
              portraitAlt: `${post.title} social card mark`,
              width: isWide ? 210 : 220,
              height: isWide ? 260 : 220,
              compact: true,
            })}
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: 26,
              gap: 22,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div
                style={{
                  display: "flex",
                  width: "auto",
                  padding: "10px 16px",
                  borderRadius: 999,
                  backgroundColor: "rgba(255,255,255,0.12)",
                  fontSize: 20,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.86)",
                }}
              >
                {post.kicker}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: titleSize,
                  lineHeight: 1.04,
                  fontWeight: 700,
                  maxWidth: isWide ? "92%" : "100%",
                }}
              >
                {post.title}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: isWide ? "88%" : "100%",
                backgroundColor: "#B79B35",
                color: "white",
                padding: "24px 24px 26px 24px",
                borderRadius: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                Highlighted Message
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: quoteSize,
                  lineHeight: 1.25,
                  fontWeight: 600,
                }}
              >
                {quote}
              </div>
            </div>
          </div>
        </div>

        {renderFooter()}
      </div>
    </div>
  );
}

function renderPortraitTemplate(post: Post, config: { width: number; height: number; label: string }, quote: string) {
  const portraitAsset = getPortraitAsset(post);
  const isWide = config.width > config.height;
  const isSquare = config.width == config.height;
  const portraitHeight = isWide ? 320 : isSquare ? 620 : 980;
  const quoteSize = isWide ? 28 : isSquare ? 32 : 44;
  const cardInset = isWide ? 34 : isSquare ? 38 : 40;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0A3D62",
        color: "white",
        fontFamily: "sans-serif",
        padding: 34,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "2px solid rgba(255,255,255,0.08)",
          background: "radial-gradient(circle at top left, rgba(183,155,53,0.20), rgba(183,155,53,0) 24%), linear-gradient(180deg, #123f65 0%, #0a2d47 48%, #061a2b 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -110,
            top: -120,
            width: 340,
            height: 340,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.06)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -120,
            bottom: -150,
            width: 360,
            height: 360,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.04)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 28,
            borderRadius: 34,
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
          }}
        />

        {renderHeader(config.label)}

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: 0,
            padding: "26px 30px 0 30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {renderPortraitZone({
              portraitAsset,
              portraitAlt: post.portraitAlt ?? `${post.title} portrait`,
              width: "100%",
              height: portraitHeight,
            })}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginTop: isWide ? -72 : isSquare ? -126 : -188,
                marginLeft: cardInset,
                marginRight: cardInset,
                padding: isWide ? "18px 18px 20px 18px" : "18px 18px 20px 18px",
                borderRadius: 32,
                background: "linear-gradient(180deg, rgba(9,40,63,0.94) 0%, rgba(8,31,49,0.98) 100%)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 26px 60px rgba(2, 14, 24, 0.36)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "10px 16px",
                    borderRadius: 999,
                    backgroundColor: "#B79B35",
                    fontSize: 14,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "#fff8df",
                  }}
                >
                  {post.kicker}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.56)",
                  }}
                >
                  Insight Dispatch
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: quoteSize,
                  lineHeight: 1.18,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                }}
              >
                {quote}
              </div>
              <div
                style={{
                  display: "flex",
                  width: 92,
                  height: 4,
                  borderRadius: 999,
                  backgroundColor: "#B79B35",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 14,
                  paddingTop: 6,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.56)",
                  }}
                >
                  Chairman.Official
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 18,
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  @chairman.official
                </div>
              </div>
            </div>
          </div>
        </div>

        {renderFooter()}
      </div>
    </div>
  );
}
function renderStatementTemplate(post: Post, config: { width: number; height: number; label: string }, quote: string) {
  const isWide = config.width > config.height;
  const titleSize = isWide ? 54 : 74;
  const quoteSize = isWide ? 30 : 38;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0A3D62",
        color: "white",
        fontFamily: "sans-serif",
        padding: 34,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "2px solid rgba(255,255,255,0.12)",
          background: "radial-gradient(circle at top right, rgba(183,155,53,0.22), rgba(183,155,53,0) 28%), linear-gradient(160deg, #0b3d61 0%, #0d2f49 42%, #061b2e 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 28,
            top: 140,
            width: 160,
            height: 2,
            backgroundColor: "rgba(183,155,53,0.9)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -110,
            bottom: -120,
            width: 320,
            height: 320,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />

        {renderHeader(config.label)}

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "24px 40px 0 40px",
            gap: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                display: "flex",
                width: "auto",
                padding: "10px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.1)",
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.82)",
              }}
            >
              {post.kicker}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: titleSize,
                lineHeight: 1.03,
                fontWeight: 700,
                maxWidth: isWide ? "82%" : "100%",
              }}
            >
              {post.title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              borderLeft: "4px solid #B79B35",
              paddingLeft: 24,
              maxWidth: isWide ? "72%" : "90%",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.68)",
              }}
            >
              Featured Statement
            </div>
            <div
              style={{
                display: "flex",
                fontSize: quoteSize,
                lineHeight: 1.3,
                fontWeight: 600,
              }}
            >
              {quote}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxWidth: isWide ? "55%" : "70%",
                color: "rgba(255,255,255,0.72)",
                fontSize: isWide ? 18 : 22,
                lineHeight: 1.45,
              }}
            >
              <div style={{ display: "flex" }}>{post.summary}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
                minWidth: 180,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.64)",
                }}
              >
                Chairman.Official
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "rgba(255,255,255,0.84)",
                }}
              >
                Insight Series
              </div>
            </div>
          </div>
        </div>

        {renderFooter()}
      </div>
    </div>
  );
}

export async function createSocialCardImage(post: Post, platform: SocialCardPlatform) {
  const config = getSocialCardConfig(platform);
  const quote = getPlatformQuote(post, platform);
  const template = getTemplate(post);

  const markup =
    template === "portrait"
      ? renderPortraitTemplate(post, config, quote)
      : template === "statement"
        ? renderStatementTemplate(post, config, quote)
        : renderCampaignTemplate(post, config, quote);

  return new ImageResponse(markup, {
    width: config.width,
    height: config.height,
  });
}





