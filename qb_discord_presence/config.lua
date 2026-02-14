Config = {}

-- Konfiguracja Rich Presence (Discord app musi mieć ustawione assets)
Config.DiscordAppId = tonumber(GetConvar('discord_presence_app_id', '0'))
Config.LargeAsset = GetConvar('discord_presence_large_asset', 'logo')
Config.LargeAssetText = GetConvar('discord_presence_large_text', 'FiveM QBCore')
Config.SmallAsset = GetConvar('discord_presence_small_asset', 'small_logo')
Config.SmallAssetText = GetConvar('discord_presence_small_text', 'QBCore Server')

Config.Button1Text = GetConvar('discord_presence_button1_text', 'Dołącz na Discord')
Config.Button1Url = GetConvar('discord_presence_button1_url', 'https://discord.gg/twoj-serwer')
Config.Button2Text = GetConvar('discord_presence_button2_text', 'Połącz z serwerem')
Config.Button2Url = GetConvar('discord_presence_button2_url', 'fivem://connect/127.0.0.1:30120')

-- Co ile ms aktualizować presence
Config.UpdateInterval = tonumber(GetConvar('discord_presence_update_interval', '15000'))
