#!/bin/sh

SUBSCRIPTION="758fffa5-9820-4fce-8ff6-62ed2c6092de"
RESOURCEGROUP="sixpivot-cbh-messaging"

az account set --subscription $SUBSCRIPTION

az deployment group create \
  --resource-group $RESOURCEGROUP \
  --template-file main.bicep 