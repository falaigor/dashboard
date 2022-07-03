import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body;

  await prisma.project.create({
    data: {
      name,
    },
  });

  return res.status(201).json({});
}
