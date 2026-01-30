import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";

globalThis.expect = expect;
await import("@testing-library/jest-dom");

import MyList from "../MyList";

const mockMyList = [
  {
    id: 1,
    title: "Fantastic Planet",
    type: "movie",
    poster: "https://example.com/poster1.jpg",
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "show",
    poster: "https://example.com/poster2.jpg",
  },
];

const defaultProps = {
  myList: [],
  removeFromMyList: vi.fn(),
};

function renderMyList(props = {}) {
  return render(
    <MemoryRouter>
      <MyList {...defaultProps} {...props} />
    </MemoryRouter>
  );
}

describe("MyList", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("it renders the title and empty state when list is empty", () => {
    renderMyList();

    expect(screen.getByRole("heading", { name: /^my list$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /← back/i })).toBeInTheDocument();
    expect(screen.getByText("No movies or shows added yet.")).toBeInTheDocument();
  });

  test("it renders list items and calls removeFromMyList when clicking Remove", () => {
    const removeFromMyList = vi.fn();
    renderMyList({ myList: mockMyList, removeFromMyList });

    expect(screen.getByRole("heading", { name: /^my list$/i })).toBeInTheDocument();
    expect(screen.getByAltText("Fantastic Planet")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fantastic Planet" })).toBeInTheDocument();
    expect(screen.getByText("Movie")).toBeInTheDocument();
    expect(screen.getByAltText("Breaking Bad")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Breaking Bad" })).toBeInTheDocument();
    expect(screen.getByText("TV Show")).toBeInTheDocument();

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    expect(removeButtons).toHaveLength(2);

    fireEvent.click(removeButtons[0]);

    expect(removeFromMyList).toHaveBeenCalledTimes(1);
    expect(removeFromMyList).toHaveBeenCalledWith(1);
  });
});
