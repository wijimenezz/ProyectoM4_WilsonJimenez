import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import handler from "../api/sendEmail";

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
}));

vi.mock("@aws-sdk/client-ses", () => {
  class MockSESClient {
    send = sendMock;
  }

  class MockSendEmailCommand {
    input: unknown;

    constructor(input: unknown) {
      this.input = input;
    }
  }

  return {
    SESClient: MockSESClient,
    SendEmailCommand: MockSendEmailCommand,
  };
});

describe("sendEmail API", () => {
  afterEach(() => {
    delete process.env.AWS_REGION;
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
    delete process.env.SES_FROM_EMAIL;
  });
  beforeEach(() => {
    sendMock.mockReset();

    sendMock.mockResolvedValue({
      MessageId: "abc-123",
    });

    process.env.AWS_REGION = "us-east-1";
    process.env.AWS_ACCESS_KEY_ID = "test";
    process.env.AWS_SECRET_ACCESS_KEY = "test";
    process.env.SES_FROM_EMAIL = "test@example.com";
  });
  it("returns 200 and messageId when email is sent", async () => {
    const json = vi.fn((data) => {
      console.log("JSON RESPONSE:", data);
    });

    const status = vi.fn(() => ({ json }));

    const req = {
      method: "POST",
      body: {
        to: "user@example.com",
        summary: "Test summary",
      },
    } as any;

    const res = {
      status,
    } as any;

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);

    expect(json).toHaveBeenCalledWith({
      ok: true,
      messageId: "abc-123",
    });

    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("returns 400 when required fields are missing", async () => {
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));

    const req = {
      method: "POST",
      body: {
        to: "user@example.com",
      },
    } as any;

    const res = {
      status,
    } as any;

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(400);

    expect(json).toHaveBeenCalledWith({
      error: "Missing required fields: to, summary",
    });
  });

  it("returns 405 for non-POST methods", async () => {
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));

    const req = {
      method: "GET",
      body: {},
    } as any;

    const res = {
      status,
    } as any;

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(405);

    expect(json).toHaveBeenCalledWith({
      error: "Method Not Allowed",
    });
  });
});
