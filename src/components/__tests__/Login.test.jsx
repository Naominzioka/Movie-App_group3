import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

globalThis.expect = expect;
await import("@testing-library/jest-dom");

import Login from "../Login";

const defaultProps = {
  setToken: vi.fn(),
};

function renderLogin(props = {}) {
  return render(<Login {...defaultProps} {...props} />);
}

describe("Login", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    window.alert.mockRestore?.();
  });

  test("it renders the title and form fields", () => {
    renderLogin();

    expect(screen.getByRole("heading", { name: /please log in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("it calls setToken when submitting valid credentials", async () => {
    const setToken = vi.fn();
    renderLogin({ setToken });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password1" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await vi.advanceTimersByTimeAsync(500);

    expect(setToken).toHaveBeenCalledTimes(1);
    expect(setToken).toHaveBeenCalledWith({ token: "fake-jwt-token-123" });
  });

  test("it shows alert when password is too short", async () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "short" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await vi.advanceTimersByTimeAsync(500);

    expect(window.alert).toHaveBeenCalledWith("Password must be at least 8 characters long");
    expect(defaultProps.setToken).not.toHaveBeenCalled();
  });
});
