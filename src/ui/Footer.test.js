/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  it("displays the correct text", () => {
    render(<Footer />);
    expect(screen.getByText(/CryptoCurrency Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/@ Almabetter/i)).toBeInTheDocument();
    expect(screen.getByText(/By: Sharath Devadiga/i)).toBeInTheDocument();
  });
});
