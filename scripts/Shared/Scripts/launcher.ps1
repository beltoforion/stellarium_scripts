param([string]$outputname)

$outputname = $outputname.Trim()

write-host "#############################################################"
write-host "#                                                           #"
write-host "#  Stellarium Launcher                                      #"
write-host "#  + Launching transpiled SSC file                          #"
write-host "#                                                           #"
write-host "#############################################################"
write-host ""

#
# Create local script folder if it does not already exist
#

$local_script_path = $env:APPDATA + "\Stellarium\scripts"
write-host $local_script_path
If(!(test-path $local_script_path))
{
    write-host 'Local stellarium scripts folder not found. Creating "'$local_script_path'"'
    New-Item -ItemType Directory -Force -Path $local_script_path  
}

# 
# Trim parameter 1, for some reason i'm gettinf trailing strings on some systems
#

write-host '- Outputname is "'$outputname'"'

#
# Copy the stellarium ssc file
#

$ssc_name = $outputname + '.ssc'
write-host '- Copying "'$ssc_name'" to local stellarium script folder "'$local_script_path'"'
Copy-Item $ssc_name -Destination $local_script_path

#
# Copy Assets
#

$asset_folder = $outputname + '.Assets'
If(test-path $asset_folder)
{
    write-host '- Copying Assets '"$asset_folder"' to local stellarium script folder'
    Copy-Item $asset_folder -Recurse -Destination $local_script_path -Container -force
}

write-host "- Launching stellarium"

& 'C:\Program Files\Stellarium\stellarium.exe' @('--startup-script', $ssc_name)
