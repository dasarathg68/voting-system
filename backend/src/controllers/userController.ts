import { Request, Response } from "express";
import { generateNonce } from "siwe";
export const getNonce = (req: Request, res: Response) => {
  const { address } = req.params;

  try {
    if (!address)
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });

    const user = {
      address: address,
      nonce: generateNonce(),
    };

    if (!user)
      return res.status(200).json({
        success: true,
        nonce: generateNonce(),
      });

    const nonce = user.nonce;

    return res.status(200).json({
      success: true,
      nonce,
    });
  } catch (error) {}
};
