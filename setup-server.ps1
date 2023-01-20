$url = "https://github.com/keycloak/keycloak/releases/download/20.0.3/keycloak-20.0.3.zip"

Write-Host "`nDownloading KeyCloak Server...`n" -ForegroundColor Green
Invoke-WebRequest "$url" -OutFile keycloak.zip
Add-Type -AssemblyName System.IO.Compression.FileSystem ; [System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD/keycloak.zip", "$PWD")
Get-ChildItem -Path server -Exclude data | Remove-Item -Recurse -Force
Move-Item -Path keycloak-20.0.3/* -Destination server
Remove-Item -Recurse -Force ./keycloak-20.0.3
Remove-Item -Force ./keycloak.zip
Write-Host "`nKeyCloak server downloaded!'`n" -ForegroundColor Green
