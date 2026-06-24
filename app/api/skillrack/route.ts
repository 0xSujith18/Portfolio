import { NextResponse } from "next/server";

const SKILLRACK_URL =
  "https://www.skillrack.com/faces/resume.xhtml?id=515094&key=d6faf944fbe8e7a872b440747ed217727519fb51";

export async function GET() {
  try {
    const res = await fetch(SKILLRACK_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });

    const html = await res.text();

    // Score: green chart bar icon followed by number e.g. 18959
    const scoreMatch = html.match(/icon chart bar[^>]*><\/i>(\d+)/);
    // Programs solved: blue code icon
    const solvedMatch = html.match(/icon code[^>]*><\/i>(\d+)/);
    // Certificates: circular big label
    const certMatch = html.match(/circular big label[^>]*>(\d+)<\/span>/);
    // Badges (bronze ribbons): ion-ribbon-a color:brown
    const badgeMatch = html.match(/color:brown;\"><\/i>(\d+)/);

    return NextResponse.json({
      score: scoreMatch ? parseInt(scoreMatch[1]) : null,
      problemsSolved: solvedMatch ? parseInt(solvedMatch[1]) : null,
      certificates: certMatch ? parseInt(certMatch[1]) : null,
      badges: badgeMatch ? parseInt(badgeMatch[1]) : null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
