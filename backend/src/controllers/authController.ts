import { Request, Response } from "express";
import { generateNonce, SiweMessage } from "siwe";
import { extractAddressAndNonce } from "../utils/utils";

export const authenticateSiwe = async (req: Request, res: Response) => {
  try {
    //Get authentication and user data from request body
    const { message, signature } = req.body;

    //Check if authentication and user data exists
    if (!message)
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });

    if (!signature)
      return res
        .status(400)
        .json({ success: false, message: "Signature is required" });

    let { address, nonce } = extractAddressAndNonce(message);

    const user = { nonce: generateNonce() };
    nonce = user ? user.nonce : nonce;

    const SIWEObject = new SiweMessage(message);

    try {
      await SIWEObject.verify({ signature, nonce });
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error.message });
    }

    //Update nonce for user and persist in database
    nonce = generateNonce();
    return res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
