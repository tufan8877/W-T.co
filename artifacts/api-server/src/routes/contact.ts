import { Router, type IRouter } from "express";
import {
  SubmitContactBody,
  SubmitContactResponse,
  SubmitProjectInquiryBody,
  SubmitProjectInquiryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();
const requestTimes = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function clientKey(req: { ip?: string }) {
  return req.ip ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestTimes.get(key) ?? []).filter(
    (time) => now - time < WINDOW_MS,
  );
  recent.push(now);
  requestTimes.set(key, recent);
  return recent.length > MAX_REQUESTS;
}

router.post("/contact", (req, res): void => {
  if (isRateLimited(clientKey(req))) {
    res.status(429).json({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." });
    return;
  }

  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Bitte prüfen Sie die markierten Felder." });
    return;
  }
  if (parsed.data.website) {
    res.status(200).json(SubmitContactResponse.parse({
      success: true,
      message: "Vielen Dank für Ihre Anfrage.",
    }));
    return;
  }

  req.log.info(
    { service: parsed.data.service, subject: parsed.data.subject },
    "Contact inquiry accepted",
  );
  res.status(200).json(SubmitContactResponse.parse({
    success: true,
    message: "Vielen Dank für Ihre Anfrage. Wir melden uns so bald wie möglich.",
  }));
});

router.post("/project-inquiries", (req, res): void => {
  if (isRateLimited(clientKey(req))) {
    res.status(429).json({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." });
    return;
  }

  const parsed = SubmitProjectInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Bitte prüfen Sie die markierten Felder." });
    return;
  }
  if (parsed.data.website) {
    res.status(200).json(SubmitProjectInquiryResponse.parse({
      success: true,
      message: "Vielen Dank für Ihre Projektanfrage.",
    }));
    return;
  }

  req.log.info(
    { projectType: parsed.data.projectType, phase: parsed.data.phase },
    "Project inquiry accepted",
  );
  res.status(200).json(SubmitProjectInquiryResponse.parse({
    success: true,
    message: "Vielen Dank für Ihre Projektanfrage. Unser Team meldet sich zur weiteren Abstimmung.",
  }));
});

export default router;