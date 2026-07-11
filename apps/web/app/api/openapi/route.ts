import { NextResponse } from "next/server";

const openApiDoc = {
  openapi: "3.1.0",
  info: {
    title: "LaunchStack API",
    version: "0.1.0"
  },
  paths: {
    "/api/v1/me": {
      get: {
        summary: "Get current organization by API key",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "OK" },
          "401": { description: "Unauthorized" },
          "429": { description: "Rate limit exceeded" }
        }
      }
    },
    "/api/v1/keys": {
      get: {
        summary: "List API keys",
        responses: {
          "200": { description: "OK" },
          "401": { description: "Unauthorized" }
        }
      },
      post: {
        summary: "Create API key",
        responses: {
          "200": { description: "Created" },
          "400": { description: "Invalid input" },
          "401": { description: "Unauthorized" }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    }
  }
};

export async function GET() {
  return NextResponse.json(openApiDoc);
}
