import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { hashPassword } from "@/utils/hashPassword";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

    await dbConnect();

    const { email, password } = req.body;

    const query = { email: email.trim() };


    const user = await User.findOne(query);
    console.log(user)
    if (!user || user.password !== hashPassword(password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
    });

    res.status(200).json({ token });
}
