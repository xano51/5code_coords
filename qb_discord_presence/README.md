# qb_discord_presence (QBCore + Discord)

Skrypt składa się z 2 części:
1. **Resource FiveM** – zaawansowane Discord Rich Presence dla graczy na serwerze (QBCore).
2. **Discord Bot** – aktualizuje status bota (`ONLINE/STOPPED`) oraz liczbę graczy.

## 1) Instalacja resource FiveM

1. Wrzuć folder `qb_discord_presence` do `resources/[local]/`.
2. W `server.cfg` dodaj konfigurację (przykład niżej).
3. Uruchom resource:

```cfg
ensure qb_discord_presence
```

## 2) Konfiguracja w `server.cfg`

Wklej poniższy blok i uzupełnij wartości:

```cfg
# ===== qb_discord_presence =====
setr discord_presence_app_id "123456789012345678"
setr discord_presence_large_asset "logo_large"
setr discord_presence_large_text "Twoj Serwer QBCore"
setr discord_presence_small_asset "logo_small"
setr discord_presence_small_text "QBCore Polska"

setr discord_presence_button1_text "Discord"
setr discord_presence_button1_url "https://discord.gg/twoj-serwer"
setr discord_presence_button2_text "Połącz"
setr discord_presence_button2_url "fivem://connect/twoj.ip:30120"

setr discord_presence_update_interval "15000"
# ===== /qb_discord_presence =====
```

## 3) Instalacja Discord Bota (status ONLINE/STOPPED + gracze)

Przejdź do folderu:

```bash
cd qb_discord_presence/discord-bot
npm install
```

### Linux (screen/systemd/txAdmin recipe)

Ustaw zmienne środowiskowe i uruchom:

```bash
export DISCORD_BOT_TOKEN="TU_WSTAW_TOKEN_BOTA"
export FIVEM_ENDPOINT="http://127.0.0.1:30120"
export BOT_UPDATE_INTERVAL_MS="15000"
export BOT_ACTIVITY_MODE="WATCHING"
node index.js
```

### Co pokazuje bot

- Gdy endpoint FiveM odpowiada: `ONLINE | X/Y graczy`
- Gdy endpoint FiveM nie odpowiada (np. serwer zatrzymany, restart): `STOPPED | Serwer offline`

To działa kompatybilnie z **txAdmin**, bo bot sprawdza realny stan endpointu serwera FiveM (`players.json`/`info.json`) po każdym odświeżeniu.

## Uwagi

- Rich Presence wymaga poprawnie ustawionych assetów w aplikacji Discord Developer Portal.
- Resource ma dependency na `qb-core`.
- Jeśli używasz reverse proxy/innego hosta, zmień `FIVEM_ENDPOINT`.
