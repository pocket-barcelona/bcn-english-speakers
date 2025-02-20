import { expect, test } from "vitest";
import {
  filterAndSortPosts,
  getChronologicalNextPrevPosts,
} from "./post.service";
import {
  TESTPOST1,
  TESTPOST2,
  TESTPOST3,
  TESTPOST4,
  TESTPOST5,
  TESTPOST6,
  TESTPOST7,
} from "./fixtures/blog";

const filteredAndSortedPosts = filterAndSortPosts([
  TESTPOST1,
  TESTPOST2,
  TESTPOST3,
  TESTPOST4,
  TESTPOST5,
  TESTPOST6,
  TESTPOST7,
]);

test("should filter and sort posts", () => {
  const filteredAndSorted = filteredAndSortedPosts.map((p) => p.id);
  const expected = [
    TESTPOST3.id, // newest first
    TESTPOST2.id,
    TESTPOST1.id,
    TESTPOST4.id,
  ];

  expect(filteredAndSorted).toEqual(expected);
});

test("should filter and sort posts, but include hidden posts for getStaticPaths()", () => {
  const filtersAndSorted = filterAndSortPosts(
    [
      TESTPOST1,
      TESTPOST2,
      TESTPOST3,
      TESTPOST4,
      TESTPOST5,
      TESTPOST6,
      TESTPOST7,
    ],
    true
  ).map((p) => p.id);

  const expected = [
    TESTPOST3.id, // newest first
    TESTPOST2.id,
    TESTPOST1.id,
    TESTPOST4.id,
    TESTPOST7.id,
  ];

  expect(filtersAndSorted).toEqual(expected);
});

test("should get next/prev posts", () => {
  const { prevPost, nextPost } = getChronologicalNextPrevPosts(
    TESTPOST1,
    filteredAndSortedPosts
  );
  expect(prevPost).toEqual(TESTPOST4);
  expect(nextPost).toEqual(TESTPOST2);
});

test("should get next/prev posts with no next", () => {
  const { prevPost, nextPost } = getChronologicalNextPrevPosts(
    TESTPOST3,
    filteredAndSortedPosts
  );
  expect(prevPost).toEqual(TESTPOST2);
  expect(nextPost).toEqual(undefined);
});

test("should get next/prev posts with no prev", () => {
  const { prevPost, nextPost } = getChronologicalNextPrevPosts(
    TESTPOST4,
    filteredAndSortedPosts
  );
  expect(prevPost).toEqual(undefined);
  expect(nextPost).toEqual(TESTPOST1);
});
