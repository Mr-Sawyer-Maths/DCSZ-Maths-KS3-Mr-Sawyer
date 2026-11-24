# DCSZ-Maths-KS3-Mr-Sawyer

Resources and challenges for KS3 maths, served by GitHub Pages at
https://mr-sawyer-maths.github.io/DCSZ-Maths-KS3-Mr-Sawyer/ (repo: Mr-Sawyer-Maths/DCSZ-Maths-KS3-Mr-Sawyer)

| Folder | What it is | Who it's for |
|---|---|---|
| `/` | Landing page with links, and **My record**: practice, challenges and games done on this device, together, by day | Students, and the teacher looking at a student's screen |
| `practice/` | Maths Practice: levelled practice in number facts, number skills, fractions/decimals/percentages and word problems. The ⚙ screen (teacher PIN) also prints one-page practice sheets and makes backups | Students, and the teacher |
| `practice/packs.js` | Extra word problems (optional; the app works without it) | Students |
| `challenges/` | Maths Challenges: extension quests by topic, a competition ladder and reports; each student's progress is logged on their own device | Students who want more |
| `challenges/data.js` | The content Mr Sawyer controls in Maths Challenges: classes and open topics, quests, ladder rungs, resources. No student information. Written by its Teacher tab (Setup and publish > Copy data.js), then pasted here | Students |
| `fact-sessions/` | Fact practice sessions for 1–3 students who need fact families: session screen, printable sheets, fact maps, parent reports. Its fact ladder is older than the app's; sheets matching the app's levels come from the app's Sheets tab. Not linked from the landing page: open `…/fact-sessions/` directly | Teacher |

## Records

Every section keeps a record of what the student did, and the landing page reads all three together (it only reads; it never changes them). New sections and games should keep one in the same shape.

| Section | Where | Kept in |
|---|---|---|
| Maths Practice | ⚙ > Record tab | `mathsPractice.v1` → `log` (its own richer entries, plus `t` and `w`) |
| Maths Challenges | My progress > My record | `mathsChallenges.mine.v1` → `log` |
| Maths Games | 📋 My games record (top of the games list) | `mathsGames.v1` → `log` |

One entry: `{t, d, id, nm, ok, res, secs, note?}`
- `t` when, in ms (`null` for entries copied from before the record started, 23 Nov 2026); `d` the local day, `YYYY-MM-DD`
- `id` the quest, game or level; `nm` its name in words (so the landing page never needs the section's own lists)
- `ok` `true` completed / won / passed, `false` not completed / lost / stopped early, `null` no answer or not applicable
- `res` the result in words, as the student sees it; `secs` time spent, or `null`; `note` the student's own words
- extras a section may add: games `sc`, `n`, `slips`, `fx` (which facts, or the emoji line for the Angle guesser); game ids so far `race`, `angle-round`, `angle-day`; challenges `v` (a score). Each record keeps its last 400.

Practice entries keep their own fields (`sc`, `n`, `rate`, `pass`, `above`, `secs` …); the landing page maps them: `w` → name, `sc/n` → result, `pass` → ok.

**Leaving for another site (Maths Challenges, and Maths Practice's stretch links).** Every link to an outside activity is marked `data-away` (quest links in Maths Challenges; the stretch links in Maths Practice, such as Beast Academy and Transum). When the student comes back to the page, a box asks what they did (Completed it / Not completed, an optional note, and a score for quests that keep one) and stays until they choose. The time away is recorded. If they come back more than 3 hours later, the visit is recorded as "Opened, no answer". The visit in progress is kept in `mathsChallenges.away.v1` / `mathsPractice.away.v1`. In Maths Practice these visits go in its log with `ext: true` (`nm`, `ok`, `res`, `secs`, `note`). Any new link to an outside activity should get the same box. Information-only links (the Real competitions list, credits, teacher resources) don't.

All progress is saved in each person's own browser. Nothing about students is stored in this repo.

**Keep these addresses the same.** Progress is tied to the web address, so moving the site to another GitHub account, organisation or host, or renaming this repo, would start everyone fresh. Changing what's inside the files is fine.

Design notes and plans are kept in the Claude project "Student Retrieval Tracker": `maths-practice-principles.md`, `maths-practice-number-map.md`, `maths-practice-handoff-brief.md`, `maths-practice-tests.py` (run it before pushing a change to `practice/`) and `side-quests-notes.md` (Maths Challenges).
