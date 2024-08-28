-- NIE RUSZAJ NIC!

-- ███████╗░█████╗░░█████╗░██████╗░███████╗
-- ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝
-- ██████╗░██║░░╚═╝██║░░██║██║░░██║█████╗░░
-- ╚════██╗██║░░██╗██║░░██║██║░░██║██╔══╝░░
-- ██████╔╝╚█████╔╝╚█████╔╝██████╔╝███████╗
-- ╚═════╝░░╚════╝░░╚════╝░╚═════╝░╚══════╝
-- discord.gg/PW3ymKsEew

local isVisible = false
local toggleKey = 249 --  [N]

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0) 

        if IsControlJustPressed(0, toggleKey) then
            isVisible = not isVisible 
            SetNuiFocus(isVisible, isVisible)
            SendNUIMessage({
                type = 'ui',
                display = isVisible
            })
        end

        if isVisible then
            local ped = PlayerPedId()
            local coords = GetEntityCoords(ped)
            local heading = GetEntityHeading(ped)
            SendNUIMessage({
                type = 'updateCoords',
                coords = {
                    x = coords.x,
                    y = coords.y,
                    z = coords.z,
                    h = heading
                }
            })
        end
    end
end)
