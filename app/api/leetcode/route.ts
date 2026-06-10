import { NextResponse } from "next/server";

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query: QUERY, variables: { username: "0xSujith18" } }),
      cache: "no-store",
    });

    const { data } = await res.json();
    const stats = data.matchedUser.submitStatsGlobal.acSubmissionNum;
    const get = (d: string) => stats.find((s: { difficulty: string; count: number }) => s.difficulty === d)?.count ?? 0;

    return NextResponse.json({
      totalSolved: get("All"),
      easy: get("Easy"),
      medium: get("Medium"),
      hard: get("Hard"),
      ranking: data.matchedUser.profile.ranking,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
