# 5. Supported Browsers

Date: 2020-11-06

## Status

Accepted

## Context

Writing applications to support every possible web browser is, at best, tedious
and error prone. New technologies are interesting to work with, but may not be
available on older browsers. We don't want to insist our users always have the
latest version of technology to access our resources, but we also can't support
browsers so old they hamper development and are not even supported by the
browser developers.

## Decision

We should support the browsers that our users regularly use on our site.

Rather than defining a specific list of browsers which will likely be out of
date before the next time someone needs it, we will instead make it our goal to
ensure our applications are optimized for the browsers in 99% of our sessions,
do a best effort for the next 0.5% (it should work, but may not be
a great user experience), and allow the last 0.5% to work or not as may be with
no effort to resolve conflicts in these edge cases.

## Consequences

We will have a moving target that trends in the direction of future browsers
over time. Our existing applications that work with the older browsers can
continue to keep that support with minimal effort (and should). Our newer
applications can look at the current data at the start of the project and use
that to determine what browsers we will officially support.

For this project, the current data leads us to:

- Chrome version 84+
- Safari 12, 13, 14
- Firefox 68 esr, 78 esr, 81+
- Edge 85+
- Opera 71+ (maybe, need to math this)
- Samsung Internet 12+
- IE 11 (barely)

This means a small number of users, not all of which are actual MIT users and at
least some of which are probably bots, might not be able to access some features
of our application.

Continuing support for IE11 even though it is barely at the 0.5% mark does
introduce a significant additional engineering challenge as it is the lone
browser that doesn't support the vast majority of modern browser features.
