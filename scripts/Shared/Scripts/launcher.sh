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

if [ -e ~/.stellarium/scripts ]
then
    if [ ! -d ~/.stellarium/scripts ]
    then
        echo "ABORTING Deployment !"
        echo "---------------------"
        echo "You have a file called \"scripts\" in your local stellarium folder."
        echo "This is the name of stellariums local script folder."
        echo ""
        echo "The launcher cannot procees until this file has been removed."
        echo "Please remove this file manually."
        exit
    fi
fi

# Create local script folder if it does not already exist
mkdir -p ~/.stellarium/scripts

# 
# Trim parameter 1, for some reason i'm gettinf trailing strings on some systems
#

outputname=$(trim $1)
echo "- Outputname is \""$outputname"\""

#
# Copy the stellarium ssc file
#

echo "- Copying \""$outputname".ssc\" to local stellarium script folder"
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
