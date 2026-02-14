local QBCore = exports['qb-core']:GetCoreObject()
local cachedData = {
    players = 0,
    maxPlayers = 0,
    serverName = 'QBCore Server',
    job = 'Ładowanie...'
}

local function updateRichPresence()
    if Config.DiscordAppId == 0 then
        return
    end

    SetDiscordAppId(Config.DiscordAppId)
    SetDiscordRichPresenceAsset(Config.LargeAsset)
    SetDiscordRichPresenceAssetText(Config.LargeAssetText)
    SetDiscordRichPresenceAssetSmall(Config.SmallAsset)
    SetDiscordRichPresenceAssetSmallText(Config.SmallAssetText)

    local playerName = GetPlayerName(PlayerId())
    local playerId = GetPlayerServerId(PlayerId())

    local firstLine = ('%s | %s/%s graczy'):format(cachedData.serverName, cachedData.players, cachedData.maxPlayers)
    local secondLine = ('%s (ID: %s) | %s'):format(playerName, playerId, cachedData.job)

    SetRichPresence(firstLine)
    SetDiscordRichPresenceAction(0, Config.Button1Text, Config.Button1Url)
    SetDiscordRichPresenceAction(1, Config.Button2Text, Config.Button2Url)

    -- FiveM pokazuje jedną linię jako Rich Presence; dodajemy szczegóły do tekstu assetu
    SetDiscordRichPresenceAssetText(secondLine)
end

RegisterNetEvent('qb_discord_presence:client:updatePresenceData', function(data)
    cachedData = data or cachedData
    updateRichPresence()
end)

CreateThread(function()
    while true do
        TriggerServerEvent('qb_discord_presence:server:getPresenceData')
        Wait(Config.UpdateInterval)
    end
end)
