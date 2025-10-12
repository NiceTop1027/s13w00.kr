"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAdmin = (password: string) => {
	const envPassword = process.env.PASSWORD;
	
	if (!envPassword) {
		return { error: "Server configuration error: PASSWORD not set" };
	}
	
	if (password === envPassword) {
		cookies().set(
			"session",
			createHash("sha512").update(password).digest("hex"),
			{
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 30, // One month
				path: "/",
			},
		);

		return redirect("/admin");
	}
	
	return { error: "Incorrect password" };
};
