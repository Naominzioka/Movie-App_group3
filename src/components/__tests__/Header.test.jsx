import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";

globalThis.expect = expect;
await import("@testing-library/jest-dom");

import Header from "../Header";

const defaultProps = {
  onGoToMovies: vi.fn(),
  onGoToMyList: vi.fn(),
  onGoToShows: vi.fn(),
  onLogout: vi.fn(),
  searchTerm: "",
  setSearchTerm: vi.fn(),
};

function renderHeader(props = {}) {
  return render(
    <MemoryRouter>
      <Header {...defaultProps} {...props} />
    </MemoryRouter>
  );
}

describe("Header", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("it renders the title and navigation links", () => {
    renderHeader();

    expect(screen.getByRole("heading", { name: /cinema hd/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /movies/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tv shows/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /my list/i })).toBeInTheDocument();
  });

  test("it toggles the logout dropdown when clicking the user icon", () => {
    const { container } = renderHeader();

    const userMenu = container.querySelector(".user-menu");
    const userIcon = userMenu.querySelector("svg");

    expect(screen.queryByRole("link", { name: /logout/i })).not.toBeInTheDocument();

    fireEvent.click(userIcon);
    expect(screen.getByRole("link", { name: /logout/i })).toBeInTheDocument();

    fireEvent.click(userIcon);
    expect(screen.queryByRole("link", { name: /logout/i })).not.toBeInTheDocument();
  });
});
