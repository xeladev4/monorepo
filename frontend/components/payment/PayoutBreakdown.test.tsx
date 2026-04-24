import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PayoutBreakdown } from "./PayoutBreakdown";
import type { PayoutBreakdown as PayoutBreakdownType } from "@/lib/paymentApi";

const baseBreakdown: PayoutBreakdownType = {
  totalAmount: 500_000,
  platformShare: 25_000,
  reporterShare: 10_000,
  landlordAmount: 465_000,
  currency: "NGN",
};

describe("PayoutBreakdown", () => {
  it("renders all line items with reporter present", () => {
    render(<PayoutBreakdown breakdown={baseBreakdown} />);

    expect(screen.getByText("Platform fee")).toBeInTheDocument();
    expect(screen.getByText("Reporter reward")).toBeInTheDocument();
    expect(screen.getByText("Landlord payout")).toBeInTheDocument();
    expect(screen.getByText("Total charged")).toBeInTheDocument();
  });

  it("shows dash when reporter is null", () => {
    render(<PayoutBreakdown breakdown={{ ...baseBreakdown, reporterShare: null }} />);

    expect(screen.getByText("No reporter on this listing")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("shows confirmed badge when confirmed=true", () => {
    render(<PayoutBreakdown breakdown={baseBreakdown} confirmed />);

    expect(screen.getByText("Payment confirmed")).toBeInTheDocument();
  });

  it("does not show confirmed badge by default", () => {
    render(<PayoutBreakdown breakdown={baseBreakdown} />);

    expect(screen.queryByText("Payment confirmed")).not.toBeInTheDocument();
  });

  it("formats amounts as NGN currency", () => {
    render(<PayoutBreakdown breakdown={baseBreakdown} />);

    // Total should be formatted — Intl formats 500000 as ₦500,000
    expect(screen.getByText(/500,000/)).toBeInTheDocument();
  });
});
