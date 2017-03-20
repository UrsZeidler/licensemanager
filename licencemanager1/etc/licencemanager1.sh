#!/bin/bash

# include the conf
source licencemanager1.conf;


#call the jar
$JAVA -DEthereumFacadeProvider=$INSTANCE -Drpc-url=$RPC_URL -Dchain-id=$NET -DapiKey=$INFRA_API_KEY -jar  $JAR "$@" -sk $KEYFILE -sp $PASS 

