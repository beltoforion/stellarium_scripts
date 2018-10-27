#!/bin/bash

echo "#############################################################"
echo "#                                                           #"
echo "#  Stellarium Launcher                                      #"
echo "#                                                           #"
echo "#############################################################"
echo ""
echo "- Copying " $1 " to local stellarium script folder"
cp $1 ~/.stellarium/scripts

echo "- Launching stellarium"
stellarium --startup-script $1
