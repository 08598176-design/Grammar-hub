# Building learning experiences with AI

*A short guide for teachers. Draft — portable, not specific to this project.*

---

## Start from the wrong question

The obvious question is *"how do I make this lesson easier to deliver?"*

Ask this one instead:

> **If I had one student, unlimited preparation time, and I only had to teach
> them this one thing — what would I actually build?**

Sit with it properly. Not "I'd explain it again more slowly." What would you
*make*? A board game to give them an intuition for market forces? A model of
a system they have to break before you show them the real one? A puzzle where
the wrong answer is more interesting than the right one?

Then a second question, which is where the good stuff lives:

> **And what would I do in week three, once they've got it?**

That's your target. Not the compromise you make for thirty kids and forty
minutes. The compromises are real, but they are compromises, and once you can
see them clearly you can start dissolving them one at a time. That is the
whole point of building with AI: not to reproduce what you can already do
slightly faster, but to reach the thing you'd do if preparation time were
free.

---

## What you bring, and what the machine brings

This matters more than anything else in this document, because most people
get it backwards and then feel useless.

**You bring the anomaly.** You know that kids look like they understand
factorising right up until a fortnight later, when a specific kind of
question makes it fall apart. You know which sentence in the model answer
they all copy without understanding. You know the thing that always goes
wrong in week four. None of that is in any textbook, any curriculum
document, or any AI's training data. It is genuinely yours and it is the
most valuable thing in the room.

**The machine brings structure.** Generalising, drafting, generating twenty
variations, building the interactive, writing the second explanation for the
kids who didn't get the first one. That work is real, and it is exactly the
work that used to make good ideas too expensive to pursue.

So the division is: **you supply the anomaly and the veto. It supplies the
structure.** If you find yourself trying to invent architecture, stop — that's
its job. If you find it inventing what kids do in your classroom, stop it —
that's yours.

The single most useful sentence you can say to it:

> *"Here's where students look like they've got it and then fall over."*

---

## Six moves

**1. Describe the experience, not the feature.**
Not "add a drag-and-drop." Say "I want them to have to commit to an answer
before they see any options." Describe what the student goes through. Let it
work out the mechanism.

**2. Assume the first version is the generic one.**
It usually is. Not because the model is lazy but because it has read a
million mediocre worksheets and that's the middle of the road. A good
follow-up: *"that's the obvious version. What would this look like if it
weren't the obvious answer?"*

**3. Reject on principle, and name the principle.**
"I don't like it" gives it nothing. "That's recognition, not production —
they can see the answer while they're answering" gives it everything, and it
will apply that principle to the next ten things without being asked again.

**4. Say when something feels wrong even if you can't say why.**
*"This feels off and I can't articulate it yet"* is legitimate and useful. It
is information. A good model will start probing for the reason rather than
defending its draft. Do not sit on a bad feeling because you can't justify it
yet.

**5. Split what you're asking for.**
Ask it for what it knows better than you: implementation, variations,
precedent, the second explanation. Don't outsource what you know better than
it: your kids, your room, what actually happens Tuesday period five.

**6. Never accept "done."** See below.

---

## The lazy student test

Do this yourself, before you show anyone. It takes four minutes and it is the
difference between something that looks like learning and something that is
learning.

**Open your draft and try to get through it as fast as possible without
learning anything.** Genuinely try to beat it. Then ask:

- Did anything stop me?
- Did I get a decent result anyway?
- **Did I find myself having to slow down, go back and actually think before I
  could finish?**

That last one is the signal you want. If *you* had to stop rushing and engage
with the content in order to get through, students will have to as well. If
you sailed through without absorbing anything, so will they — and they are
faster at finding shortcuts than you are.

They are not being bad kids when they do this. They are doing what all of us
do: taking the cheapest available path. **If the cheapest path through your
activity doesn't go through learning, they will not learn** — and that's a
design problem, not a motivation problem.

Then ask the AI to do the same and tell you what it found. **The gap between
your list and its list is the most useful feedback you will get all term** —
and that gap gets smaller every time you do this.

---

## Make guessing cost more than learning

