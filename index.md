---
layout: default
---

**Ciao!** My name is Federico Sossai and I don't snack during talks :)

[Among other things](./others), I'm a third-year PhD student at
[Northwestern University](https://www.mccormick.northwestern.edu/computer-science/research/areas/systems-networking.html)
and part of the [ARCANA Lab](https://github.com/arcana-lab) led by
[Simone Campanoni](https://users.cs.northwestern.edu/~simonec). 

# &#x1F526; Research
At the moment I'm working on **parallelizing compilers**.

In my vision, a powerful langugage allows users to express high-level **properties**
of their algorithms, while a powerful compiler should exploit them
and minimize the performance cost of the abstractions that permit such expressiveness.

Nobody focusing on an algorithm enojys being distracted by a code that quickly gets
unreadable and inflexible because of tedious implementation details.

When single-core performance is not enough, the problem is exacerbated by manual
parallelelization techniques that, for example, require data structures to be reshaped
or even worse, redesigned.

This is why I'm investigating the following questions:
0. What is hindering compilers from **extracting parallelism** in sequential programs?
0. How to bring **data collections** into the compiler to unlock more parallelizing transformations?

Parallelism in scientific codes has been studied for decades with remarkable results.
However, when programs are not dominated by well-structured array computation
we are in dim candlelight.
I believe that in the advent of an even more heterogeneous future, the importance of a compiler
that understands and manipulates parallelism will be hard to overstate.

# &#x1F4DC; Publications

{% include publications.html %}

# &#x1FAB6; About Me

I've always had a strong passion for programming, since middle school.
I'm fascinated by how much structure can emerge when enough thought is
put into passing ideas through the sieve of algorithmic precision,
and how these structures come back again and again.
At the [University of Padova](https://www.dei.unipd.it/en/), I realized how
the love for learning did not only belong to computer science but extended to
all the disciplines ruled by the rigor of math.
For better or worse, calculus, electromagnetism, probability theory, and NP-completeness
forever changed how I look at the world, and there's no way back.

# `$ cat contacts.json`

```json
{
  "firstname": "Federico",
  "lastname": "Sossai",
  "email": "${firstname}.${lastname}@gmail.com",
  "citizenships": ["Italy"],
  "address": {
    "building": "Mudd Library",
    "room": 3304,
    "street": "2233 Tech Drive",
    "zip": 60208,
    "city": "Evanston",
    "state": "IL",
    "country": "USA"
  }
}
```

[You can find me here](https://maps.app.goo.gl/yXqyoCz8yGVzU9AL8)

