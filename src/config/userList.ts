import bcrypt from "bcryptjs";

export const userList = [
  {
    name: "User1",
    email: "user1@user.com",
    password: bcrypt.hashSync("user123xyz", 10),
    address: "jalan lurus tanpa belokan, Bandung",
    roles: [11],
  },
  {
    name: "User2",
    email: "user2@user.com",
    password: bcrypt.hashSync("user123xyz", 10),
    address: "jalan terus pantang mundur, Bandung",
    roles: [11],
  },
  {
    name: "Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin123xyz", 10),
    address: "jalan kaki di tempat grakk, Bandung",
    roles: [21],
  },
];
