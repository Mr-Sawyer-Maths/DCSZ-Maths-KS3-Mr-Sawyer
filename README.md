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
| Quests and stretch links (from 24 Nov 2026) | Landing page > My extensions; also each page's own record | `mathsSite.ext.v1` → `log` (shared) |

One entry: `{t, d, id, nm, ok, res, secs, note?}`
- `t` when, in ms (`null` for entries copied from before the record started, 23 Nov 2026); `d` the local day, `YYYY-MM-DD`
- `id` the quest, game or level; `nm` its name in words (so the landing page never needs the section's own lists)
- `ok` `true` completed / won / passed, `false` not completed / lost / stopped early, `null` no answer or not applicable
- `res` the result in words, as the student sees it; `secs` time spent, or `null`; `note` the student's own words
- extras a section may add: games `sc`, `n`, `slips`, `fx` (which facts, or the emoji line for the Angle guesser); game ids so far `race`, `angle-round`, `angle-day`; challenges `v` (a score). Each record keeps its last 400.

Practice entries keep their own fields (`sc`, `n`, `rate`, `pass`, `above`, `secs` …); the landing page maps them: `w` → name, `sc/n` → result, `pass` → ok.

## Extension log (quests and stretch links, from 24 Nov 2026)

One block of code, the same in all four pages (`index.html`, `practice/`, `challenges/`, `games/`), between the markers `extension log: shared by every page` and `end of the extension log`. Change it in one page and copy it to the others; the tests check the four copies match. It sets up `window.XL`; each page tells it about its quests with `XL.describe(id)`.

| Key | What it holds |
|---|---|
| `mathsSite.name.v1` | The student's name, asked once on whichever page they open first. Maths Practice's `name` carries over and is kept in step. Students change it in Maths Practice ⚙ (Overview, no PIN) |
| `mathsSite.away.v1` | The quest or stretch link open now: `{src, id, nm, mode, url?, how?, rec?, t, at, untimed?}` |
| `mathsSite.ext.v1` | `{log: [...]}`, the extension record, last 400 |
| `mathsSite.photos.v1` | `[{t, d, data}]`: photos, about 800 px JPEG; kept for 10 days, at most 10, always the newest. `t` matches the entry's `t` |

- **Starting.** A quest starts when the student taps its link (`a[data-away]`), or **Start** on a quest with no link (`[data-xstart]`). Only one at a time: starting another first asks about the open one.
- **The box.** "What did you do?" shows on any page of the site they open next, or when they come back to the tab, and stays until they choose Completed it / Not completed. It asks what kind of work (website, book, both), has a date tick for book work, an optional note and an optional photo, and a score for quests that keep one. "Done it" and "Done today" (`[data-xdone]`) open the same box; if the quest wasn't started first, it is "not timed". Quests with no link have Start only, with no "Done it" until started, so they are always timed.
- **Time** runs from the start until they answer, and stops at 45 minutes ("45 min+"). There is no cut-off: however late, they are asked.
- **Taking turns.** After a screen quest: "Next one on paper. Write today's date first." Starting a screen quest straight after a screen one: "Try a paper one?" with paper quests and Go anyway. `challenges/#paper` opens the list filtered to paper quests.
- **Paper or screen** is the `mode` field on each quest in `challenges/data.js` (`"paper"` or `"screen"`), set in the Teacher tab ("Where the work happens"). Screen only when the answer goes in on the website; anything recorded off the site (Visual patterns, Four-colour maps) is paper. Stretch links are screen. The older `paper: true` still means "ask Mr Sawyer for a copy".

One entry: the shared shape `{t, d, id, nm, ok, res, secs, note?}` plus `src` (`challenges` / `practice`), `mode` (`paper` / `screen`), `kind` (`site` / `book` / `both`), `dated` (the date tick; book work only), `photo` (true if one was added, even after it has been pruned), `start` (ms), `cap` (time reached 45 min), `untimed`, `v` (a score). Completed with `photo: false` shows as "not verified".

Maths Challenges applies its answers to its own progress (done, best score, the day; `me.xt` is the last one applied) and shows them in My record with its older `log`. Maths Practice's Record tab shows its stretch links from here. The landing page reads them in My record and in **My extensions**: the last 14 days, with a count ("4 this fortnight (3 completed), 2 on paper").

Before 24 Nov 2026 these visits used `mathsChallenges.away.v1` / `mathsPractice.away.v1` and went in each page's own log (Practice entries with `ext: true`). Those entries stay where they are; a visit still open in an old key is moved over when that page next opens.

All progress is saved in each person's own browser. Nothing about students is stored in this repo.

**Keep these addresses the same.** Progress is tied to the web address, so moving the site to another GitHub account, organisation or host, or renaming this repo, would start everyone fresh. Changing what's inside the files is fine.

Design notes, plans and the test scripts are kept in Mr Sawyer's private teaching notes (the `student-site/` folder), not in this public repo. Run the page's test script before pushing a change to it.
