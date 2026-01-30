import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";

globalThis.expect = expect;
await import("@testing-library/jest-dom");

import useFetchData from "../../Hooks/useFetchData";
import TVShows from "../TVShows";

vi.mock("../../Hooks/useFetchData", () => ({
  default: vi.fn(),
}));

const mockShows = [
  {
    id: 11,
    title: "Sherlock (BBC)",
    genre: "Crime, Mystery",
    rating: 9.1,
    poster: "https://example.com/sherlock.jpg",
    episodes: [
      { name: "A Study in Pink", url: "https://archive.org/download/sherlock/ep1.mp4" },
    ],
  },
  {
    id: 12,
    title: "Breaking Bad",
    genre: "Drama, Crime",
    rating: 9.5,
    poster: "https://example.com/breaking-bad.jpg",
    episodes: [
      { name: "Pilot", url: "https://archive.org/download/breaking-bad/ep1.mp4" },
    ],
  },
];

const defaultProps = {
  addToMyList: vi.fn(),
  searchTerm: "",
  myList: [],
};

function renderTVShows(props = {}) {
  return render(
    <MemoryRouter>
      <TVShows {...defaultProps} {...props} />
    </MemoryRouter>
  );
}

describe("TVShows", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    useFetchData.mockReturnValue({
      data: { shows: mockShows },
      loading: false,
      error: null,
    });
  });

  test("it renders the title and show cards", () => {
    renderTVShows();

    expect(screen.getByRole("heading", { name: /^tv shows$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /← back/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sherlock (BBC)" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Breaking Bad" })).toBeInTheDocument();
    expect(screen.getByText("Crime, Mystery")).toBeInTheDocument();
    expect(screen.getByText("Drama, Crime")).toBeInTheDocument();
  });

  test("it shows loading state when loading", () => {
    useFetchData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderTVShows();

    expect(screen.getByRole("heading", { name: /loading tv shows/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^tv shows$/i })).not.toBeInTheDocument();
  });
});
