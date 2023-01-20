#!/usr/bin/env bash

url=https://github.com/keycloak/keycloak/releases/download/20.0.3/keycloak-20.0.3.zip

GREEN='\e[32m'
NC='\e[0m'

echo -e "\n${GREEN}Downloading KeyCloak Server...${NC}\n" &&
	wget -q --show-progress "$url" -O keycloak.zip &&
	unzip -qo keycloak.zip &&
	find server -mindepth 1 ! -regex '^./server/data\(/.*\)?' -delete &&
	mv -f keycloak-20.0.3/* server/ &&
	rm -rf keycloak.zip keycloak-20.0.3 &&
	echo -e "\n${GREEN}KeyCloak server downloaded!${NC}\n"
