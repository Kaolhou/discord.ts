import type { GuildMember, PermissionResolvable } from "discord.js";

export function havePermissions(
  member: GuildMember,
  perms: PermissionResolvable | PermissionResolvable[]
) {
  const { has } = member.permissions;
  if (Array.isArray(perms)) {
    for (const perm of perms) {
      if (!has(perm)) return false;
    }
    return true;
  }
  return has(perms);
}
