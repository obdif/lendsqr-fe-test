import { describe, it, expect } from "vitest";
import { mockUsers } from "./mockData";

const applyFilters = (users: any[], filters: any) =>
  users.filter((user) => {
    return (
      (!filters.status || user.status === filters.status) &&
      (!filters.username || user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
      (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase()))
    );
  });

describe("User Filters", () => {
  // filter works correctly
  it("returns only Active users when status is Active", () => {
    const result = applyFilters(mockUsers, { status: "Active" });
    expect(result.every((u) => u.status === "Active")).toBe(true);
  });

  it("filters by username case-insensitively", () => {
    const result = applyFilters(mockUsers, { username: "grace" });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((u) => expect(u.username.toLowerCase()).toContain("grace"));
  });

  //  bad input returns nothing
  it("returns empty array when no user matches the filter", () => {
    const result = applyFilters(mockUsers, { status: "Blacklisted", username: "zzznomatch" });
    expect(result).toHaveLength(0);
  });

  it("returns all users when no filters are applied", () => {
    const result = applyFilters(mockUsers, {});
    expect(result).toHaveLength(mockUsers.length);
  });
});