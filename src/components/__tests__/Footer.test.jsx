import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";

globalThis.expect = expect;
await import("@testing-library/jest-dom");

import Footer from "../Footer";

describe("Footer", () => {
  beforeEach(() => {
    cleanup();
  });

  test("it renders the copyright text and site name", () => {
    render(<Footer />);

    expect(screen.getByText(/CINEMA HD/)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument();
    expect(screen.getByText(/\d{4}/)).toBeInTheDocument();
  });

  test("it renders the footer with main-footer class", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer.main-footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent("CINEMA HD");
  });
});
