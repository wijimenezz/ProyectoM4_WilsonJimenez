import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BoardHeader } from "../components/dashboard/boardHeader/BoardHeader";

describe("BoardHeader", () => {
  it("renders buttons and calls actions", async () => {
    const user = userEvent.setup();
    const onNewTask = vi.fn();
    const onSendEmails = vi.fn();

    render(<BoardHeader onNewTask={onNewTask} onSendEmails={onSendEmails} />);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByText("Send Email")).toBeInTheDocument();

    await user.click(screen.getByText("Send Email"));
    expect(onSendEmails).toHaveBeenCalledOnce();

    await user.click(screen.getByText("New Task"));
    expect(onNewTask).toHaveBeenCalledOnce();
  });
});
