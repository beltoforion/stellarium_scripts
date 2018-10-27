#!/bin/bash

echo "#############################################################"
echo "#                                                           #"
echo "#  Stellarium Launcher                                      #"
echo "#                                                           #"
echo "#############################################################"
echo ""
echo "- Copying " $1 ".ssc to local stellarium script folder"

#
# Copy the stellarium ssc file
#

cp $1.ssc ~/.stellarium/scripts

#
# Copy Assets
#

if [ -d "$1.Assets" ]; then
    echo "- Copying Assets to local stellarium folder"
    cp -rf $1.Assets ~/.stellarium/scripts
fi

echo "- Launching stellarium"
stellarium --startup-script $1
