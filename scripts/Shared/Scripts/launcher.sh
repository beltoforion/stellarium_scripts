#!/bin/bash

echo "#############################################################"
echo "#                                                           #"
echo "#  Stellarium Launcher                                      #"
echo "#  + Launching transpiled SSC file                          #"
echo "#                                                           #"
echo "#############################################################"
echo ""

trim() {
    local var="$*"
    # remove leading whitespace characters
    var="${var#"${var%%[![:space:]]*}"}"
    # remove trailing whitespace characters
    var="${var%"${var##*[![:space:]]}"}"   
    echo -n "$var"
}

#
#
#

mkdir -p ~/.stellarium/scripts

# 
# Trim parameter 1, for some reason i'm gettinf trailing strings on some systems
#

outputname=$(trim $1)
echo "- Outputname is \""$outputname"\""

#
# Copy the stellarium ssc file
#

echo "- Copying " $outputname ".ssc to local stellarium script folder"
cp $outputname.ssc ~/.stellarium/scripts

#
# Copy Assets
#

if [ -d "$outputname.Assets" ]; then
    echo "- Copying Assets to local stellarium folder"
    cp -rf $outputname.Assets ~/.stellarium/scripts
fi

echo "- Launching stellarium"
stellarium --startup-script $outputname.ssc