The fix is not to make things unpleasant. It's arithmetic.

Students take the cheapest path. So make the cheap path expensive and the
learning path cheap. That's the whole principle, and it is much kinder than it
sounds, because the student who wants to learn never notices it.

Some ways that gets built, none of them punishment:

- A wrong answer brings the relevant content back on screen and holds you
  there briefly before you can continue, and the question returns later.
  Guessing now costs more time than reading did.
- The first attempt is what gets recorded, but wrong items keep coming back
  until they're right. Mastery and measurement stay separate, and both stay
  honest.
- Re-learning is never made harder than guessing again. Bring the material to
  the student rather than telling them to go and find it.

---

## The real test: can they succeed without understanding?

This is the general form, and it matters more than any particular format.

**A thoughtless attempt should reliably produce a poor result. A reasoned
attempt should reliably produce a good one. And the student should be able to
see why.**

Note what this does *not* say. It does not say there must be one right answer,
or that near-misses should be punished, or that the odds should be
impossible. Plenty of the best tasks have many good answers. The question is
only whether understanding was *required*.

The same principle takes very different shapes:

- **A planning task** — choosing where to put something on a map, given
  competing constraints. There are many good answers and a great many poor
  ones. You cannot click at random and do well, but you also aren't hunting
  for one perfect pixel. What's being learned is how the factors trade off
  against each other, and the result shows you whether you read them right.

- **A construction task** — assembling a response from parts. Early on it's
  generous: colour-matching and elimination will get a student a long way, and
  that's fine, because it's scaffolding. By the top levels the cues have been
  removed and it can't be done without actually reasoning. What they build
  becomes the model they refer back to when they next write unaided.

- **A simulation** — a toy model they can play with and watch respond. The
  learning is intuitive rather than propositional; they're building a feel for
  how the system behaves that would be very hard to get from watching a video.
  Someone who understands the principles gets a good outcome fairly quickly
  and can then fine-tune. Someone who doesn't, flails visibly.

- **A judgement task** — approving or rejecting each of many options, where
  every choice is defensible or not on its merits. No single correct
  configuration, but a thoughtless run produces an obviously bad outcome.

Multiple choice and drag-and-drop are two formats among many, and usually the
least interesting ones available. If the only shapes you're being offered are
quiz questions and tiles, ask for something else — the model will reach for
those by default because they're the most common things in its training data,
not because they're the best fit for what you're teaching.

**Scaffolding is fine. Scaffolding that never comes off is not.** Build the
ladder: give them the frame with the pieces supplied, then with decoys mixed
in, then take the frame away. The support is meant to be removed. The only
firm rule is that **the last step cannot be one you can bluff your way
through.**

---

## Aim above the target

You are not going to prevent forgetting. What you get to choose is what
survives it.

Say you want them to know *precipitation*. Aim at "know the word
precipitation" and you'll cover ten words in the lesson, and they'll keep
three of them.

So aim higher than the thing you actually want. Have them break it apart into
its pieces and say what each one does. Have them build the word back up from
those pieces. Have them produce it from the meaning alone with nothing on
screen to copy. Have them spot it doing real work in a sentence. If they're
EAL, have them give it in their first language too.

That's five different routes into one word. In six weeks most of that is
gone — the morpheme analysis, the translation, the sentence. What's left is
the word. Which is what you wanted in the first place.

The counterintuitive part, and the reason this is worth saying out loud:
**it argues for covering less, not more.** Ten words with five routes each
beats fifty words seen once, and it isn't close. The pressure you'll feel is
always to widen the coverage. The thing that actually works is to narrow it
and deepen the routes — and to be able to say why when someone asks.

---

## If you only remember four things

1. **You supply the anomaly, it supplies the structure.** What you know about
   your kids is the irreplaceable part.
2. **Rush your own draft before you show anyone.** If you had to slow down and
   think, good. If you didn't, students won't either.
3. **Make guessing cost more than learning.** Not punishment — arithmetic.
4. **Aim above the target.** Build for a stronger version of the skill, so the
   skill itself is what's left when most of it fades.
