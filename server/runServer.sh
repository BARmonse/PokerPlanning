#!/bin/sh

reset='\033[0m';
cyan='\033[0;36m';

echo "\n${cyan}Installing dependencies${reset}\n"
pip install -r requirements.txt;
echo "\n${cyan}Running server${reset}\n"
python3 main.py;