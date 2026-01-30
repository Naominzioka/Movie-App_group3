import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";

globalThis.expect = expect;
await import("@testing-library/jest-dom");

import ShowCard from "../ShowCard";

const mockShow = {
  id: 1,
  title: "Breaking Bad",
  genre: "Drama, Crime",
  rating: 9.5,
  poster: "https://example.com/poster.jpg",
  episodes: [
    { name: "Pilot", url: "https://archive.org/download/breaking-bad-pilot/ep1.mp4" },
    { name: "Cats in the Bag", url: "https://archive.org/download/breaking-bad-s01e02/ep2.mp4" },
  ],
};

const defaultProps = {
  show: mockShow,
  addToMyList: vi.fn(),
  myList: [],
};

function renderShowCard(props = {}) {
  return render(<ShowCard {...defaultProps} {...props} />);
}

describe("ShowCard", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("it renders the show title, genre, rating, and action buttons", () => {
    renderShowCard();

    expect(screen.getByRole("heading", { name: "Breaking Bad" })).toBeInTheDocument();
    expect(screen.getByText("Drama, Crime")).toBeInTheDocument();
    expect(screen.getByText(/9\.5 ⭐/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\+ my list/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show episodes/i })).toBeInTheDocument();
    expect(screen.getByAltText("Breaking Bad")).toBeInTheDocument();
  });

  test("it toggles the episodes list when clicking Show Episodes / Hide Episodes", () => {
    renderShowCard();

    expect(screen.queryByText(/Pilot/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show episodes/i }));

    expect(screen.getByText(/Pilot/)).toBeInTheDocument();
    expect(screen.getByText(/Cats in the Bag/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /hide episodes/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /hide episodes/i }));

    expect(screen.queryByText(/Pilot/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show episodes/i })).toBeInTheDocument();
  });
});
