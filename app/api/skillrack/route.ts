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

    const scoreMatch = html.match(/icon chart bar"><\/i>(\d+)/);
    const solvedMatch = html.match(/circular blue inverted small icon code"><\/i>(\d+)/);
    const certMatch = html.match(/circular big label">(\d+)<\/span>/);
    const badgeMatch = html.match(/ion-ribbon-a" style="color:brown;"><\/i>(\d+)/);

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
