local QBCore = exports['qb-core']:GetCoreObject()


RegisterNetEvent('qb_discord_presence:server:getPresenceData', function()
    local src = source
    local playerCount = #GetPlayers()
    local maxPlayers = GetConvarInt('sv_maxclients', 64)
    local serverName = GetConvar('sv_hostname', 'QBCore Server')

    local player = QBCore.Functions.GetPlayer(src)
    local jobLabel = 'Bez pracy'

    if player and player.PlayerData and player.PlayerData.job then
        local job = player.PlayerData.job
        local gradeName = job.grade and (job.grade.name or job.grade.level) or ''
        jobLabel = string.format('%s %s', job.label or job.name or 'Praca', gradeName or '')
    end

    TriggerClientEvent('qb_discord_presence:client:updatePresenceData', src, {
        players = playerCount,
        maxPlayers = maxPlayers,
        serverName = serverName,
        job = jobLabel
    })
end)
