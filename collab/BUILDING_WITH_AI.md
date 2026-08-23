# Building learning experiences with AI

*A short guide for teachers. Draft — portable, not specific to this project.*

---

## Start from the wrong question

The obvious question is *"how do I make this lesson easier to deliver?"*

Ask this one instead:

> **If I had one student, unlimited preparation time, and I only had to teach
> them this one thing — what would I actually build?**

Sit with it properly. Not "I'd explain it again more slowly." What would you
*make*? A board game to give them an intuition for market forces? A puzzle
where the wrong answer is more interesting than the right one? A model they
have to break before you show them the real one?

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

**Open your draft and try to beat it without learning anything.**

- Always click the longest option. What do you score?
- Always click the odd one out. What do you score?
- Refresh and guess repeatedly. Does anything stop you?
- Memorise the sequence, then restart. Does it change?
- Skip the reading entirely and go straight to the questions. Can you still pass?
- Search the page for the question's keywords instead of reading. Does that work?
- Click randomly until something turns green. How long does that take?

**Every one of those that works is a hole.** Not a small one — students find
these faster than you do, and they are not being bad kids when they do. They
are doing what all of us do: taking the cheapest available path. If the
cheapest path through your activity doesn't go through learning, they will
not learn, and it is a design problem rather than a motivation problem.

Then ask the AI to do the same and tell you what it found. **The gap between
your list and its list is the most useful feedback you will get all term** —
and that gap gets smaller every time you do this.

---

## Make guessing cost more than learning

The fix is not to make things unpleasant. It's arithmetic.

Students take the cheapest path. So make the cheap path expensive and the
learning path cheap. That's the whole principle, and it is much kinder than
it sounds, because the student who wants to learn never notices it.

**Worked example — Sleep Lab** (Year 10 Work & Life Education):

Get a question wrong and it doesn't just say "incorrect." It puts the
original slide back on your screen, disables the continue button for eight
seconds while a countdown runs, and puts the question back in the queue so it
returns before the section ends.

Do the sums the way a student does:

- Guess and move on: 8 seconds of forced waiting, *plus* the question again later
- Actually read it: about 15 seconds, once

Guessing is now the expensive option. Nobody is being told off, nothing is
unpleasant, and there's no lecture about trying your best. The maths simply
stopped rewarding the shortcut. The person who built it found himself
genuinely reading the content when he was only trying to click through and
test it.

Two other things that activity does, worth stealing:

- **First attempt is what gets recorded.** Wrong answers keep coming back
  until you've mastered them, but the report remembers the first try. Mastery
  and measurement are separate, and both are honest.
- **The content comes back to you.** It re-shows the slide rather than telling
  you to go and find it. Never make re-learning harder than guessing again.

---

## Scaffolding is fine. Scaffolding that never comes off is not.

Sentence starters, drag-and-drop phrase banks, worked examples, gradual
release — all good, all worth building. The only rule is that **the last step
has to be one you cannot guess your way through.**

A rough test: what's the chance a student gets it right without understanding?

- Four-option multiple choice: 25%. Never the final step.
- Four tiles to arrange, two orders acceptable: about 8%. Borderline.
- Eight tiles, one correct order: effectively zero. Fine as a final step.

So build the ladder. Give them the stem with six phrases to slot in. Then
give them the stem with a bank that includes decoys from other answers. Then
take the stem away. The support is meant to be removed — that's what makes it
scaffolding rather than a crutch.

---

## If you only remember three things

1. **You supply the anomaly, it supplies the structure.** What you know about
   your kids is the irreplaceable part.
2. **Play it as a lazy student before you show anyone.** Every shortcut that
   works is a hole.
3. **Make guessing cost more than learning.** Not punishment — arithmetic.
