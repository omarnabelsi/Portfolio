export type Principle = { title: string; proof: string };

export const principles: Principle[] = [
  {
    title: "Money is never a float.",
    proof:
      "ATIZAN routes every amount through decimal.js and a dedicated Money helper. Financial history is append-only, so nothing is quietly overwritten.",
  },
  {
    title: "The model proposes. Policy decides.",
    proof:
      "In ALFA, an AI request becomes a named tool call, then argument validation, then a policy check. No eval, no raw shell strings — dangerous actions wait for a human.",
  },
  {
    title: "Untrusted input stays data.",
    proof:
      "Web pages, emails and files are content to read, never instructions to follow. That single rule closes a whole class of prompt-injection attacks.",
  },
  {
    title: "Migrations are part of the product.",
    proof:
      "Schema changes ship as versioned TypeORM migrations, reviewed and tested like any other code — because production data outlives every deploy.",
  },
  {
    title: "Test across the seams.",
    proof:
      "Unit tests prove a function works. Cross-stack end-to-end tests prove the dashboard, API and database agree with each other.",
  },
  {
    title: "Status should tell the truth.",
    proof:
      "Every project here separates what is built and tested from what still needs verification. An integration tested against a double is described as exactly that.",
  },
];
