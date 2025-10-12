import { createHash } from "crypto";
import { cookies } from "next/headers";

export const checkAdmin = () => {
	const password = process.env.PASSWORD;
	if (!password) {
		return false;
	}
	
	const adminHash = createHash("sha512")
		.update(password)
		.digest("hex");
	const session = cookies().get("session");

	if (session?.value === adminHash) {
		return true;
	} else return false;
};
