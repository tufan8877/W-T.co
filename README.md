# WTÖ – Wärme Technik Österreich

Mehrseitige Unternehmenswebsite für Gebäude-, Anlagen- und Energietechnik mit React, TypeScript, Vite und einem Express-API-Server.

## Lokal installieren

```bash
pnpm install
cp .env.example .env
```

## Entwicklung

Die Arbeitsumgebung startet die Website und die API als getrennte Dienste:

```bash
pnpm --filter @workspace/wto-website run dev
pnpm --filter @workspace/api-server run dev
```

## Produktions-Build

```bash
pnpm run build:render
```

Der Build erzeugt `artifacts/wto-website/dist/public`. Der Express-Server liefert diesen Ordner zusammen mit der REST API aus, sobald der Ordner vorhanden ist.

## Produktionsstart

```bash
pnpm start:render
```

Der Server verwendet `process.env.PORT` und bindet keine Produktions-URLs fest ein.

## API

- `GET /api/healthz` – Statusprüfung
- `POST /api/contact` – validierte Kontaktanfrage mit Honeypot und Rate-Limit
- `POST /api/project-inquiries` – validierte Projektanfrage mit Honeypot und Rate-Limit

Die API-Verträge liegen in `lib/api-spec/openapi.yaml`. Nach Änderungen:

```bash
pnpm --filter @workspace/api-spec run codegen
```

## Render Deployment

1. Repository nach GitHub pushen.
2. In Render einen **Web Service** aus dem Repository anlegen.
3. Als Build Command `pnpm install --frozen-lockfile && pnpm run build:render` verwenden.
4. Als Start Command `pnpm start:render` verwenden.
5. Node 20 oder neuer auswählen.
6. Die Variablen aus `.env.example` nur bei Bedarf hinterlegen. `PORT` wird von Render gesetzt.
7. Nach dem ersten Deploy kann eine eigene Domain im Render-Dashboard verbunden werden.

SMTP-Werte werden ausschließlich serverseitig über Environment Variables gelesen. Es werden keine Zugangsdaten im Frontend oder Repository benötigt.

## Inhaltliche Hinweise

Rechtliche Firmendaten im Impressum und in der Datenschutzvorlage sind bewusst als klar markierte Platzhalter angelegt. Es wurden keine Firmengründungsjahre, Mitarbeiterzahlen, Zertifikate, Bewertungen oder Referenzen erfunden.