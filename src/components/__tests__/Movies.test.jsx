import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";

globalThis.expect = expect;
await import("@testing-library/jest-dom");

import Movies from "../Movies";

const mockMovies = [
  {
    id: 1,
    title: "Fantastic Planet",
    year: 1973,
    genre: "Sci-Fi, Animation",
    rating: 7.7,
    poster: "https://example.com/poster1.jpg",
    description: "A surreal animated classic.",
    "API-URL": "https://archive.org/download/fantastic-planet__1973/movie.mp4",
  },
  {
    id: 2,
    title: "Night of the Living Dead",
    year: 1968,
    genre: "Horror",
    rating: 7.8,
    poster: "https://example.com/poster2.jpg",
    description: "Zombies attack a farmhouse.",
    "API-URL": "https://archive.org/download/NightOfTheLivingDead-MPEG/movie.mp4",
  },
];

const defaultProps = {
  addToMyList: vi.fn(),
  searchTerm: "",
  setSearchTerm: vi.fn(),
  user: null,
  myList: [],
};

vi.mock("../../Hooks/useFetchData", () => ({
  default: vi.fn(() => ({
    data: { movies: mockMovies },
    loading: false,
    error: null,
  })),
}));

function renderMovies(props = {}) {
  return render(<Movies {...defaultProps} {...props} />);
}

describe("Movies", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("it renders the title and movie cards", () => {
    renderMovies();

    expect(screen.getByRole("heading", { name: /^movies$/i })).toBeInTheDocument();
    expect(screen.getByAltText("Fantastic Planet")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fantastic Planet" })).toBeInTheDocument();
    expect(screen.getByAltText("Night of the Living Dead")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Night of the Living Dead" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /\+ my list/i })).toHaveLength(2);
  });

  test("it toggles to player view when clicking a movie poster and back button returns to gallery", () => {
    renderMovies();

    expect(screen.getByRole("heading", { name: /^movies$/i })).toBeInTheDocument();

    fireEvent.click(screen.getByAltText("Fantastic Planet"));

    expect(screen.getByRole("button", { name: /← back/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /fantastic planet \(1973\)/i })).toBeInTheDocument();
    expect(screen.getByTitle("Fantastic Planet")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /← back/i }));

    expect(screen.getByRole("heading", { name: /^movies$/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /← back/i })).not.toBeInTheDocument();
  });
});
